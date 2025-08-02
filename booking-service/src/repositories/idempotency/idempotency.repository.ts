import { Prisma,IdempotencyKey } from "@prisma/client";
import prismaClient from "../../prisma/client";
import { validate as isValidUUID } from "uuid"
import { BadRequestError } from "../../utils/errors/app.error";

export class IdempotencyRepository {

  async createIdempotencyKey(bookingId: number, key: string) {
    const idempotencyKey = await prismaClient?.idempotencyKey?.create({
      data: {
        idemKey: key,
        booking: {
          connect: {
            id: bookingId
          }
        }
      }
    })

    return idempotencyKey
  }


  async getIdempotencyKeyWithLock(tx: Prisma.TransactionClient,key: string ) {

    const isValid = isValidUUID(key)
    if (!isValid) {
      throw new BadRequestError("Invalid idempotency key")
    }

    const idempotencyKey : Array<IdempotencyKey> = await tx.$queryRaw`
      SELECT *
      FROM IdempotencyKey
      WHERE idemKey = ${key}
      FOR UPDATE;
    `

    if(!idempotencyKey|| idempotencyKey?.length === 0) {
      throw new BadRequestError("Invalid idempotency key")
    }

    return idempotencyKey[0]
  }

  async finalizeIdempotencyKey(tx: Prisma.TransactionClient,key: string) {
    const idempotencyKey = await tx?.idempotencyKey?.update({
      where: {
        idemKey: key
      },
      data: {
        finalized: true
      }
    })
    return idempotencyKey
  }

}


