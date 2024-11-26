"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sharedNotesRoutes;
const SharedNotesController_1 = require("../controllers/SharedNotesController");
const AuthMiddleware_1 = __importDefault(require("../middleswares/AuthMiddleware"));
async function sharedNotesRoutes(fastify) {
    fastify.post('/share-note', { preHandler: AuthMiddleware_1.default.verifyAuth }, async (request, reply) => {
        await SharedNotesController_1.sharedNotesController.shareNote(request, reply);
    });
    fastify.delete('/unshare-note', { preHandler: AuthMiddleware_1.default.verifyAuth }, async (request, reply) => {
        await SharedNotesController_1.sharedNotesController.unshareNote(request, reply);
    });
}
