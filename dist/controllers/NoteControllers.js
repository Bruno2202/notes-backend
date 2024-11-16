"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const NoteModel_js_1 = require("../models/NoteModel.js");
const NoteService_js_1 = require("../services/NoteService.js");
class NoteController {
    static async select(reply) {
        try {
            const notes = await NoteService_js_1.NoteService.select();
            reply.code(200).send(notes);
        }
        catch (error) {
            console.log(`Erro ao obter notas: ${error.message}`);
            reply.status(500).send({ error: "Erro interno do servidor" });
        }
    }
    static async selectById(request, reply) {
        try {
            const note = await NoteService_js_1.NoteService.selectById(request.params.id);
            if (note) {
                reply.code(200).send(note);
            }
            else {
                reply.code(404).send({ error: "Nota não encontrada" });
            }
        }
        catch (error) {
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
    static async selectByUserId(request, reply) {
        try {
            const notes = await NoteService_js_1.NoteService.selectByUserId(request.params.userId);
            if (notes) {
                reply.code(200).send(notes);
            }
            else {
                reply.code(404).send({ error: "Notas não encontradas" });
            }
        }
        catch (error) {
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
    static async create(request, reply) {
        const requestNote = new NoteModel_js_1.NoteModel(request.body.note.userId, request.body.note.typeId, request.body.note.creationDate, "", request.body.note.title, request.body.note.content, request.body.note.color);
        try {
            const note = await NoteService_js_1.NoteService.create(requestNote);
            if (note) {
                reply.code(201).send({
                    message: "Nota criada com sucesso",
                    note: note
                });
            }
            else {
                reply.code(400).send({ error: "Não foi possível criar nota" });
            }
        }
        catch (error) {
            console.log(`Erro ao criar nota: ${error.message}`);
            reply.code(500).send({ error: "Erro interno do servidor." });
        }
    }
    static async update(request, reply) {
        const requestNote = new NoteModel_js_1.NoteModel(request.body.note.userId, request.body.note.typeId, request.body.note.creationDate, request.body.note.id, request.body.note.title, request.body.note.content, request.body.note.color);
        try {
            const note = await NoteService_js_1.NoteService.update(requestNote);
            if (note) {
                reply.code(200).send(requestNote);
            }
            else {
                reply.code(404).send({ error: "Não foi possível atualizar nota" });
            }
        }
        catch (error) {
            console.log(`Erro ao atualizar nota: ${error.message}`);
            reply.code(500).send({ error: "Erro interno do servidor." });
        }
    }
    static async delete(request, reply) {
        try {
            const deleted = await NoteService_js_1.NoteService.delete(request.params.id);
            if (deleted) {
                reply.code(200).send({
                    message: "Nota deletada com sucesso!",
                    deleted: deleted
                });
            }
        }
        catch (error) {
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
    static async addMarkerToNote(request, reply) {
        try {
            const added = await NoteService_js_1.NoteService.addMarkerToNote(request.params.noteId, request.params.markerId);
            if (added) {
                reply.code(201).send({
                    message: "Marcador adicionado com sucesso à nota!",
                    added: added
                });
            }
        }
        catch (error) {
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
    static async removeMarkerFromNote(request, reply) {
        try {
            const removed = await NoteService_js_1.NoteService.removeMarkerFromNote(request.params.noteId, request.params.markerId);
            if (removed) {
                reply.code(201).send({
                    message: "Marcador removido com sucesso da nota!",
                    removed: removed
                });
            }
        }
        catch (error) {
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
}
exports.NoteController = NoteController;
