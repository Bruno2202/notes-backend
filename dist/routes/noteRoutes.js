"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = noteRoutes;
const NoteControllers_js_1 = require("../controllers/NoteControllers.js");
async function noteRoutes(fastify) {
    fastify.get('/notes', 
    // { preHandler: AuthMiddleware.verifyAuth },
    async (request, reply) => {
        await NoteControllers_js_1.NoteController.select(reply);
    });
    fastify.get('/note/:id', 
    // { preHandler: AuthMiddleware.verifyAuth },
    async (request, reply) => {
        await NoteControllers_js_1.NoteController.selectById(request, reply);
    });
    fastify.get('/notes/user/:userId', 
    // { preHandler: AuthMiddleware.verifyAuth },
    async (request, reply) => {
        await NoteControllers_js_1.NoteController.selectByUserId(request, reply);
    });
    fastify.post('/note', 
    // { preHandler: AuthMiddleware.verifyAuth },
    async (request, reply) => {
        await NoteControllers_js_1.NoteController.create(request, reply);
    });
    fastify.put('/note', 
    // { preHandler: AuthMiddleware.verifyAuth },
    async (request, reply) => {
        await NoteControllers_js_1.NoteController.update(request, reply);
    });
    fastify.delete('/note/:id', 
    // { preHandler: AuthMiddleware.verifyAuth },
    async (request, reply) => {
        await NoteControllers_js_1.NoteController.delete(request, reply);
    });
    fastify.put('/note/:noteId/marker/:markerId/add', 
    // { preHandler: AuthMiddleware.verifyAuth },
    async (request, reply) => {
        await NoteControllers_js_1.NoteController.addMarkerToNote(request, reply);
    });
    fastify.put('/note/:noteId/marker/:markerId/remove', 
    // { preHandler: AuthMiddleware.verifyAuth },
    async (request, reply) => {
        await NoteControllers_js_1.NoteController.removeMarkerFromNote(request, reply);
    });
}
