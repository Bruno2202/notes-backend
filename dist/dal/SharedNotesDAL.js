"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedNotesDAL = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class SharedNotesDAL {
    static async shareNote(sharedBy, sharedWith, noteId, sharedAt) {
        try {
            const res = await prisma.sharedNotes.create({
                data: {
                    noteId: noteId,
                    sharedBy: sharedBy,
                    sharedWith: sharedWith,
                    sharedAt: sharedAt
                }
            });
            return !!res;
        }
        catch (error) {
            console.log(`Erro ao compartilhar nota: ${error}`);
            throw new Error(error.message);
        }
    }
    static async unshareNote(noteId, sharedWith) {
        try {
            const res = await prisma.sharedNotes.deleteMany({
                where: {
                    noteId: noteId,
                    sharedWith: sharedWith
                }
            });
            return !!res;
        }
        catch (error) {
            console.log(`Erro ao descompartilhar nota: ${error}`);
            throw new Error(error.message);
        }
    }
    static async selectById(id) {
        try {
            const res = await prisma.sharedNotes.findUnique({
                where: {
                    id: id
                }
            });
            return !!res;
        }
        catch (error) {
            console.log(`Erro ao selecionar compartilhamento: ${error}`);
            throw new Error(error.message);
        }
    }
    static async selectByNoteAndUserId(noteId, userId) {
        try {
            const res = await prisma.sharedNotes.findMany({
                where: {
                    noteId: noteId,
                    sharedWith: userId
                }
            });
            console.log(res);
            return !!res;
        }
        catch (error) {
            console.log(`Erro ao selecionar compartilhamento: ${error}`);
            throw new Error(error.message);
        }
    }
}
exports.SharedNotesDAL = SharedNotesDAL;
