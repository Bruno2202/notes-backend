import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { SharedNotesService } from "../services/SharedNotesService";
import { SharedNotesRequestBody, SharedNotesRequestParams } from "../routes/sharedNotesRoutes";


export class sharedNotesController {
    static async shareNote(request: FastifyRequest<{ Body: SharedNotesRequestBody }>, reply: FastifyReply) {
        const { sharedBy, sharedWith, noteId, sharedAt } = request.body

        try {
            const shared: boolean = await SharedNotesService.shareNote(sharedBy, sharedWith, noteId, sharedAt);

            if (shared) {
                reply.code(200).send({ message: "Nota compartilhada com sucesso!" });
            }
        } catch (error: any) {
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

    static async unshareNote(request: FastifyRequest<{ Params: SharedNotesRequestParams }>, reply: FastifyReply) {
        const { id } = request.params
        
        try {
            const shared: boolean = await SharedNotesService.unshareNote(id);

            if (shared) {
                reply.code(200).send({ message: "Nota descompartilhada com sucesso!" });
            }
        } catch (error: any) {
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