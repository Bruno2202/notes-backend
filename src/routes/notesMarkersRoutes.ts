import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { NotesMarkersController } from "../controllers/NotesMarkersController.js";

export interface NotesMarkersRequestBody {
    noteMarker: {
        noteId: number;
        markerId: number;
    }
}

export default async function notesMarkersRoutes(fastify: FastifyInstance) {
    fastify.post('/notesMarkers', async (request: FastifyRequest<{ Body: NotesMarkersRequestBody }>, reply: FastifyReply) => {
        await NotesMarkersController.create(request, reply);
    });

    fastify.delete('/notesMarkers', async (request: FastifyRequest<{ Body: NotesMarkersRequestBody }>, reply: FastifyReply) => {
        await NotesMarkersController.delete(request, reply);
    });
}