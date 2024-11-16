import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthController } from "../controllers/AuthController.js";

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
    fastify.post('/login', async (request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply) => {
        await AuthController.login(request, reply);
    });

    fastify.post('/register', async (request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply) => {
        await AuthController.register(request, reply);
    });
}