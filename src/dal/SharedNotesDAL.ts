import { PrismaClient } from "@prisma/client";
import { NoteModel } from "../models/NoteModel";

const prisma = new PrismaClient();

export class SharedNotesDAL {
    static async shareNote(sharedBy: string, sharedWith: string, noteId: string, sharedAt: Date): Promise<boolean> {
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
        } catch (error: any) {
            console.log(`Erro ao compartilhar nota: ${error}`);
            throw new Error(error.message);
        }
    }

    static async unshareNote(noteId: string, sharedWith: string): Promise<boolean> {
        try {
            const res = await prisma.sharedNotes.deleteMany({
                where: {
                    noteId: noteId,
                    sharedWith: sharedWith
                }
            });

            return !!res;
        } catch (error: any) {
            console.log(`Erro ao descompartilhar nota: ${error}`);
            throw new Error(error.message);
        }
    }

    static async selectById(id: string): Promise<boolean> {
        try {
            const res = await prisma.sharedNotes.findUnique({
                where: {
                    id: id
                }
            });

            return !!res;
        } catch (error: any) {
            console.log(`Erro ao selecionar compartilhamento: ${error}`);
            throw new Error(error.message);
        }
    }

    static async selectByNoteAndUserId(noteId: string, userId: string): Promise<boolean> {
        try {
            const res = await prisma.sharedNotes.findMany({
                where: {
                    noteId: noteId,
                    sharedWith: userId
                }
            });

            console.log(res)

            return !!res;
        } catch (error: any) {
            console.log(`Erro ao selecionar compartilhamento: ${error}`);
            throw new Error(error.message);
        }
    }
}