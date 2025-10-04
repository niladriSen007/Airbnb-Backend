import fs from "fs/promises";
import Handlebars from "handlebars";
import path from "path";

import { fileURLToPath } from 'url';
import { InternalServerError } from "../utils/errors/app.error.js";

export async function renderMailTemplate(
  templateId: string,
  params: Record<string, string>
): Promise<string> {

  const __filename = fileURLToPath(import.meta.url);
  const templatePath = path.join(path.dirname(__filename), "mailer", `${templateId}.hbs`)

  try {
    const content = await fs.readFile(templatePath, "utf-8")
    const finalTemplate = Handlebars.compile(content)
    return finalTemplate(params)
  } catch {
    throw new InternalServerError(`Template not found: ${templateId}`)
  }
}
