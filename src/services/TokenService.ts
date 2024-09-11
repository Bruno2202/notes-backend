import jwt, { JwtPayload } from 'jsonwebtoken';

const JW_SECRET: string = process.env.JW_SECRET!;

export class TokenService {
    static generateToken(user: { id: number, email: string }): string {
        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, JW_SECRET!);
        return token;
    }

    static getTokenData(token: string): JwtPayload {
        return jwt.verify(token, JW_SECRET!) as JwtPayload;
    }

    static validateToken(token: string | undefined): boolean {
        try {
            if (!token) {
                return false;
            }

            jwt.verify(token, JW_SECRET!);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}


