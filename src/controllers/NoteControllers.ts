import { FastifyReply, FastifyRequest } from "fastify";
import { NoteRequestBody } from "../routes/noteRoutes.js";
import { NoteRequestParams } from "../routes/noteRoutes.js";
import { NoteModel } from "../models/NoteModel.js";
import { NoteService } from "../services/NoteService.js";
import { CompleteNotes } from "../dal/NoteDAL.js";

export class NoteController {
    static async select(reply: FastifyReply) {
        try {
            const notes: NoteModel[] = await NoteService.select();

            reply.code(200).send(notes);
        } catch (error: any) {
            console.log(`Erro ao obter notas: ${error.message}`);
            reply.status(500).send({ error: "Erro interno do servidor" });
        }
    }

    static async selectById(request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) {
        try {
            const note: NoteModel | null = await NoteService.selectById(request.params.id);

            if (note) {
                reply.code(200).send(note);
            } else {
                reply.code(404).send({ error: "Nota não encontrada" });
            }
        } catch (error: any) {
            switch (error.message) {
                case 'ID inválido para busca':
                    reply.code(400).send({ error: error.message });
                    break;

                default:
                    console.log("Erro ao buscar nota pelo id:", error);
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }

    static async selectByUserId(request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) {
        try {
            const notes: CompleteNotes[] = await NoteService.selectByUserId(request.params.userId);

            if (notes) {
                reply.code(200).send(notes);
            } else {
                reply.code(404).send({ error: "Notas não encontradas" });
            }
        } catch (error: any) {
            switch (error.message) {
                case 'ID inválido para busca':
                    reply.code(400).send({ error: error.message });
                    break;

                default:
                    console.log("Erro ao buscar notas pelo id do usuário:", error);
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }

    static async update(request: FastifyRequest<{ Body: NoteRequestBody }>, reply: FastifyReply) {
        const requestNote = new NoteModel(
            request.body.note.userId,
            request.body.note.typeId,
            request.body.note.creationDate,
            request.body.note.id,
            request.body.note.title,
            request.body.note.content,
        );

        try {
            const note = await NoteService.update(requestNote);

            if (note) {
                reply.code(200).send(requestNote);
            } else {
                reply.code(404).send({ error: "Não foi possível atualizar nota" });
            }
        } catch (error: any) {
            console.log(`Erro ao atualizar nota: ${error.message}`);
            reply.code(500).send({ error: "Erro interno do servidor. Tente novamente mais tarde" });
        }
    }

    static async create(request: FastifyRequest<{ Body: NoteRequestBody }>, reply: FastifyReply) {
        const requestNote = new NoteModel(
            request.body.note.userId,
            request.body.note.typeId,
            request.body.note.creationDate,
            request.body.note.id,
            request.body.note.title,
            request.body.note.content,
        );

        try {
            const note = await NoteService.create(requestNote);
            if (note) {
                reply.code(201).send({
                    message: "Nota criada com sucesso",
                    note: note
                });
            } else {
                reply.code(400).send({ error: "Não foi possível criar nota" });
            }
        } catch (error: any) {
            console.log(`Erro ao criar nota: ${error.message}`);
            reply.code(500).send({ error: "Erro interno do servidor. Tente novamente mais tarde" });
        }
    }

    static async delete(request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) {
        try {
            const deleted = await NoteService.delete(request.params.id);

            if (deleted) {
                reply.code(200).send({
                    message: "Nota deletada com sucesso!",
                    deleted: deleted
                });
            }
        } catch (error: any) {
            switch (error.message) {
                case "ID inválido para solicitação":
                    reply.code(400).send({
                        error: error.message,
                        deleted: false
                    });
                    break;

                default:
                    console.log(`Erro ao deletar nota: ${error.message}`);
                    reply.code(500).send({ error: "Erro interno do servidor. Tente novamente mais tarde" });
                    break;
            }
        }
    }
}