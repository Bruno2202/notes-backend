"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const AuthController_js_1 = require("../controllers/AuthController.js");
const TokenMiddleware_js_1 = __importDefault(require("../middleswares/TokenMiddleware.js"));
async function authRoutes(fastify) {
    fastify.post('/login', { preHandler: TokenMiddleware_js_1.default.verifySecret }, async (request, reply) => {
        await AuthController_js_1.AuthController.login(request, reply);
    });
    fastify.post('/register', { preHandler: TokenMiddleware_js_1.default.verifySecret }, async (request, reply) => {
        await AuthController_js_1.AuthController.register(request, reply);
    });
}
