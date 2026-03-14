// src/app/contact/actions.ts
"use server";

import { z } from "zod";
import { Resend } from 'resend';
import { contactFormSchema } from "./schema";

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

const apiKey = process.env.RESEND_API_KEY;

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Datos del formulario no válidos. Por favor, revisa los campos.",
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  if (!apiKey) {
    console.error("Error: RESEND_API_KEY no configurada.");
    return {
      message: "Error de configuración: No se pudo enviar el correo porque falta la clave API. Por favor, contacta al administrador.",
      success: false,
    };
  }

  // Inicializamos Resend aquí dentro para evitar que la app explote al cargar si no hay clave
  const resend = new Resend(apiKey);
  
  const recipientEmail = 'tu-email-de-destino@example.com';
  const fromEmail = 'Formulario OpenCode <onboarding@resend.dev>';

  try {
    await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject: `Nuevo mensaje de contacto de: ${parsed.data.name}`,
      html: `
        <h1>Nuevo Mensaje de Contacto</h1>
        <p><strong>Nombre:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Empresa:</strong> ${parsed.data.company || 'No especificada'}</p>
        <p><strong>Tipo de Proyecto:</strong> ${parsed.data.projectType || 'No especificado'}</p>
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${parsed.data.message.replace(/\n/g, '<br>')}</p>
      `,
      reply_to: parsed.data.email,
    });

    return {
      message: "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.",
      success: true,
    };

  } catch (error) {
    console.error("Error al enviar el correo electrónico con Resend:", error);
    let errorMessage = "Ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.";
    if (error instanceof Error) {
        errorMessage = `Error al enviar el correo: ${error.message}`;
    }
    return {
      message: errorMessage,
      success: false,
    };
  }
}
