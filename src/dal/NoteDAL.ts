import { NoteModel } from "../models/NoteModel.js";
import { DB } from "./DB.js";

export class NoteDAL {
    static async select(): Promise<NoteModel[] | null> {
        try {
            const query = {
                text: 'SELECT * FROM notes;'
            };

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return res.rows.map(row => new NoteModel(
                    row.user_id,
                    row.type_id,
                    row.creation_date,
                    row.id,
                    row.title,
                    row.content,
                ));
            }

            return null;
        } catch (error: any) {
            console.error("Erro ao selecionar notas:", error);
            throw error;
        }
    }

    static async selectById(id: number): Promise<NoteModel | null> {
        try {
            const query = {
                text: "SELECT * FROM notes WHERE ID = $1",
                values: [id]
            }

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return new NoteModel(
                    res.rows[0].user_id,
                    res.rows[0].type_id,
                    res.rows[0].creation_date,
                    res.rows[0].id,
                    res.rows[0].title,
                    res.rows[0].content,
                );
            }

            return null;
        } catch (error: any) {
            console.error(`Erro ao buscar nota: ${error.message}`);
            throw error.message;
        }
    }

    static async selectByUserId(userId: number): Promise<NoteModel[] | null> {
        try {
            const query = {
                text: "SELECT * FROM notes WHERE user_id = $1 ORDER BY creation_date DESC",
                values: [userId]
            }

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return res.rows.map(row => new NoteModel(
                    row.user_id,
                    row.type_id,
                    row.creation_date,
                    row.id,
                    row.title,
                    row.content,
                ));
            }

            return null;
        } catch (error: any) {
            console.error(`DAL - Erro ao buscar notas: ${error.message}`);
            throw error.message;
        }
    }

    static async create(note: NoteModel): Promise<NoteModel | null> {
        try {
            const query = {
                text: 'INSERT INTO notes (user_id, type_id, content, creation_date, title) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
                values: [note.getUserId, note.getTypeId, note.getContent, note.getCreationDate, note.getTitle],
            };

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return new NoteModel(
                    res.rows[0].id,
                    res.rows[0].user_id,
                    res.rows[0].type_id,
                    res.rows[0].creationDate,
                    res.rows[0].title,
                    res.rows[0].content,
                );
            }

            return null;
        } catch (error: any) {
            console.error(`Erro ao criar nota: ${error.message}`);
            throw error;
        }
    }

    static async update(note: NoteModel): Promise<NoteModel | null> {
        try {
            const query = {
                text: 'UPDATE notes SET user_id = $1, type_id = $2, content = $3, creation_date = $4, title = $5 WHERE id = $6 RETURNING *;',
                values: [note.getUserId, note.getTypeId, note.getContent, note.getCreationDate, note.getTitle, note.getId]
            };

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                console.log("Nota atualizada com sucesso!");
                return new NoteModel(
                    res.rows[0].user_id,
                    res.rows[0].type_id,
                    res.rows[0].creation_date,
                    res.rows[0].id,
                    res.rows[0].title,
                    res.rows[0].content
                );
            }

            return null;
        } catch (error: any) {
            console.log(`Erro ao atualizar nota: ${error.message}`);
            throw error;
        }
    }

    static async delete(id: number): Promise<boolean> {
        try {
            const query = {
                text: 'DELETE FROM notes WHERE id = $1 RETURNING *;',
                values: [id]
            };

            const res = await DB.pool.query(query);

            if (res.rowCount === 0) {
                return false;
            }

            return true;
        } catch (error: any) {
            console.log(`Não foi possível deletar nota: ${error.message}`);
            throw new Error(error.message);
        }
    }
}