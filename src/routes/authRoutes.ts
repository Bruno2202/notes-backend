import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthController } from "../controllers/AuthController.js";

export interface AuthRequestBody {
    user: {
        email: string;
        password: string;
    }
}

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/login', async (request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply) => {
        await AuthController.login(request, reply);
    });
}