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

    static async unshareNote(id: string): Promise<boolean> {
        try {
            const res = await prisma.sharedNotes.delete({
                where: {
                    id: id
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
}