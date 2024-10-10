import { DB } from "./DB.js";
import NotesMarkersModel from "../models/NotesMarkersModel.js";

export default class NotesMarkersDAL {
    static async create(noteMarker: NotesMarkersModel): Promise<boolean> {
        try {
            const query = {
                text: 'INSERT INTO notes_markers (note_id, marker_id) VALUES ($1, $2) RETURNING *;',
                values: [noteMarker.getNoteId, noteMarker.getMarkerId]
            };

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return true;
            }

            return false;
        } catch (error: any) {
            console.error(`Erro ao salvar marcador na nota: ${error.message}`);
            throw error;
        }
    }

    static async delete(noteMarker: NotesMarkersModel): Promise<boolean> {
        try {
            const query = {
                text: 'DELETE FROM notes_markers WHERE note_id = $1 AND marker_id = $2  RETURNING *;',
                values: [noteMarker.getNoteId, noteMarker.getMarkerId]
            };

            const res = await DB.pool.query(query);

            if (res.rowCount === 0) {
                return true;
            }

            return false;
        } catch (error: any) {
            console.log(`Erro ao deletar marcador da nota: ${error.message}`);
            throw new Error(error.message);
        }
    }
}