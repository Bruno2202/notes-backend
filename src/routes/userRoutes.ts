import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/UserController.js";
import { UserModel } from "../models/UserModel.js";

export interface Params {
    user: UserModel;
    id: number;
    email: string;
}

export interface UserRequestBody {
    user: {
        name: string;
        email: string;
        password: string;
        id?: number; 
        userPic?: string | null;
    }
}

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/usuarios', async (request: FastifyRequest, reply: FastifyReply) => {
        await UserController.select(reply);
    });

    fastify.get('/usuarios/id/:id', async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
        await UserController.selectById(request, reply);
    });

    fastify.get('/usuarios/email/:email', async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
        await UserController.selectByEmail(request, reply);
    });

    fastify.post('/usuarios', async (request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply) => {
        await UserController.registrer(request, reply);
    });
    
    fastify.post('/usuarios/validar', async (request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply) => {
        await UserController.validateFields(request, reply);
    });

    fastify.put('/usuarios', async (request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply) => {
        await UserController.update(request, reply);
    });

    fastify.delete('/usuarios/:id', async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
        await UserController.delete(request, reply);
    });
}