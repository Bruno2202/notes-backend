import { DB } from "./DB.js";
import { UserModel } from "../models/UserModel.js";


export class UserDAL {

    static async select(): Promise<UserModel[] | null> {
        try {
            const query = {
                text: 'SELECT * FROM usuarios;'
            };

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return res.rows.map(row => new UserModel(
                    row.nome,
                    row.email,
                    row.senha,
                    row.id,
                    row.foto
                ));
            }

            return null;
        } catch (error) {
            console.error("Erro ao selecionar usuários:", error);
            throw error;
        }
    }

    static async selectById(id: number): Promise<UserModel | null> {
        try {
            const query = {
                text: 'SELECT * FROM usuarios where ID = $1;',
                values: [id],
            }

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return new UserModel(
                    res.rows[0].nome,
                    res.rows[0].email,
                    res.rows[0].senha,
                    res.rows[0].id,
                    res.rows[0].foto
                );
            }

            return null;
        } catch (error: any) {
            console.error(`Erro ao buscar usuário: ${error.message}`);
            throw error.message;
        }
    }

    static async selectByEmail(email: string): Promise<UserModel | null> {
        try {
            const query = {
                text: 'SELECT * FROM usuarios WHERE email = $1::text;',
                values: [email],
            }

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return new UserModel(
                    res.rows[0].nome,
                    res.rows[0].email,
                    res.rows[0].senha,
                    res.rows[0].id,
                    res.rows[0].foto
                );
            }

            return null;
        } catch (error: any) {
            console.error(`Erro ao buscar usuário: ${error.message}`);
            throw error;
        }
    }

    static async create(user: UserModel): Promise<UserModel | null> {
        try {
            const query = {
                text: 'INSERT INTO usuarios (NOME, EMAIL, SENHA, FOTO) VALUES ($1, $2, $3, $4) RETURNING *;',
                values: [user.getName, user.getEmail, user.getPassword, user.getUserPic],
            };

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                return new UserModel(
                    res.rows[0].nome,
                    res.rows[0].email,
                    res.rows[0].senha,
                    res.rows[0].id,
                    res.rows[0].foto
                );
            }

            return null;
        } catch (error: any) {
            console.error(`Erro ao criar usuário: ${error.message}`);
            throw error;
        }
    }

    static async update(user: UserModel): Promise<UserModel | null> {
        try {
            const query = {
                text: 'UPDATE usuarios SET nome = $1, email = $2, senha = $3, foto = $4 WHERE id = $5 RETURNING *;',
                values: [user.getName, user.getEmail, user.getPassword, user.getUserPic, user.getId]
            };

            const res = await DB.pool.query(query);

            if (res.rowCount! > 0) {
                console.log("Usuário atualizado com sucesso!");
                return new UserModel(
                    res.rows[0].nome,
                    res.rows[0].email,
                    res.rows[0].senha,
                    res.rows[0].id,
                    res.rows[0].foto
                );
            } else {
                console.log(`Nenhum usuário encontrado com o ID ${user.getId}`);
                return null;
            }
        } catch (error: any) {
            console.log(`Erro ao atualizar usuário: ${error.message}`);
            throw error;
        }
    }

    static async delete(id: number): Promise<boolean> {
        try {
            const query = {
                text: 'DELETE FROM usuarios WHERE id = $1 RETURNING *;',
                values: [id]
            };

            const res = await DB.pool.query(query);

            if (res.rowCount = 0) {
                return true;
            }

            return false;
        } catch (error: any) {
            console.log(`Não foi possível delete usuário: ${error.message}`);
            throw error.message;
        }
    }
}