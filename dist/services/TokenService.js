import jwt from 'jsonwebtoken';
const JW_SECRET = process.env.JW_SECRET;
export class TokenService {
    static compareSecret(secret) {
        if (secret != JW_SECRET) {
            console.log(secret, JW_SECRET);
            return false;
        }
        return true;
    }
    static generateToken(user) {
        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, JW_SECRET);
        return token;
    }
    static getTokenData(token) {
        return jwt.verify(token, JW_SECRET);
    }
    static validateToken(token) {
        try {
            if (!token) {
                return false;
            }
            jwt.verify(token, JW_SECRET);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
