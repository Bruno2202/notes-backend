import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TokenController } from "../controllers/TokenController.js";

export interface TokenRequestBody {
    token: string | undefined;
    user: {
        id: number;
        email: string;
    }
}

export default async function tokenRoutes(fastify: FastifyInstance) {
    fastify.post('/token', async (request: FastifyRequest<{ Body: TokenRequestBody }>, reply: FastifyReply) => {
        TokenController.validateToken(request, reply);
    });

    fastify.post('/token/generate', async (request: FastifyRequest<{ Body: TokenRequestBody }>, reply: FastifyReply) => {
        TokenController.generateToken(request, reply);
    });
}