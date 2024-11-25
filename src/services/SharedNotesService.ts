import { validate } from "uuid";
import { UserService } from "./UserService";
import { NoteService } from "./NoteService";
import { SharedNotesDAL } from "../dal/SharedNotesDAL";

export class SharedNotesService {
    static async shareNote(sharedBy: string, sharedWith: string, noteId: string, sharedAt: Date): Promise<boolean> {
        if (await UserService.selectById(sharedBy) === null) {
            throw new Error("O usuário remetente não existe");
        }

        if (await UserService.selectById(sharedWith) === null) {
            throw new Error("O usuário destinatário não existe");
        }

        if (await NoteService.selectById(noteId) === null) {
            throw new Error("A nota a ser compartilhada não existe");
        }

        try {
            return await SharedNotesDAL.shareNote(sharedBy, sharedWith, noteId, sharedAt);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async unshareNote(noteId: string, sharedWith: string): Promise<boolean> {
        if (!await this.selectByNoteAndUserId(noteId, sharedWith)) {
            throw new Error("Esse compartilhamento não existe");
        }

        try {
            return await SharedNotesDAL.unshareNote(noteId, sharedWith);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async selectById(id: string): Promise<boolean> {
        if (!validate(id)) {
            throw new Error("ID inválido para solicitação");
        }

        try {
            return await SharedNotesDAL.selectById(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async selectByNoteAndUserId(noteId: string, userId: string): Promise<boolean> {
        if (!validate(noteId) || !validate(userId)) {
            throw new Error("ID inválido para solicitação");
        }

        try {
            return await SharedNotesDAL.selectByNoteAndUserId(noteId, userId);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}