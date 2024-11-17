import { validate } from "uuid";
import NoteDAL from "../dal/NoteDAL.js";
import { NoteModel } from "../models/NoteModel.js";
import { MarkerModel } from "../models/MarkerModel.js";
import { MarkerService } from "./MarkerService.js";
import { UserService } from "./UserService.js";
import { TokenService } from "./TokenService.js";

export class NoteService {
    static async select(): Promise<NoteModel[]> {
        try {
            const notes: NoteModel[] = await NoteDAL.select();

            if (notes && notes.length > 0) {
                return notes;
            }

            return [];
        } catch (error: any) {
            console.error("Erro no serviço de notas:", error.message);
            throw new Error(error.message);
        }
    }

    static async selectById(id: string) {
        if (!validate(id)) {
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

    static async selectByUserId(userId: string): Promise<NoteModel[]> {
        if (!validate(userId)) {
            throw new Error("ID inválido para solicitação");
        }

        try {
            const notes: NoteModel[] = await NoteDAL.selectByUserId(userId);

            if (notes) {
                return notes;
            }

            return [];
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

    static async delete(id: string): Promise<boolean> {
        if (!validate(id)) {
            throw new Error("ID inválido para solicitação");
        }

        if (await this.selectById(id) === null) {
            throw new Error("A nota com o ID informado não existe");
        }

        try {
            const deleted = await NoteDAL.delete(id);

            return deleted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async addMarkerToNote(noteId: string, markerId: string): Promise<boolean> {
        if (!validate(noteId)) {
            throw new Error("ID da nota é inválido para solicitação");
        }

        if (await NoteService.selectById(noteId) === null) {
            throw new Error("A nota com o ID informado não existe");
        }

        if (!validate(markerId)) {
            throw new Error("ID do marcador é inválido para solicitação");
        }

        if (await MarkerService.selectById(markerId) === null) {
            throw new Error("O marcador com o ID informado não existe");
        }

        try {
            return await NoteDAL.addMarkerToNote(noteId, markerId);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async removeMarkerFromNote(noteId: string, markerId: string): Promise<boolean> {
        if (!validate(noteId)) {
            throw new Error("ID da nota é inválido para solicitação");
        }

        if (await NoteService.selectById(noteId) === null) {
            throw new Error("A nota com o ID informado não existe");
        }

        if (!validate(markerId)) {
            throw new Error("ID do marcador é inválido para solicitação");
        }

        if (await MarkerService.selectById(markerId) === null) {
            throw new Error("O marcador com o ID informado não existe");
        }

        try {
            return await NoteDAL.removeMarkerFromNote(noteId, markerId);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getSharedNotesWithMe(userId: string, authorization: string): Promise<NoteModel[]> {
        if (await UserService.selectById(userId) === null) {
            throw new Error("Usuário não econtrado")
        }

        const { id } = TokenService.getTokenData(authorization);

        if (userId != id) {
            throw new Error("Não é possível visualizar as notas compartilhadas de outros usuários")
        }

        try {
            return await NoteDAL.getSharedNotesWithMe(userId);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}