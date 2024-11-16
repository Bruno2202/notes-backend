import { MarkerModel } from "../models/MarkerModel.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MarkerDAL {
    static async selectById(id: string): Promise<MarkerModel | null> {
        try {
            const res = await prisma.markers.findUnique({
                where: {
                    id: id
                }
            });

            if (res) {
                return new MarkerModel(
                    res.userId,
                    res.description,
                    res.id
                );
            }

            return null;
        } catch (error: any) {
            console.error(`DAL - Erro ao buscar marcador: ${error.message}`);
            throw error.message;
        }
    }

    static async selectByUserId(userId: string): Promise<MarkerModel[]> {
        try {
            const res = await prisma.markers.findMany({
                where: {
                    userId: userId
                },
            })

            if (res.length > 0) {
                return res.map(row => new MarkerModel(
                    row.userId,
                    row.description,
                    row.id,
                ));
            }

            return [];
        } catch (error: any) {
            console.error(`DAL - Erro ao buscar marcadores: ${error.message}`);
            throw error.message;
        }
    }

    static async selectByNoteId(noteId: string): Promise<MarkerModel[]> {
        try {
            const res = await prisma.markers.findMany({
                where: {
                    notes: {
                        some: { id: noteId },
                    },
                },
            });

            if (res.length > 0) {
                return res.map(row => new MarkerModel(
                    row.userId,
                    row.description,
                    row.id
                ));
            }

            return [];
        } catch (error: any) {
            console.error("DAL - Erro ao selecionar marcadores das notas:", error);
            throw error;
        }
    }

    static async create(marker: MarkerModel): Promise<MarkerModel | null> {
        try {
            const res = await prisma.markers.create({
                data: {
                    userId: marker.getUserId,
                    description: marker.getDescription
                }
            })

            if (res) {
                return new MarkerModel(
                    res.userId,
                    res.description,
                    res.id,
                );
            }

            return null;
        } catch (error: any) {
            console.error(`DAL - Erro ao criar marcador: ${error.message}`);
            throw error;
        }
    }

    static async update(marker: MarkerModel): Promise<MarkerModel | null> {
        try {
            const res = await prisma.markers.update({
                where: {
                    id: marker.getId
                },
                data: {
                    description: marker.getDescription
                }
            })

            if (res) {
                return new MarkerModel(
                    res.userId,
                    res.description,
                    res.id,
                );
            }

            return null;
        } catch (error: any) {
            console.log(`DAL - Erro ao atualizar marcador: ${error.message}`);
            throw error;
        }
    }

    static async delete(id: string): Promise<boolean> {
        try {
            const res = await prisma.markers.delete({
                where: {
                    id: id
                }
            })

            if (res) {
                return true;
            }

            return false;
        } catch (error: any) {
            console.log(`DAL - Não foi possível deletar marcador: ${error.message}`);
            throw new Error(error.message);
        }
    }
}