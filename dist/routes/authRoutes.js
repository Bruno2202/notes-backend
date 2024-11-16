"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const AuthController_js_1 = require("../controllers/AuthController.js");
async function authRoutes(fastify) {
    fastify.post('/login', async (request, reply) => {
        await AuthController_js_1.AuthController.login(request, reply);
    });
    fastify.post('/register', async (request, reply) => {
        await AuthController_js_1.AuthController.register(request, reply);
    });
}
