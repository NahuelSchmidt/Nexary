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

if (!apiKey) {
  console.error(
    "Error Crítico: La variable de entorno RESEND_API_KEY no está configurada. " +
    "Por favor, verifica tu archivo .env.local y reinicia el servidor de desarrollo. " +
    "El envío de correos no funcionará sin esta clave."
  );
} else {
  // Solo muestra que la clave fue encontrada y su longitud, no la clave en sí por seguridad.
  console.log("RESEND_API_KEY encontrada. Longitud:", apiKey.length);
}

// La instanciación de Resend podría fallar si apiKey sigue siendo undefined.
// Resend arrojará su propio error si la clave es inválida o no se proporciona.
const resend = new Resend(apiKey);
// Asegúrate de configurar RESEND_API_KEY en tus variables de entorno (ej. .env.local)

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
    // Adicionalmente, puedes retornar un error específico si la API key no está configurada en este punto
    // para evitar que Resend intente operar sin ella, aunque ya se logueó arriba.
    return {
      message: "Error de configuración del servidor: La clave API para el envío de correos no está configurada. Por favor, contacta al administrador.",
      success: false,
    };
  }
  
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
        // Aquí podrías añadir lógica para interpretar errores específicos de Resend si es necesario
        // Por ejemplo, si Resend devuelve un error específico sobre la API key inválida, etc.
        errorMessage = `Error al enviar el correo: ${error.message}`;
    }
    return {
      message: errorMessage,
      success: false,
    };
  }
}
