import jwt from 'jsonwebtoken';
import { UserModel } from './UserModel.js';
import { FastifyReply, FastifyRequest } from 'fastify';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const JW_SECRET: string | undefined = process.env.JW_SECRET;

interface Params {
    id: number;
    user: UserModel;
}

export class TokenModel {
    static generateToken(user: UserModel): string {
        const payload = {
            id: user.getId,
            email: user.getEmail
        }

        const token = jwt.sign(payload, JW_SECRET!, { expiresIn: '1s' });

        return token;
    }

    // static async storeUserToken(token: string) {
    //     try {
    //         // await AsyncStorage.setItem('@UserToken', token);
    //     } catch (error) {
    //         console.log(`Erro ao salvar token: ${error}`);
    //     }
    // }

    // static async getToken(): Promise<string | null> {
    //     try {
    //         // return await AsyncStorage.getItem('@UserToken');
    //     } catch (error) {
    //         console.log(`Erro ao recupar token: ${error}`)
    //         return null;
    //     }
    // }

    // static extractTokenData(token: string): number | null {
    //     const [_, id] = token.split('.');
    //     if (!id) {
    //         return null;
    //     }
    //     const userId = Number(id);
    //     return isNaN(userId) ? null : userId;
    // }

    // static verifyToken(token: string, user: UserModel): boolean {
    //     const userId = this.extractTokenData(token);

    //     return userId === Number(user.getId);
    // }

    static verifyToken(token: string, reply: FastifyReply) {
        if (!token) {
            return reply.code(403).send('Token is required');
        }

        try {
            jwt.verify(token, JW_SECRET!);
            return reply.code(200).send('Valid token');
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                return reply.code(401).send('Token expired');
            } else {
                return reply.code(401).send('Invalid token');
            }
        }
    };

    // static async removeToken() {
    //     try {
    //         // await AsyncStorage.removeItem('@UserToken');
    //     } catch (error) {
    //         console.log(`Erro ao remover token: ${error}`);
    //     }
    // }
}


