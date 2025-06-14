// src/ai/flows/suggest-technologies.ts
'use server';

/**
 * @fileOverview A technology suggestion AI agent based on project description.
 *
 * - suggestTechnologies - A function that suggests technologies for a project.
 * - SuggestTechnologiesInput - The input type for the suggestTechnologies function.
 * - SuggestTechnologiesOutput - The return type for the suggestTechnologies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTechnologiesInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A description of the project for which technologies are to be suggested.'),
});
export type SuggestTechnologiesInput = z.infer<typeof SuggestTechnologiesInputSchema>;

const SuggestTechnologiesOutputSchema = z.object({
  suggestedTechnologies: z
    .array(z.string())
    .describe('An array of suggested technologies for the project.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested technologies.'),
});
export type SuggestTechnologiesOutput = z.infer<typeof SuggestTechnologiesOutputSchema>;

export async function suggestTechnologies(input: SuggestTechnologiesInput): Promise<SuggestTechnologiesOutput> {
  return suggestTechnologiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTechnologiesPrompt',
  input: {schema: SuggestTechnologiesInputSchema},
  output: {schema: SuggestTechnologiesOutputSchema},
  prompt: `You are an expert in web development technologies.

You will be given a description of a project, and you will suggest relevant technologies to use for the project.

Project Description: {{{projectDescription}}}

Respond with a list of suggested technologies and a brief explanation of why each technology is suitable for the project.

{{#each suggestedTechnologies}}
- {{{this}}}
{{/each}}
`,
});

const suggestTechnologiesFlow = ai.defineFlow(
  {
    name: 'suggestTechnologiesFlow',
    inputSchema: SuggestTechnologiesInputSchema,
    outputSchema: SuggestTechnologiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
