import { GoogleGenerativeAI } from "@google/generative-ai";
import { FastifyReply, FastifyRequest } from 'fastify';
import { AiBodyRequest } from '../routes/aiNoteRoute.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export class AiNoteController {
    static async prompt(request: FastifyRequest<{ Body: AiBodyRequest }>, reply: FastifyReply) {
        try {
            const result = await model.generateContent(request.body.prompt);
            const response = {
              text: result.response.text(),
              model: "gemini-1.5-flash",
            };
            reply.code(200).send(response);
          } catch (error: any) {
            console.error(`Error generating AI note: ${error.message}`);
            let errorMessage = 'Internal server error';
            if (error.response && error.response.data) {
              errorMessage = error.response.data.error || errorMessage; // Extract specific error message from API response if available
            }
            reply.status(500).send({ error: errorMessage });
          }
    }
}
