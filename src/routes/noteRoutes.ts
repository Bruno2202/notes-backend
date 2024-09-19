import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { NoteController } from "../controllers/NoteControllers.js";

export interface NoteRequestBody {
    note: {
        userId: number,
        typeId: number;
        creationDate: Date;
        id?: number;
        title: string;
        content: string;
    }
}

export interface NoteRequestParams {
    userId: number,
    id: number;
}

export default async function noteRoutes(fastify: FastifyInstance) {
    fastify.get('/notes', async (request: FastifyRequest, reply: FastifyReply) => {
        await NoteController.select(reply);
    });

    fastify.get('/notes/:id', async (request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) => {
        await NoteController.selectById(request, reply);
    });

    fastify.get('/notes/user/:userId', async (request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) => {
        await NoteController.selectByUserId(request, reply);
    });

    fastify.post('/notes', async (request: FastifyRequest<{ Body: NoteRequestBody }>, reply: FastifyReply) => {
        await NoteController.create(request, reply);
    });

    fastify.put('/notes', async (request: FastifyRequest<{ Body: NoteRequestBody }>, reply: FastifyReply) => {
        await NoteController.update(request, reply);
    });

    fastify.delete('/notes/:id', async (request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) => {
        await NoteController.delete(request, reply);
    });
}