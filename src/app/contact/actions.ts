// src/app/contact/actions.ts
"use server";

import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, ingresa una dirección de correo electrónico válida." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
  projectType: z.string().optional(),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Datos del formulario no válidos",
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  // En una aplicación real, enviarías un correo electrónico, guardarías en una base de datos, etc.
  console.log("Formulario de contacto enviado:", parsed.data);

  // Simular retraso de red
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.",
    success: true,
  };
}
