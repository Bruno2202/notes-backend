import NoteDAL from "../dal/NoteDAL.js";
export class NoteService {
    static async select() {
        try {
            const notes = await NoteDAL.select();
            if (notes) {
                return notes;
            }
            return [];
        }
        catch (error) {
            throw new error.message;
        }
    }
    static async selectById(id) {
        if (id <= 0) {
            throw new Error("ID inválido para busca");
        }
        try {
            const note = await NoteDAL.selectById(id);
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
        if (userId <= 0) {
            throw new Error("ID inválido para solicitação");
        }
        try {
            const notes = await NoteDAL.selectByUserId(userId);
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
            const newNote = await NoteDAL.create(note);
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
            const updatedNote = await NoteDAL.update(note);
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
            const deleted = await NoteDAL.delete(id);
            return deleted;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
