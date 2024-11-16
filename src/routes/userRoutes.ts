import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/UserController.js";
import { UserModel } from "../models/UserModel.js";

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
    fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        await UserController.select(reply);
    });

    fastify.get('/user/:id', async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
        await UserController.selectById(request, reply);
    });

    fastify.get('/user/email/:email', async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
        await UserController.selectByEmail(request, reply);
    });
    
    fastify.post('/user/validate', async (request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply) => {
        await UserController.validateFields(request, reply);
    });

    fastify.put('/user', async (request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply) => {
        await UserController.update(request, reply);
    });

    fastify.delete('/user/:id', async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
        await UserController.delete(request, reply);
    });
}