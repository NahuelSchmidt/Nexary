// src/app/tech-suggester/actions.ts
"use server";

import { suggestTechnologies, SuggestTechnologiesInput, SuggestTechnologiesOutput } from "@/ai/flows/suggest-technologies";
import { z } from "zod";

export const techSuggesterSchema = z.object({
  projectDescription: z.string().min(20, { message: "La descripción del proyecto debe tener al menos 20 caracteres." }),
});

export type TechSuggesterFormState = {
  message: string;
  success: boolean;
  suggestions?: SuggestTechnologiesOutput;
  issues?: string[];
};

export async function getTechSuggestions(
  prevState: TechSuggesterFormState,
  data: FormData
): Promise<TechSuggesterFormState> {
  const formData = Object.fromEntries(data);
  const parsed = techSuggesterSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Descripción del proyecto no válida.",
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  try {
    const input: SuggestTechnologiesInput = {
      projectDescription: parsed.data.projectDescription,
    };
    // La llamada al flow de Genkit y el prompt interno permanecerán en inglés
    const result = await suggestTechnologies(input); 
    return {
      message: "¡Tecnologías sugeridas con éxito!",
      success: true,
      suggestions: result,
    };
  } catch (error) {
    console.error("Error al obtener sugerencias tecnológicas:", error);
    return {
      message: "Ocurrió un error al generar las sugerencias. Por favor, inténtalo de nuevo.",
      success: false,
    };
  }
}
