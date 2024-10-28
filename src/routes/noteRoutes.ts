import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { NoteController } from "../controllers/NoteControllers.js";
import AuthMiddleware from "../middleswares/AuthMiddleware.js";

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
    fastify.get(
        '/notes',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest, reply: FastifyReply) => {
            await NoteController.select(reply);
        }
    );

    fastify.get<{ Params: NoteRequestParams }>(
        '/notes/:id',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) => {
            await NoteController.selectById(request, reply);
        }
    );

    fastify.get<{ Params: NoteRequestParams }>(
        '/notes/user/:userId',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) => {
            await NoteController.selectByUserId(request, reply);
        }
    );

    fastify.post<{ Body: NoteRequestBody }>(
        '/notes',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Body: NoteRequestBody }>, reply: FastifyReply) => {
            await NoteController.create(request, reply);
        }
    );

    fastify.put<{ Body: NoteRequestBody }>(
        '/notes',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Body: NoteRequestBody }>, reply: FastifyReply) => {
            await NoteController.update(request, reply);
        }
    );

    fastify.delete<{ Params: NoteRequestParams }>(
        '/notes/:id',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) => {
            await NoteController.delete(request, reply);
        }
    );
}