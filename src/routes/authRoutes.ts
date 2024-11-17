import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthController } from "../controllers/AuthController.js";
import TokenMiddleware from "../middleswares/TokenMiddleware.js";

export interface AuthRequestBody {
    user: {
        id?: string;
        name: string;
        email: string;
        password: string;
        pic?: string | null;
        creationDate: Date;
    }
}

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: AuthRequestBody }>(
        '/login',
        { preHandler: TokenMiddleware.verifySecret },
        async (request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply) => {
            await AuthController.login(request, reply);
        }
    );

    fastify.post<{ Body: AuthRequestBody }>(
        '/register',
        { preHandler: TokenMiddleware.verifySecret },
        async (request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply) => {
            await AuthController.register(request, reply);
        }
    );
}