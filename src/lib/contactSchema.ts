import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Zadejte prosím jméno"),
  phone: z
    .string()
    .min(9, "Zadejte platné telefonní číslo")
    .regex(/^[+\d][\d\s]{8,}$/, "Zadejte platné telefonní číslo"),
  email: z.string().email("Zadejte platný e-mail").or(z.literal("")),
  service: z.string().min(1, "Vyberte službu"),
  message: z.string().max(1000).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
