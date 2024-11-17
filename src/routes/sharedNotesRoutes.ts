import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { sharedNotesController } from "../controllers/SharedNotesController";
import AuthMiddleware from "../middleswares/AuthMiddleware";

export interface SharedNotesRequestBody {
    sharedBy: string;
    sharedWith: string;
    noteId: string;
    sharedAt: Date;
}

export interface SharedNotesRequestParams {
    id: string;
}

export default async function sharedNotesRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: SharedNotesRequestBody }>(
        '/share-note',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Body: SharedNotesRequestBody }>, reply: FastifyReply) => {
            await sharedNotesController.shareNote(request, reply)
        }
    )

    fastify.delete<{ Params: SharedNotesRequestParams }>(
        '/unshare-note/:id',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: SharedNotesRequestParams }>, reply: FastifyReply) => {
            await sharedNotesController.unshareNote(request, reply)
        }
    )
}
