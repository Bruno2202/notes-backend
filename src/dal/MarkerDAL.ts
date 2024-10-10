import { MarkerModel } from "../models/MarkerModel.js";
import { DB } from "./DB.js";

export class MarkerDAL {
    static async selectById(id: number): Promise<MarkerModel | null> {
        try {
            const query = {
                text: "SELECT * FROM markers WHERE ID = $1",
                values: [id]
            }

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return new MarkerModel(
                    res.rows[0].user_id,
                    res.rows[0].title,
                    res.rows[0].id,
                );
            }

            return null;
        } catch (error: any) {
            console.error(`Erro ao buscar marcador: ${error.message}`);
            throw error.message;
        }
    }

    static async selectByUserId(userId: number): Promise<MarkerModel[] | null> {
        try {
            const query = {
                text: "SELECT * FROM markers WHERE user_id = $1 ORDER BY id DESC",
                values: [userId]
            }

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return res.rows.map(row => new MarkerModel(
                    row.user_id,
                    row.description,
                    row.id,
                ));
            }

            return null;
        } catch (error: any) {
            console.error(`DAL - Erro ao buscar marcadores: ${error.message}`);
            throw error.message;
        }
    }

    static async selectByNoteId(noteId: number): Promise<MarkerModel[] | null> {
        try {
            const query = {
                text: `
                    SELECT * FROM markers 
                    JOIN notes_markers 
                    ON markers.id = notes_markers.marker_id 
                    WHERE notes_markers.note_id = $1;
                `,
                values: [noteId],
            };

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                console.log(res.rows.map(row => new MarkerModel(
                    row.user_id,
                    row.description,
                    row.marker_id
                )));
                return res.rows.map(row => new MarkerModel(
                    row.user_id,
                    row.description,
                    row.marker_id
                ));
            }

            return null;
        } catch (error: any) {
            console.error("Erro ao selecionar marcadores das notas:", error);
            throw error;
        }
    }

    static async create(marker: MarkerModel): Promise<MarkerModel | null> {
        try {
            const query = {
                text: 'INSERT INTO markers (user_id, description) VALUES ($1, $2) RETURNING *;',
                values: [marker.getUserId, marker.getDescription]
            };

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return new MarkerModel(
                    res.rows[0].user_id,
                    res.rows[0].description,
                    res.rows[0].id,
                );
            }

            return null;
        } catch (error: any) {
            console.error(`Erro ao criar marcador: ${error.message}`);
            throw error;
        }
    }

    static async update(marker: MarkerModel): Promise<MarkerModel | null> {
        try {
            const query = {
                text: 'UPDATE markers SET user_id = $1, type_id = $2 WHERE id = $3 RETURNING *;',
                values: [marker.getUserId, marker.getDescription, marker.getId]
            };

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return new MarkerModel(
                    res.rows[0].user_id,
                    res.rows[0].description,
                    res.rows[0].id,
                );
            }

            return null;
        } catch (error: any) {
            console.log(`Erro ao atualizar marcador: ${error.message}`);
            throw error;
        }
    }

    static async delete(id: number): Promise<boolean> {
        try {
            const query = {
                text: 'DELETE FROM markers WHERE id = $1 RETURNING *;',
                values: [id]
            };

            const res = await DB.pool.query(query);

            if (res.rowCount === 0) {
                return false;
            }

            return true;
        } catch (error: any) {
            console.log(`Não foi possível deletar marcador: ${error.message}`);
            throw new Error(error.message);
        }
    }
}