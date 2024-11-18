import { PrismaClient } from "@prisma/client";
import { UserModel } from "../models/UserModel.js";

const prisma = new PrismaClient();

export class UserDAL {

    static async select(): Promise<UserModel[]> {
        try {
            const res = await prisma.users.findMany();

            if (res.length > 0) {
                return res.map(user => new UserModel(
                    user.name,
                    user.email,
                    user.password,
                    user.creationDate,
                    user.id,
                    user.pic
                ));
            }

            return [];
        } catch (error) {
            console.error("DAL - Erro ao selecionar usuários:", error);
            throw error;
        }
    }

    static async selectById(id: string): Promise<UserModel | null> {
        try {
            const res = await prisma.users.findUnique({
                where: {
                    id: id
                }
            })

            if (res) {
                return new UserModel(
                    res.name,
                    res.email,
                    res.password,
                    res.creationDate,
                    res.id,
                    res.pic
                );
            }

            return null;
        } catch (error: any) {
            console.error(`DAL - Erro ao buscar usuário: ${error.message}`);
            throw error;
        }
    }

    static async selectByEmail(email: string): Promise<UserModel | null> {
        try {
            const res = await prisma.users.findUnique({
                where: {
                    email: email
                }
            })

            if (res) {
                return new UserModel(
                    res.name,
                    res.email,
                    res.password,
                    res.creationDate,
                    res.id,
                    res.pic
                );
            }

            return null;
        } catch (error: any) {
            console.error(`DAL - Erro ao buscar usuário: ${error.message}`);
            throw error;
        }
    }

    static async create(user: UserModel): Promise<UserModel | null> {
        try {
            const res = await prisma.users.create({
                data: {
                    name: user.getName,
                    email: user.getEmail,
                    password: user.getPassword,
                    creationDate: user.setCreationDate,
                }
            })

            if (res) {
                return new UserModel(
                    res.name,
                    res.email,
                    res.password,
                    res.creationDate,
                    res.id,
                );
            }

            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async update(user: UserModel): Promise<UserModel | null> {
        try {
            const res = await prisma.users.update({
                where: {
                    id: user.getId
                },
                data: {
                    name: user.getName,
                    email: user.getEmail,
                    password: user.getPassword,
                    creationDate: user.getCreationDate,
                    pic: user.getUserPic as string,
                }
            })

            if (res) {
                return new UserModel(
                    res.name,
                    res.email,
                    res.password,
                    res.creationDate,
                    res.id,
                    res.pic
                );
            }

            return null;
        } catch (error: any) {
            console.log(`DAL - Erro ao atualizar usuário: ${error.message}`);
            throw error;
        }
    }

    static async delete(id: string): Promise<boolean> {
        try {
            const res = await prisma.users.delete({
                where: {
                    id: id
                }
            })

            if (res) {
                return true;
            }

            return false;
        } catch (error: any) {
            console.log(`DAL - Não foi possível deletar usuário: ${error.message}`);
            throw error;
        }
    }
}