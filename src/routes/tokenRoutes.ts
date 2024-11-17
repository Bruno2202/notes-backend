import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TokenController } from "../controllers/TokenController.js";
import TokenMiddleware from "../middleswares/TokenMiddleware.js";

export interface TokenRequestBody {
    token: string | undefined;
    user: {
        id: string;
        email: string;
    }
}

export default async function tokenRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: TokenRequestBody }>(
        '/token',
        { preHandler: TokenMiddleware.verifySecret },
        async (request: FastifyRequest<{ Body: TokenRequestBody }>, reply: FastifyReply) => {
            TokenController.validateToken(request, reply);
        }
    );

    fastify.post<{ Body: TokenRequestBody }>(
        '/token/generate',
        { preHandler: TokenMiddleware.verifySecret },
        async (request: FastifyRequest<{ Body: TokenRequestBody }>, reply: FastifyReply) => {
            TokenController.generateToken(request, reply);
        }
    );

    fastify.post<{ Body: TokenRequestBody }>(
        '/token/data',
        { preHandler: TokenMiddleware.verifySecret },
        async (request: FastifyRequest<{ Body: TokenRequestBody }>, reply: FastifyReply) => {
            TokenController.getTokenData(request, reply);
        }
    );
}