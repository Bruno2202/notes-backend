"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
const uuid_1 = require("uuid");
const NoteDAL_js_1 = __importDefault(require("../dal/NoteDAL.js"));
const MarkerService_js_1 = require("./MarkerService.js");
class NoteService {
    static async select() {
        try {
            const notes = await NoteDAL_js_1.default.select();
            if (notes && notes.length > 0) {
                return notes;
            }
            return [];
        }
        catch (error) {
            console.error("Erro no serviço de notas:", error.message);
            throw new Error(error.message);
        }
    }
    static async selectById(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new Error("ID inválido para busca");
        }
        try {
            const note = await NoteDAL_js_1.default.selectById(id);
            if (note) {
                return note;
            }
            return null;
        }
        catch (error) {
            console.log(`Erro ao selecionar nota pelo ID: ${error.message}`);
            throw new Error(error.message);
        }
    }
    static async selectByUserId(userId) {
        if (!(0, uuid_1.validate)(userId)) {
            throw new Error("ID inválido para solicitação");
        }
        try {
            const notes = await NoteDAL_js_1.default.selectByUserId(userId);
            if (notes) {
                return notes;
            }
            return [];
        }
        catch (error) {
            console.log(`Erro ao buscar notas pelo ID do usuário: ${error.message}`);
            throw new Error(error.message);
        }
    }
    static async create(note) {
        try {
            const newNote = await NoteDAL_js_1.default.create(note);
            if (newNote) {
                return newNote;
            }
            return null;
        }
        catch (error) {
            console.log(`Erro ao criar nota: ${error.message}`);
            throw new Error(error.message);
        }
    }
    static async update(note) {
        try {
            const updatedNote = await NoteDAL_js_1.default.update(note);
            return updatedNote;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async delete(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new Error("ID inválido para solicitação");
        }
        if (await this.selectById(id) === null) {
            throw new Error("A nota com o ID informado não existe");
        }
        try {
            const deleted = await NoteDAL_js_1.default.delete(id);
            return deleted;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async addMarkerToNote(noteId, markerId) {
        if (!(0, uuid_1.validate)(noteId)) {
            throw new Error("ID da nota é inválido para solicitação");
        }
        if (await NoteService.selectById(noteId) === null) {
            throw new Error("A nota com o ID informado não existe");
        }
        if (!(0, uuid_1.validate)(markerId)) {
            throw new Error("ID do marcador é inválido para solicitação");
        }
        if (await MarkerService_js_1.MarkerService.selectById(markerId) === null) {
            throw new Error("O marcador com o ID informado não existe");
        }
        try {
            return await NoteDAL_js_1.default.addMarkerToNote(noteId, markerId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async removeMarkerFromNote(noteId, markerId) {
        if (!(0, uuid_1.validate)(noteId)) {
            throw new Error("ID da nota é inválido para solicitação");
        }
        if (await NoteService.selectById(noteId) === null) {
            throw new Error("A nota com o ID informado não existe");
        }
        if (!(0, uuid_1.validate)(markerId)) {
            throw new Error("ID do marcador é inválido para solicitação");
        }
        if (await MarkerService_js_1.MarkerService.selectById(markerId) === null) {
            throw new Error("O marcador com o ID informado não existe");
        }
        try {
            return await NoteDAL_js_1.default.removeMarkerFromNote(noteId, markerId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.NoteService = NoteService;
