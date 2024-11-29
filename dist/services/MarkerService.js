"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerService = void 0;
const uuid_1 = require("uuid");
const MarkerDAL_js_1 = require("../dal/MarkerDAL.js");
const NoteService_js_1 = require("./NoteService.js");
class MarkerService {
    static async selectById(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new Error("ID inválido para busca");
        }
        try {
            const marker = await MarkerDAL_js_1.MarkerDAL.selectById(id);
            if (marker) {
                return marker;
            }
            return null;
        }
        catch (error) {
            console.log(`Erro ao selecionar marcador pelo ID: ${error.message}`);
            throw new Error(error.message);
        }
    }
    static async selectByUserId(userId) {
        if (!(0, uuid_1.validate)(userId)) {
            throw new Error("ID inválido para solicitação");
        }
        try {
            const markers = await MarkerDAL_js_1.MarkerDAL.selectByUserId(userId);
            if (markers) {
                return markers;
            }
            return [];
        }
        catch (error) {
            console.log(`Erro ao buscar marcadores pelo ID do usuário: ${error.message}`);
            throw new Error(error.message);
        }
    }
    static async selectByNoteId(noteId) {
        if (!(0, uuid_1.validate)(noteId)) {
            throw new Error("ID inválido para solicitação");
        }
        if (await NoteService_js_1.NoteService.selectById(noteId) === null) {
            throw new Error("A nota com o ID informado não existe");
        }
        try {
            const noteMarkers = await MarkerDAL_js_1.MarkerDAL.selectByNoteId(noteId);
            return noteMarkers;
        }
        catch (error) {
            console.log(`Erro ao buscar notas pelo ID do usuário: ${error.message}`);
            throw new Error(error.message);
        }
    }
    static async create(marker) {
        try {
            const newMarker = await MarkerDAL_js_1.MarkerDAL.create(marker);
            if (newMarker) {
                return newMarker;
            }
            return null;
        }
        catch (error) {
            console.log(`Erro ao criar marcador: ${error.message}`);
            throw new Error(error.message);
        }
    }
    static async update(marker) {
        if (await MarkerService.selectById(marker.getId) === null) {
            throw new Error("O marcador com o ID informado não existe");
        }
        try {
            const updatedNote = await MarkerDAL_js_1.MarkerDAL.update(marker);
            return updatedNote;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async delete(id) {
        try {
            if (!(0, uuid_1.validate)(id)) {
                throw new Error("ID inválido para solicitação");
            }
            const deleted = await MarkerDAL_js_1.MarkerDAL.delete(id);
            return deleted;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.MarkerService = MarkerService;
