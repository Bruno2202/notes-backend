import NotesMarkersDAL from "../dal/NotesMarkersDAL.js";
export class NotesMarkersService {
    static async create(noteMarker) {
        try {
            const created = await NotesMarkersDAL.create(noteMarker);
            return created;
        }
        catch (error) {
            console.log(`Erro ao salvar marcador na nota: ${error.message}`);
            throw new Error(error.message);
        }
    }
    static async delete(noteMarker) {
        try {
            const deleted = await NotesMarkersDAL.delete(noteMarker);
            return deleted;
        }
        catch (error) {
            console.log(`Erro ao excluir marcador da nota: ${error.message}`);
            throw new Error(error.message);
        }
    }
}
