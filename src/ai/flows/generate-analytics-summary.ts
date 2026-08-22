'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a concise summary of key hotel analytics.
 *
 * It includes:
 * - `generateAnalyticsSummary`: The main function to trigger the analytics summary generation.
 * - `GenerateAnalyticsSummaryInput`: The input type for the function.
 * - `GenerateAnalyticsSummaryOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnalyticsSummaryInputSchema = z.object({
  totalRooms: z.number().describe('The total number of rooms in the hotel.'),
  roomsBookedToday: z.number().describe('The number of rooms booked today.'),
  totalUsers: z.number().describe('The total number of registered users.'),
  upcomingCheckIns: z.number().describe('The number of upcoming check-ins.'),
});
export type GenerateAnalyticsSummaryInput = z.infer<
  typeof GenerateAnalyticsSummaryInputSchema
>;

const GenerateAnalyticsSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key hotel analytics.'),
});
export type GenerateAnalyticsSummaryOutput = z.infer<
  typeof GenerateAnalyticsSummaryOutputSchema
>;

export async function generateAnalyticsSummary(
  input: GenerateAnalyticsSummaryInput
): Promise<GenerateAnalyticsSummaryOutput> {
  return generateAnalyticsSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnalyticsSummaryPrompt',
  input: {schema: GenerateAnalyticsSummaryInputSchema},
  output: {schema: GenerateAnalyticsSummaryOutputSchema},
  prompt: `You are an AI assistant helping a hotel admin understand key analytics.
  Generate a concise summary (under 50 words) of the current hotel status based on the following figures:

  Total Rooms: {{{totalRooms}}}
  Rooms Booked Today: {{{roomsBookedToday}}}
  Total Users: {{{totalUsers}}}
  Upcoming Check-Ins: {{{upcomingCheckIns}}}
  `,
});

const generateAnalyticsSummaryFlow = ai.defineFlow(
  {
    name: 'generateAnalyticsSummaryFlow',
    inputSchema: GenerateAnalyticsSummaryInputSchema,
    outputSchema: GenerateAnalyticsSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
