import prismaClient from "../../prisma/client";

export class IdempotencyRepository {

  async createIdempotencyKey(bookingiD: number, key: string) {
    const idempotencyKey = await prismaClient?.idempotencyKey?.create({
      data: {
        key: key,
        booking: {
          connect: {
            id: bookingiD
          }
        }
      }
    })

    return idempotencyKey
  }


  async getIdempotencyKey(key: string) {
    const idempotencyKey = await prismaClient?.idempotencyKey?.findUnique({
      where: {
        key: key
      }
    })

    return idempotencyKey
  }

  async finalizeIdempotencyKey(key: string) {
    const idempotencyKey = await prismaClient?.idempotencyKey?.update({
      where: {
        key: key
      },
      data: {
        finalized: true
      }
    })
    return idempotencyKey
  }

}


