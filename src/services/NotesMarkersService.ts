import NotesMarkersDAL from "../dal/NotesMarkersDAL.js";
import NotesMarkersModel from "../models/NotesMarkersModel.js";

export class NotesMarkersService {
    static async create(noteMarker: NotesMarkersModel): Promise<boolean> {
        try {
            const created: boolean = await NotesMarkersDAL.create(noteMarker);

            return created;
        } catch (error: any) {
            console.log(`Erro ao salvar marcador na nota: ${error.message}`);
            throw new Error(error.message);
        }
    }

    static async delete(noteMarker: NotesMarkersModel): Promise<boolean> {
        try {
            const deleted = await NotesMarkersDAL.delete(noteMarker);

            return deleted;
        } catch (error: any) {
            console.log(`Erro ao excluir marcador da nota: ${error.message}`);
            throw new Error(error.message);
        }
    }
}