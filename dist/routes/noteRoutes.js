"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = noteRoutes;
const NoteControllers_js_1 = require("../controllers/NoteControllers.js");
const AuthMiddleware_js_1 = __importDefault(require("../middleswares/AuthMiddleware.js"));
async function noteRoutes(fastify) {
    fastify.get('/notes', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await NoteControllers_js_1.NoteController.select(reply);
    });
    fastify.get('/note/:id', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await NoteControllers_js_1.NoteController.selectById(request, reply);
    });
    fastify.get('/notes/user/:userId', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await NoteControllers_js_1.NoteController.selectByUserId(request, reply);
    });
    fastify.post('/note', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await NoteControllers_js_1.NoteController.create(request, reply);
    });
    fastify.put('/note', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await NoteControllers_js_1.NoteController.update(request, reply);
    });
    fastify.delete('/note/:id', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await NoteControllers_js_1.NoteController.delete(request, reply);
    });
    fastify.put('/note/:noteId/marker/:markerId/add', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await NoteControllers_js_1.NoteController.addMarkerToNote(request, reply);
    });
    fastify.put('/note/:noteId/marker/:markerId/remove', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await NoteControllers_js_1.NoteController.removeMarkerFromNote(request, reply);
    });
    fastify.get('/notes/shared-with/:userId', { preHandler: AuthMiddleware_js_1.default.verifyAuth }, async (request, reply) => {
        await NoteControllers_js_1.NoteController.getSharedNotes(request, reply);
    });
}
