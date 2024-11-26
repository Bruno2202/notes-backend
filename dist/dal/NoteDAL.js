"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const MarkerModel_js_1 = require("../models/MarkerModel.js");
const NoteModel_js_1 = require("../models/NoteModel.js");
const prisma = new client_1.PrismaClient();
class NoteDAL {
    static async select() {
        try {
            const res = await prisma.notes.findMany({
                include: {
                    markers: true,
                },
            });
            if (res.length > 0) {
                return res.map(note => new NoteModel_js_1.NoteModel(note.userId, note.typeId, note.creationDate, note.id, note.title, note.content, note.color, note.markers.map(marker => new MarkerModel_js_1.MarkerModel(marker.userId, marker.description, marker.id))));
            }
            return [];
        }
        catch (error) {
            console.error("Erro ao selecionar notas:", error);
            throw error;
        }
    }
    static async selectById(id) {
        try {
            const res = await prisma.notes.findUnique({
                where: {
                    id: id,
                },
            });
            if (res) {
                return new NoteModel_js_1.NoteModel(res.userId, res.typeId, res.creationDate, res.id, res.title, res.content, res.color);
            }
            return null;
        }
        catch (error) {
            console.error(`Erro ao buscar nota: ${error.message}`);
            throw error;
        }
    }
    static async selectByUserId(userId) {
        try {
            const res = await prisma.notes.findMany({
                where: {
                    userId: userId
                },
                include: {
                    markers: true,
                },
                orderBy: {
                    creationDate: 'desc'
                }
            });
            if (res.length > 0) {
                return res.map(row => new NoteModel_js_1.NoteModel(row.userId, row.typeId, row.creationDate, row.id, row.title, row.content, row.color, row.markers.map(marker => new MarkerModel_js_1.MarkerModel(marker.userId, marker.description, marker.id))));
            }
            return [];
        }
        catch (error) {
            console.error(`DAL - Erro ao buscar notas: ${error.message}`);
            throw error;
        }
    }
    static async create(note) {
        try {
            const res = await prisma.notes.create({
                data: {
                    userId: note.getUserId,
                    typeId: note.getTypeId,
                    title: note.getTitle,
                    content: note.getContent,
                    creationDate: note.getCreationDate ? note.getCreationDate : new Date(),
                    color: note.getColor ? note.getColor : "#1F1F1F"
                }
            });
            if (res) {
                return new NoteModel_js_1.NoteModel(res.userId, res.typeId, res.creationDate, res.id, res.title, res.content, res.color);
            }
            return null;
        }
        catch (error) {
            console.error(`Erro ao criar nota: ${error.message}`);
            throw error;
        }
    }
    static async update(note) {
        try {
            const res = await prisma.notes.update({
                where: {
                    id: note.getId
                },
                data: {
                    title: note.getTitle,
                    content: note.getContent,
                    color: note.getColor
                }
            });
            if (res) {
                return new NoteModel_js_1.NoteModel(res.userId, res.typeId, res.creationDate, res.id, res.title, res.content, res.color);
            }
            return null;
        }
        catch (error) {
            console.log(`Erro ao atualizar nota: ${error.message}`);
            throw error;
        }
    }
    static async delete(id) {
        try {
            const res = await prisma.notes.delete({
                where: {
                    id: id
                }
            });
            if (res) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(`Não foi possível deletar nota: ${error.message}`);
            throw new Error(error);
        }
    }
    static async addMarkerToNote(noteId, markerId) {
        try {
            const res = await prisma.notes.update({
                where: {
                    id: noteId
                },
                data: {
                    markers: {
                        connect: { id: markerId },
                    }
                }
            });
            if (res) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(`Não foi possível adicionar marcador à nota: ${error.message}`);
            throw new Error(error);
        }
    }
    static async removeMarkerFromNote(noteId, markerId) {
        try {
            const res = await prisma.notes.update({
                where: {
                    id: noteId
                },
                data: {
                    markers: {
                        disconnect: { id: markerId },
                    }
                }
            });
            if (res) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(`Não foi possível remover marcador à nota: ${error.message}`);
            throw new Error(error);
        }
    }
    static async getSharedNotes(userId) {
        try {
            const res = await prisma.notes.findMany({
                where: {
                    sharedNotes: {
                        some: {
                            sharedWith: userId
                        }
                    }
                },
                include: {
                    markers: true
                }
            });
            if (res.length > 0) {
                return res.map(note => new NoteModel_js_1.NoteModel(note.userId, note.typeId, note.creationDate, note.id, note.title, note.content, note.color, note.markers.map(marker => new MarkerModel_js_1.MarkerModel(marker.userId, marker.description, marker.id))));
            }
            return [];
        }
        catch (error) {
            console.log(`Erro ao selecionar compartilhamento: ${error}`);
            throw new Error(error.message);
        }
    }
}
exports.default = NoteDAL;
