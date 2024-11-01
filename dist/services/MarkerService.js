import { MarkerDAL } from "../dal/MarkerDAL.js";
export class MarkerService {
    static async selectById(id) {
        if (id <= 0) {
            throw new Error("ID inválido para busca");
        }
        try {
            const marker = await MarkerDAL.selectById(id);
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
        if (userId <= 0) {
            throw new Error("ID inválido para solicitação");
        }
        try {
            const marker = await MarkerDAL.selectByUserId(userId);
            if (marker) {
                return marker;
            }
            return [];
        }
        catch (error) {
            console.log(`Erro ao buscar marcadores pelo ID do usuário: ${error.message}`);
            throw new Error(error.message);
        }
    }
    static async selectByNoteId(noteId) {
        if (noteId <= 0) {
            throw new Error("ID inválido para solicitação");
        }
        try {
            const noteMarkers = await MarkerDAL.selectByNoteId(noteId);
            return noteMarkers;
        }
        catch (error) {
            console.log(`Erro ao buscar notas pelo ID do usuário: ${error.message}`);
            throw new Error(error.message);
        }
    }
    static async create(marker) {
        try {
            const newNote = await MarkerDAL.create(marker);
            if (newNote) {
                return newNote;
            }
            return null;
        }
        catch (error) {
            console.log(`Erro ao criar marcador: ${error.message}`);
            throw new Error(error.message);
        }
    }
    static async update(marker) {
        try {
            const updatedNote = await MarkerDAL.update(marker);
            return updatedNote;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async delete(id) {
        try {
            if (id <= 0) {
                throw new Error("ID inválido para solicitação");
            }
            const deleted = await MarkerDAL.delete(id);
            return deleted;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
