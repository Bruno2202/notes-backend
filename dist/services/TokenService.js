"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
class TokenService {
    static compareSecret(secret) {
        if (secret != JWT_SECRET) {
            console.log(secret, JWT_SECRET);
            return false;
        }
        return true;
    }
    static generateToken(id, email) {
        const payload = { id, email };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET);
        return token;
    }
    static getTokenData(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    static validateToken(token) {
        try {
            if (!token) {
                return false;
            }
            jsonwebtoken_1.default.verify(token, JWT_SECRET);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.TokenService = TokenService;
