import { MarkerDAL } from "../dal/MarkerDAL.js";
import { MarkerModel } from "../models/MarkerModel.js";

export class MarkerService {
    static async selectById(id: number) {
        if (id <= 0) {
            throw new Error("ID inválido para busca");
        }

        try {
            const marker: MarkerModel | null = await MarkerDAL.selectById(id);

            if (marker) {
                return marker;
            }

            return null;
        } catch (error: any) {
            console.log(`Erro ao selecionar marcador pelo ID: ${error.message}`);
            throw new Error(error.message);
        }
    }

    static async selectByUserId(userId: number): Promise<MarkerModel[] | null> {
        if (userId <= 0) {
            throw new Error("ID inválido para solicitação");
        }

        try {
            const marker: MarkerModel[] | null = await MarkerDAL.selectByUserId(userId);

            if (marker) {
                return marker;
            }

            return null;
        } catch (error: any) {
            console.log(`Erro ao buscar marcadores pelo ID do usuário: ${error.message}`);
            throw new Error(error.message);
        }
    }

    static async create(marker: MarkerModel): Promise<MarkerModel | null> {
        try {
            const newNote: MarkerModel | null = await MarkerDAL.create(marker);

            if (newNote) {
                return newNote;
            }

            return null;
        } catch (error: any) {
            console.log(`Erro ao criar marcador: ${error.message}`);
            throw new Error(error.message);
        }
    }

    static async update(marker: MarkerModel): Promise<MarkerModel | null> {
        try {
            const updatedNote: MarkerModel | null = await MarkerDAL.update(marker);

            return updatedNote;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async delete(id: number): Promise<boolean> {
        try {   
            if (id <= 0) {
                throw new Error("ID inválido para solicitação");
            }

            const deleted = await MarkerDAL.delete(id); 

            return deleted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}