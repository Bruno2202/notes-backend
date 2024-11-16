import { PrismaClient } from "@prisma/client";
import { MarkerModel } from "../models/MarkerModel.js";
import { NoteModel } from "../models/NoteModel.js";

const prisma = new PrismaClient();

export default class NoteDAL {
    static async select(): Promise<NoteModel[]> {
        try {
            const res = await prisma.notes.findMany({
                include: {
                    markers: true,
                },
            });

            if (res.length > 0) {
                return res.map(note => new NoteModel(
                    note.userId,
                    note.typeId,
                    note.creationDate,
                    note.id,
                    note.title,
                    note.content,
                    note.color,
                    note.markers.map(marker => new MarkerModel(
                        marker.userId,
                        marker.description,
                        marker.id
                    ))
                ));
            }

            return [];
        } catch (error: any) {
            console.error("Erro ao selecionar notas:", error);
            throw error;
        }
    }

    static async selectById(id: string): Promise<NoteModel | null> {
        try {
            const res = await prisma.notes.findUnique({
                where: {
                    id: id,
                },
            });

            if (res) {
                return new NoteModel(
                    res.userId,
                    res.typeId,
                    res.creationDate,
                    res.id,
                    res.title,
                    res.content,
                    res.color
                );
            }

            return null;
        } catch (error: any) {
            console.error(`Erro ao buscar nota: ${error.message}`);
            throw error;
        }
    }

    static async selectByUserId(userId: string): Promise<NoteModel[]> {
        try {
            const res = await prisma.notes.findMany({
                where: {
                    userId: userId
                },
                include: {
                    markers: true,
                },
                orderBy: {
                    creationDate: 'desc'
                }
            });

            if (res.length > 0) {
                return res.map(row => new NoteModel(
                    row.userId,
                    row.typeId,
                    row.creationDate,
                    row.id,
                    row.title,
                    row.content,
                    row.color,
                    row.markers.map(marker => new MarkerModel(
                        marker.userId,
                        marker.description,
                        marker.id
                    ))
                ));
            }

            return []
        } catch (error: any) {
            console.error(`DAL - Erro ao buscar notas: ${error.message}`);
            throw error;
        }
    }

    static async create(note: NoteModel): Promise<NoteModel | null> {
        try {
            const res = await prisma.notes.create({
                data: {
                    userId: note.getUserId,
                    typeId: note.getTypeId,
                    title: note.getTitle,
                    content: note.getContent,
                    creationDate: note.getCreationDate ? note.getCreationDate : new Date(),
                    color: note.getColor ? note.getColor : "#1F1F1F"
                }
            });

            if (res) {
                return new NoteModel(
                    res.userId,
                    res.typeId,
                    res.creationDate,
                    res.id,
                    res.title,
                    res.content,
                    res.color
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
            const res = await prisma.notes.update({
                where: {
                    id: note.getId
                },
                data: {
                    title: note.getTitle,
                    content: note.getContent,
                    color: note.getColor
                }
            })

            if (res) {
                return new NoteModel(
                    res.userId,
                    res.typeId,
                    res.creationDate,
                    res.id,
                    res.title,
                    res.content,
                    res.color
                );
            }

            return null;
        } catch (error: any) {
            console.log(`Erro ao atualizar nota: ${error.message}`);
            throw error;
        }
    }

    static async delete(id: string): Promise<boolean> {
        try {
            const res = await prisma.notes.delete({
                where: {
                    id: id
                }
            });

            if (res) {
                return true;
            }

            return false;
        } catch (error: any) {
            console.log(`Não foi possível deletar nota: ${error.message}`);
            throw new Error(error);
        }
    }

    static async addMarkerToNote(noteId: string, markerId: string): Promise<boolean> {
        try {
            const res = await prisma.notes.update({
                where: {
                    id: noteId
                },
                data: {
                    markers: {
                        connect: { id: markerId },
                    }
                }
            })

            if (res) {
                return true;
            }

            return false;
        } catch (error: any) {
            console.log(`Não foi possível adicionar marcador à nota: ${error.message}`);
            throw new Error(error);
        }
    }

    static async removeMarkerFromNote(noteId: string, markerId: string): Promise<boolean> {
        try {
            const res = await prisma.notes.update({
                where: {
                    id: noteId
                },
                data: {
                    markers: {
                        disconnect: { id: markerId },
                    }
                }
            });

            if (res) {
                return true;
            }

            return false;
        } catch (error: any) {
            console.log(`Não foi possível remover marcador à nota: ${error.message}`);
            throw new Error(error);
        }
    }
}