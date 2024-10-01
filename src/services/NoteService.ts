import { NoteDAL } from "../dal/NoteDAL.js";
import { NoteModel } from "../models/NoteModel.js";

export class NoteService {
    static async select(): Promise<NoteModel[] | null> {
        try {
            const notes: NoteModel[] | null = await NoteDAL.select();

            if (notes) {
                return notes;
            }

            return null;
        } catch (error: any) {
            throw new error.message
        }
    }

    static async selectById(id: number) {
        if (id <= 0) {
            throw new Error("ID inválido para busca");
        }

        try {
            const note: NoteModel | null = await NoteDAL.selectById(id);

            if (note) {
                return note;
            }

            return null;
        } catch (error: any) {
            console.log(`Erro ao selecionar nota pelo ID: ${error.message}`);
            throw new Error(error.message);
        }
    }

    static async selectByUserId(userId: number): Promise<NoteModel[] | null> {
        if (userId <= 0) {
            throw new Error("ID inválido para solicitação");
        }

        try {
            const note: NoteModel[] | null = await NoteDAL.selectByUserId(userId);

            if (note) {
                return note;
            }

            return null;
        } catch (error: any) {
            console.log(`Erro ao buscar notas pelo ID do usuário: ${error.message}`);
            throw new Error(error.message);
        }
    }

    static async create(note: NoteModel): Promise<NoteModel | null> {
        try {
            const newNote: NoteModel | null = await NoteDAL.create(note);

            if (newNote) {
                return newNote;
            }

            return null;
        } catch (error: any) {
            console.log(`Erro ao criar nota: ${error.message}`);
            throw new Error(error.message);
        }
    }

    static async update(note: NoteModel): Promise<NoteModel | null> {
        try {
            const updatedNote: NoteModel | null = await NoteDAL.update(note);

            return updatedNote;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async delete(id: number): Promise<boolean> {
        try {   
            if (id <= 0) {
                throw new Error("ID inválido para solicitação");
            }

            const deleted = await NoteDAL.delete(id); 
            if (deleted) {
                return true;
            }

            return false;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}