import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { NoteController } from "../controllers/NoteControllers.js";
import AuthMiddleware from "../middleswares/AuthMiddleware.js";

export interface NoteRequestBody {
    userId: string;
    note: {
        userId: string;
        typeId: number;
        creationDate: Date;
        id?: string;
        title?: string;
        content?: string;
        color?: string;
    }
}

export interface NoteRequestParams {
    userId: string,
    id: string;
}

export interface MarkerAndNoteRequestParams {
    noteId: string;
    markerId: string;
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
        '/note/:id',
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
        '/note',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Body: NoteRequestBody }>, reply: FastifyReply) => {
            await NoteController.create(request, reply);
        }
    );

    fastify.put<{ Body: NoteRequestBody }>(
        '/note',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Body: NoteRequestBody }>, reply: FastifyReply) => {
            await NoteController.update(request, reply);
        }
    );

    fastify.delete<{ Params: NoteRequestParams }>(
        '/note/:id',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) => {
            await NoteController.delete(request, reply);
        }
    );

    fastify.put<{ Params: MarkerAndNoteRequestParams }>(
        '/note/:noteId/marker/:markerId/add',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: MarkerAndNoteRequestParams }>, reply: FastifyReply) => {
            await NoteController.addMarkerToNote(request, reply);
        }
    );

    fastify.put<{ Params: MarkerAndNoteRequestParams }>(
        '/note/:noteId/marker/:markerId/remove',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: MarkerAndNoteRequestParams }>, reply: FastifyReply) => {
            await NoteController.removeMarkerFromNote(request, reply);
        }
    );

    fastify.get<{ Params: NoteRequestParams }>(
        '/notes/shared-with/:userId',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) => {
            await NoteController.getSharedNotesWithMe(request, reply)
        }
    )
}