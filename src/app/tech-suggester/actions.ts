// src/app/tech-suggester/actions.ts
"use server";

import { suggestTechnologies, SuggestTechnologiesInput, SuggestTechnologiesOutput } from "@/ai/flows/suggest-technologies";
import { z } from "zod";

export const techSuggesterSchema = z.object({
  projectDescription: z.string().min(20, { message: "Project description must be at least 20 characters." }),
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
      message: "Invalid project description.",
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  try {
    const input: SuggestTechnologiesInput = {
      projectDescription: parsed.data.projectDescription,
    };
    const result = await suggestTechnologies(input);
    return {
      message: "Technologies suggested successfully!",
      success: true,
      suggestions: result,
    };
  } catch (error) {
    console.error("Error getting tech suggestions:", error);
    return {
      message: "An error occurred while generating suggestions. Please try again.",
      success: false,
    };
  }
}
