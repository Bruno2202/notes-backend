import { FastifyReply, FastifyRequest } from "fastify";
import { MarkerAndNoteRequestParams, NoteRequestBody } from "../routes/noteRoutes.js";
import { NoteRequestParams } from "../routes/noteRoutes.js";
import { NoteModel } from "../models/NoteModel.js";
import { NoteService } from "../services/NoteService.js";
import { MarkerRequestBody, MarkerRequestParams } from "../routes/markerRoutes.js";
import { MarkerModel } from "../models/MarkerModel.js";
import { Notes } from "@prisma/client";
import { Console } from "console";

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
            const notes: NoteModel[] = await NoteService.selectByUserId(request.params.userId);

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

    static async create(request: FastifyRequest<{ Body: NoteRequestBody }>, reply: FastifyReply) {
        const requestNote = new NoteModel(
            request.body.note.userId,
            request.body.note.typeId,
            request.body.note.creationDate,
            "",
            request.body.note.title,
            request.body.note.content,
            request.body.note.color,
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
            reply.code(500).send({ error: "Erro interno do servidor." });
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
            request.body.note.color
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
            reply.code(500).send({ error: "Erro interno do servidor." });
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
                case "A nota com o ID informado não existe":
                    reply.code(400).send({
                        error: error.message,
                        deleted: false
                    });
                    break;

                default:
                    console.log(`Erro ao deletar nota: ${error.message}`);
                    reply.code(500).send({
                        error: "Erro interno do servidor.",
                        deleted: false
                    });
                    break;
            }
        }
    }

    static async addMarkerToNote(request: FastifyRequest<{ Params: MarkerAndNoteRequestParams }>, reply: FastifyReply) {
        try {
            const added: boolean = await NoteService.addMarkerToNote(request.params.noteId, request.params.markerId);

            if (added) {
                reply.code(201).send({
                    message: "Marcador adicionado com sucesso à nota!",
                    added: added
                })
            }
        } catch (error: any) {
            switch (error.message) {
                case "ID da nota é inválido para solicitação":
                case "A nota com o ID informado não existe":
                case "ID do marcador é inválido para solicitação":
                case "O marcador com o ID informado não existe":
                case "ID inválido para busca":
                    reply.code(400).send({
                        error: error.message,
                        added: false
                    });
            }

            console.log(`Erro ao deletar nota: ${error.message}`);
            reply.code(500).send({
                error: "Erro interno do servidor.",
                added: false
            });
        }
    }

    static async removeMarkerFromNote(request: FastifyRequest<{ Params: MarkerAndNoteRequestParams }>, reply: FastifyReply) {
        try {
            const removed: boolean = await NoteService.removeMarkerFromNote(request.params.noteId, request.params.markerId);

            if (removed) {
                reply.code(201).send({
                    message: "Marcador removido com sucesso da nota!",
                    removed: removed
                })
            }
        } catch (error: any) {
            switch (error.message) {
                case "ID da nota é inválido para solicitação":
                case "A nota com o ID informado não existe":
                case "ID do marcador é inválido para solicitação":
                case "O marcador com o ID informado não existe":
                case "ID inválido para busca":
                    reply.code(400).send({
                        error: error.message,
                        removed: false
                    });
            }

            console.log(`Erro ao deletar nota: ${error.message}`);
            reply.code(500).send({
                error: "Erro interno do servidor.",
                removed: false
            });
        }
    }

    static async getSharedNotes(request: FastifyRequest<{ Params: NoteRequestParams }>, reply: FastifyReply) {
        const userId = request.params.userId
        const { authorization } = request.headers;

        try {
            const notes: NoteModel[] = await NoteService.getSharedNotes(userId, authorization as string);

            if (notes) {
                reply.code(200).send({
                    notes
                })
            }
        } catch (error: any) {
            switch (error.message) {
                case "ID inválido para busca":
                case "Usuário não econtrado":
                case "Não é possível visualizar as notas compartilhadas de outros usuários":
                    reply.code(400).send({
                        error: error.message,
                    });
            }

            console.log(`Erro ao buscar notas compartilhadas: ${error.message}`);
            reply.code(500).send({
                error: "Erro interno do servidor.",
            });
        }
    }
}