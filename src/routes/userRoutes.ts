import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/UserController.js";
import { UserModel } from "../models/UserModel.js";
import TokenMiddleware from "../middleswares/TokenMiddleware.js";
import AuthMiddleware from "../middleswares/AuthMiddleware.js";

export interface Params {
    user: UserModel;
    id: string;
    email: string;
}

export interface UserRequestBody {
    user: {
        id?: string;
        name: string;
        email: string;
        password: string;
        userPic?: string | null;
        creationDate: Date;
    }
}

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/users',
        { preHandler: TokenMiddleware.verifySecret },
        async (request: FastifyRequest, reply: FastifyReply) => {
            await UserController.select(reply);
        });

    fastify.get<{ Params: Params }>(
        '/user/:id',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
            await UserController.selectById(request, reply);
        });

    fastify.get<{ Params: Params }>(
        '/user/email/:email',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
            await UserController.selectByEmail(request, reply);
        });

    fastify.post<{ Body: UserRequestBody }>(
        '/user/validate',
        { preHandler: TokenMiddleware.verifySecret },
        async (request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply) => {
            await UserController.validateFields(request, reply);
        });

    fastify.put<{ Body: UserRequestBody }>(
        '/user',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply) => {
            await UserController.update(request, reply);
        });

    fastify.delete<{ Params: Params }>(
        '/user/:id',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
            await UserController.delete(request, reply);
        });
}