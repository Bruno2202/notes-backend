"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tokenRoutes;
const TokenController_js_1 = require("../controllers/TokenController.js");
const TokenMiddleware_js_1 = __importDefault(require("../middleswares/TokenMiddleware.js"));
async function tokenRoutes(fastify) {
    fastify.post('/token', { preHandler: TokenMiddleware_js_1.default.verifySecret }, async (request, reply) => {
        TokenController_js_1.TokenController.validateToken(request, reply);
    });
    fastify.post('/token/generate', { preHandler: TokenMiddleware_js_1.default.verifySecret }, async (request, reply) => {
        TokenController_js_1.TokenController.generateToken(request, reply);
    });
    fastify.post('/token/data', { preHandler: TokenMiddleware_js_1.default.verifySecret }, async (request, reply) => {
        TokenController_js_1.TokenController.getTokenData(request, reply);
    });
}
