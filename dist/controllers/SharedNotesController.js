"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedNotesController = void 0;
const SharedNotesService_1 = require("../services/SharedNotesService");
class sharedNotesController {
    static async shareNote(request, reply) {
        const { sharedBy, sharedWith, noteId, sharedAt } = request.body;
        try {
            const shared = await SharedNotesService_1.SharedNotesService.shareNote(sharedBy, sharedWith, noteId, sharedAt);
            if (shared) {
                reply.code(200).send({ message: "Nota compartilhada com sucesso!" });
            }
        }
        catch (error) {
            switch (error.message) {
                case "ID inválido para busca":
                case "O usuário remetente não existe":
                case "O usuário destinatário não existe":
                case "A nota a ser compartilhada não existe":
                    reply.code(400).send({ error: error.message });
                    break;
                default:
                    console.log(`Erro ao compartilhar nota: ${error.message}`);
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }
    static async unshareNote(request, reply) {
        const { id } = request.params;
        try {
            const shared = await SharedNotesService_1.SharedNotesService.unshareNote(id);
            if (shared) {
                reply.code(200).send({ message: "Nota descompartilhada com sucesso!" });
            }
        }
        catch (error) {
            switch (error.message) {
                case "ID inválido para busca":
                case "Esse compartilhamento não existe":
                    reply.code(400).send({ error: error.message });
                    break;
                default:
                    console.log(`Erro ao descompartilhar nota: ${error.message}`);
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }
}
exports.sharedNotesController = sharedNotesController;
