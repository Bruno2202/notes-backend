"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = markerRoutes;
const MarkerController_js_1 = require("../controllers/MarkerController.js");
const AuthMiddleware_js_1 = __importDefault(require("../middleswares/AuthMiddleware.js"));
async function markerRoutes(fastify) {
    fastify.get('/marker/:id', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await MarkerController_js_1.MarkerController.selectById(request, reply);
    });
    fastify.get('/markers/user/:userId', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await MarkerController_js_1.MarkerController.selectByUserId(request, reply);
    });
    fastify.get('/markers/note/:noteId', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await MarkerController_js_1.MarkerController.selectByNoteId(request, reply);
    });
    fastify.post('/marker', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await MarkerController_js_1.MarkerController.create(request, reply);
    });
    fastify.put('/marker', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await MarkerController_js_1.MarkerController.update(request, reply);
    });
    fastify.delete('/marker/:id', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await MarkerController_js_1.MarkerController.delete(request, reply);
    });
}
