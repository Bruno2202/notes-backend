import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { sharedNotesController, ShareNoteReply } from "../controllers/SharedNotesController";
import AuthMiddleware from "../middleswares/AuthMiddleware";

export interface SharedNotesRequestBody {
    sharedBy: string;
    sharedWith: string;
    noteId: string;
    sharedAt: Date;
}

export default async function sharedNotesRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: SharedNotesRequestBody, Reply: ShareNoteReply }>(
        '/share-note',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Body: SharedNotesRequestBody }>, reply: FastifyReply<{ Reply: ShareNoteReply }>) => {
            await sharedNotesController.shareNote(request, reply)
        }
    )

    fastify.delete<{ Body: SharedNotesRequestBody, Reply: ShareNoteReply }>(
        '/unshare-note',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Body: SharedNotesRequestBody }>, reply: FastifyReply<{ Reply: ShareNoteReply }>) => {
            await sharedNotesController.unshareNote(request, reply)
        }
    )
}
