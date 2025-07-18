'use server';
/**
 * @fileOverview An AI flow to suggest replies for vendors in a negotiation chat.
 *
 * - suggestReply - A function that generates a reply suggestion.
 * - SuggestReplyInput - The input type for the suggestReply function.
 * - SuggestReplyOutput - The return type for the suggestReply function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit/zod';

const SuggestReplyInputSchema = z.object({
  customerName: z.string().describe('The name of the customer.'),
  productName: z.string().describe('The name of the product being negotiated.'),
  khatTypeName: z.string().describe('The specific type of khat.'),
  quantity: z.number().describe('The quantity requested by the customer.'),
  estimatedPrice: z.number().describe('The initial estimated price for the request.'),
  messages: z.array(z.object({
    sender: z.string().describe("Who sent the message ('Customer' or 'Vendor')."),
    message: z.string().describe('The content of the message.'),
  })).describe('The history of the conversation so far.'),
});
export type SuggestReplyInput = z.infer<typeof SuggestReplyInputSchema>;

const SuggestReplyOutputSchema = z.object({
  reply: z.string().describe('The suggested reply message for the vendor.'),
});
export type SuggestReplyOutput = z.infer<typeof SuggestReplyOutputSchema>;

export async function suggestReply(input: SuggestReplyInput): Promise<SuggestReplyOutput> {
  return suggestReplyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestReplyPrompt',
  input: {schema: SuggestReplyInputSchema},
  output: {schema: SuggestReplyOutputSchema},
  prompt: `You are an AI assistant for a vendor on a Yemeni Khat marketplace. Your goal is to help the vendor negotiate effectively and maintain a friendly, professional, and culturally appropriate tone (in Arabic).

The negotiation is with a customer named {{{customerName}}}.
The customer is asking about {{{quantity}}} units of {{{productName}}} (Type: {{{khatTypeName}}}), with an initial estimated price of \${{{estimatedPrice}}}.

Conversation History:
{{#each messages}}
- {{sender}}: {{message}}
{{/each}}

Based on the last message from the customer, suggest a suitable reply for the vendor. The reply should be in Arabic. Be polite, helpful, and aim to move the negotiation forward. If the customer is asking for a discount, suggest a reasonable counter-offer or explain the value. Do not invent new prices unless it's a small, reasonable discount.

Generate only the reply message itself.`,
});

const suggestReplyFlow = ai.defineFlow(
  {
    name: 'suggestReplyFlow',
    inputSchema: SuggestReplyInputSchema,
    outputSchema: SuggestReplyOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
