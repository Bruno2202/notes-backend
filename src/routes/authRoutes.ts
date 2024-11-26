import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthController } from "../controllers/AuthController.js";
import TokenMiddleware from "../middleswares/TokenMiddleware.js";
import { UserModel } from "../models/UserModel.js";

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

export interface AuthReply {
    success: boolean;
    message?: string;
    error?: string;
    user?: UserModel
    token?: string
}


export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: AuthRequestBody, Reply: AuthReply }>(
        '/login',
        { preHandler: TokenMiddleware.verifySecret },
        async (request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply<{ Reply: AuthReply }>) => {
            await AuthController.login(request, reply);
        }
    );

    fastify.post<{ Body: AuthRequestBody,Reply: AuthReply }>(
        '/register',
        { preHandler: TokenMiddleware.verifySecret },
        async (request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply<{ Reply: AuthReply }>) => {
            await AuthController.register(request, reply);
        }
    );
}