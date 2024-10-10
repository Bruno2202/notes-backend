import { FastifyReply, FastifyRequest } from "fastify";
import { NotesMarkersRequestBody } from "../routes/notesMarkersRoutes.js";
import { NotesMarkersService } from "../services/NotesMarkersService.js";
import NotesMarkersModel from "../models/NotesMarkersModel.js";
import { MarkerModel } from "../models/MarkerModel.js";

export class NotesMarkersController {
    static async create(request: FastifyRequest<{ Body: NotesMarkersRequestBody }>, reply: FastifyReply) {
        const requestNoteMarker = new NotesMarkersModel(
            request.body.noteMarker.noteId,
            request.body.noteMarker.markerId
        );

        try {
            const created = await NotesMarkersService.create(requestNoteMarker);

            if (created) {
                reply.code(204).send();
            }
        } catch (error: any) {
            console.log(`Erro ao salvar marcador na nota: ${error.message}`);
            reply.code(500).send({ error: "Erro interno do servidor. Tente novamente mais tarde" });
        }
    }

    static async delete(request: FastifyRequest<{ Body: NotesMarkersRequestBody }>, reply: FastifyReply) {
        const requestNoteMarker = new NotesMarkersModel(
            request.body.noteMarker.noteId,
            request.body.noteMarker.markerId
        );

        try {
            const deleted = await NotesMarkersService.delete(requestNoteMarker);

            if (deleted) {
                reply.code(204).send();
            }
        } catch (error: any) {
            console.log(`Erro ao excluir marcador na nota: ${error.message}`);
            reply.code(500).send({ error: "Erro interno do servidor. Tente novamente mais tarde" });
        }
    }
}