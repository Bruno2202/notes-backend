"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoutes;
const UserController_js_1 = require("../controllers/UserController.js");
const TokenMiddleware_js_1 = __importDefault(require("../middleswares/TokenMiddleware.js"));
const AuthMiddleware_js_1 = __importDefault(require("../middleswares/AuthMiddleware.js"));
async function userRoutes(fastify) {
    fastify.get('/users', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await UserController_js_1.UserController.select(reply);
    });
    fastify.get('/user/:id', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await UserController_js_1.UserController.selectById(request, reply);
    });
    fastify.get('/user/email/:email', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await UserController_js_1.UserController.selectByEmail(request, reply);
    });
    fastify.post('/user/validate', { preHandler: TokenMiddleware_js_1.default.verifySecret }, async (request, reply) => {
        await UserController_js_1.UserController.validateFields(request, reply);
    });
    fastify.put('/user', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await UserController_js_1.UserController.update(request, reply);
    });
    fastify.delete('/user/:id', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await UserController_js_1.UserController.delete(request, reply);
    });
}
