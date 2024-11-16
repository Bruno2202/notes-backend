"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoutes;
const UserController_js_1 = require("../controllers/UserController.js");
async function userRoutes(fastify) {
    fastify.get('/users', async (request, reply) => {
        await UserController_js_1.UserController.select(reply);
    });
    fastify.get('/user/:id', async (request, reply) => {
        await UserController_js_1.UserController.selectById(request, reply);
    });
    fastify.get('/user/email/:email', async (request, reply) => {
        await UserController_js_1.UserController.selectByEmail(request, reply);
    });
    fastify.post('/user/validate', async (request, reply) => {
        await UserController_js_1.UserController.validateFields(request, reply);
    });
    fastify.put('/user', async (request, reply) => {
        await UserController_js_1.UserController.update(request, reply);
    });
    fastify.delete('/user/:id', async (request, reply) => {
        await UserController_js_1.UserController.delete(request, reply);
    });
}
