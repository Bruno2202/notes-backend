import { validate } from "uuid";
import { MarkerDAL } from "../dal/MarkerDAL.js";
import { MarkerModel } from "../models/MarkerModel.js";
import { NoteService } from "./NoteService.js";

export class MarkerService {
    static async selectById(id: string) {
        if (!validate(id)) {
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

    static async selectByUserId(userId: string): Promise<MarkerModel[]> {
        if (!validate(userId)) {
            throw new Error("ID inválido para solicitação");
        }

        try {
            const markers: MarkerModel[] = await MarkerDAL.selectByUserId(userId);

            if (markers) {
                return markers;
            }

            return [];
        } catch (error: any) {
            console.log(`Erro ao buscar marcadores pelo ID do usuário: ${error.message}`);
            throw new Error(error.message);
        }
    }

    static async selectByNoteId(noteId: string): Promise<MarkerModel[]> {
        if (!validate(noteId)) {
            throw new Error("ID inválido para solicitação");
        }

        if (await NoteService.selectById(noteId) === null) {
            throw new Error("A nota com o ID informado não existe");
        }

        try {
            const noteMarkers: MarkerModel[] = await MarkerDAL.selectByNoteId(noteId);

            return noteMarkers;
        } catch (error: any) {
            console.log(`Erro ao buscar notas pelo ID do usuário: ${error.message}`);
            throw new Error(error.message);
        }
    }

    static async create(marker: MarkerModel): Promise<MarkerModel | null> {
        try {
            const newMarker: MarkerModel | null = await MarkerDAL.create(marker);

            if (newMarker) {
                return newMarker;
            }

            return null;
        } catch (error: any) {
            console.log(`Erro ao criar marcador: ${error.message}`);
            throw new Error(error.message);
        }
    }

    static async update(marker: MarkerModel): Promise<MarkerModel | null> {        
        if (await MarkerService.selectById(marker.getId!) === null) {
            throw new Error("O marcador com o ID informado não existe")
        }

        try {
            const updatedNote: MarkerModel | null = await MarkerDAL.update(marker);

            return updatedNote;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async delete(id: string): Promise<boolean> {
        try {   
            if (!validate(id)) {
                throw new Error("ID inválido para solicitação");
            }

            const deleted = await MarkerDAL.delete(id); 

            return deleted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}