"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedNotesService = void 0;
const uuid_1 = require("uuid");
const UserService_1 = require("./UserService");
const NoteService_1 = require("./NoteService");
const SharedNotesDAL_1 = require("../dal/SharedNotesDAL");
class SharedNotesService {
    static async shareNote(sharedBy, sharedWith, noteId, sharedAt) {
        if (await UserService_1.UserService.selectById(sharedBy) === null) {
            throw new Error("O usuário remetente não existe");
        }
        if (await UserService_1.UserService.selectById(sharedWith) === null) {
            throw new Error("O usuário destinatário não existe");
        }
        if (await NoteService_1.NoteService.selectById(noteId) === null) {
            throw new Error("A nota a ser compartilhada não existe");
        }
        try {
            return await SharedNotesDAL_1.SharedNotesDAL.shareNote(sharedBy, sharedWith, noteId, sharedAt);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async unshareNote(id) {
        if (!await SharedNotesService.selectById(id)) {
            throw new Error("Esse compartilhamento não existe");
        }
        try {
            return await SharedNotesDAL_1.SharedNotesDAL.unshareNote(id);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async selectById(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new Error("ID inválido para solicitação");
        }
        try {
            return await SharedNotesDAL_1.SharedNotesDAL.selectById(id);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.SharedNotesService = SharedNotesService;
