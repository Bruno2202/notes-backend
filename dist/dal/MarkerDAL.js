"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerDAL = void 0;
const MarkerModel_js_1 = require("../models/MarkerModel.js");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MarkerDAL {
    static async selectById(id) {
        try {
            const res = await prisma.markers.findUnique({
                where: {
                    id: id
                }
            });
            if (res) {
                return new MarkerModel_js_1.MarkerModel(res.userId, res.description, res.id);
            }
            return null;
        }
        catch (error) {
            console.error(`DAL - Erro ao buscar marcador: ${error.message}`);
            throw error.message;
        }
    }
    static async selectByUserId(userId) {
        try {
            const res = await prisma.markers.findMany({
                where: {
                    userId: userId
                },
            });
            if (res.length > 0) {
                return res.map(row => new MarkerModel_js_1.MarkerModel(row.userId, row.description, row.id));
            }
            return [];
        }
        catch (error) {
            console.error(`DAL - Erro ao buscar marcadores: ${error.message}`);
            throw error.message;
        }
    }
    static async selectByNoteId(noteId) {
        try {
            const res = await prisma.markers.findMany({
                where: {
                    notes: {
                        some: { id: noteId },
                    },
                },
            });
            if (res.length > 0) {
                return res.map(row => new MarkerModel_js_1.MarkerModel(row.userId, row.description, row.id));
            }
            return [];
        }
        catch (error) {
            console.error("DAL - Erro ao selecionar marcadores das notas:", error);
            throw error;
        }
    }
    static async create(marker) {
        try {
            const res = await prisma.markers.create({
                data: {
                    userId: marker.getUserId,
                    description: marker.getDescription
                }
            });
            if (res) {
                return new MarkerModel_js_1.MarkerModel(res.userId, res.description, res.id);
            }
            return null;
        }
        catch (error) {
            console.error(`DAL - Erro ao criar marcador: ${error.message}`);
            throw error;
        }
    }
    static async update(marker) {
        try {
            const res = await prisma.markers.update({
                where: {
                    id: marker.getId
                },
                data: {
                    description: marker.getDescription
                }
            });
            if (res) {
                return new MarkerModel_js_1.MarkerModel(res.userId, res.description, res.id);
            }
            return null;
        }
        catch (error) {
            console.log(`DAL - Erro ao atualizar marcador: ${error.message}`);
            throw error;
        }
    }
    static async delete(id) {
        try {
            const res = await prisma.markers.delete({
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
            console.log(`DAL - Não foi possível deletar marcador: ${error.message}`);
            throw new Error(error.message);
        }
    }
}
exports.MarkerDAL = MarkerDAL;
