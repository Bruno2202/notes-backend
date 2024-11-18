"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDAL = void 0;
const client_1 = require("@prisma/client");
const UserModel_js_1 = require("../models/UserModel.js");
const prisma = new client_1.PrismaClient();
class UserDAL {
    static async select() {
        try {
            const res = await prisma.users.findMany();
            if (res.length > 0) {
                return res.map(user => new UserModel_js_1.UserModel(user.name, user.email, user.password, user.creationDate, user.id, user.pic));
            }
            return [];
        }
        catch (error) {
            console.error("DAL - Erro ao selecionar usuários:", error);
            throw error;
        }
    }
    static async selectById(id) {
        try {
            const res = await prisma.users.findUnique({
                where: {
                    id: id
                }
            });
            if (res) {
                return new UserModel_js_1.UserModel(res.name, res.email, res.password, res.creationDate, res.id, res.pic);
            }
            return null;
        }
        catch (error) {
            console.error(`DAL - Erro ao buscar usuário: ${error.message}`);
            throw error;
        }
    }
    static async selectByEmail(email) {
        try {
            const res = await prisma.users.findUnique({
                where: {
                    email: email
                }
            });
            if (res) {
                return new UserModel_js_1.UserModel(res.name, res.email, res.password, res.creationDate, res.id, res.pic);
            }
            return null;
        }
        catch (error) {
            console.error(`DAL - Erro ao buscar usuário: ${error.message}`);
            throw error;
        }
    }
    static async create(user) {
        try {
            const res = await prisma.users.create({
                data: {
                    name: user.getName,
                    email: user.getEmail,
                    password: user.getPassword,
                    creationDate: user.setCreationDate,
                }
            });
            if (res) {
                return new UserModel_js_1.UserModel(res.name, res.email, res.password, res.creationDate, res.id);
            }
            return null;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async update(user) {
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
                    pic: user.getUserPic,
                }
            });
            if (res) {
                return new UserModel_js_1.UserModel(res.name, res.email, res.password, res.creationDate, res.id, res.pic);
            }
            return null;
        }
        catch (error) {
            console.log(`DAL - Erro ao atualizar usuário: ${error.message}`);
            throw error;
        }
    }
    static async delete(id) {
        try {
            const res = await prisma.users.delete({
                where: {
                    id: id
                }
            });
            if (res) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(`DAL - Não foi possível deletar usuário: ${error.message}`);
            throw error;
        }
    }
}
exports.UserDAL = UserDAL;
