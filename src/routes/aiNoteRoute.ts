import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AiNoteController } from "../controllers/AiNoteController.js";
import AuthMiddleware from "../middleswares/AuthMiddleware.js";

export interface AiBodyRequest {
    prompt: string;
}

export default async function aiNoteRoute(fastify: FastifyInstance) {
    fastify.post<{ Body: AiBodyRequest }>(
        '/aiNote',
        {preHandler: AuthMiddleware.verifyAuth},
        async (request: FastifyRequest<{ Body: AiBodyRequest }>,
            reply: FastifyReply) => {
            await AiNoteController.prompt(request, reply);
        }
    );
}