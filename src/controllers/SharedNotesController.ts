import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { SharedNotesService } from "../services/SharedNotesService";
import { SharedNotesRequestBody } from "../routes/sharedNotesRoutes";

export interface ShareNoteReply {
    success: boolean;
    message?: string;
    error?: string;
}

export class sharedNotesController {
    static async shareNote(request: FastifyRequest<{ Body: SharedNotesRequestBody }>, reply: FastifyReply<{ Reply: ShareNoteReply }>) {
        const { sharedBy, sharedWith, noteId, sharedAt } = request.body

        try {
            const shared: boolean = await SharedNotesService.shareNote(sharedBy, sharedWith, noteId, sharedAt);

            if (shared) {
                reply.code(200).send({
                    success: shared,
                    message: "Nota compartilhada com sucesso!"
                });
            } else {
                reply.code(400).send({
                    success: shared,
                    message: "Não foi possível compartilhar a nota",
                });
            }
        } catch (error: any) {
            switch (error.message) {
                case "ID inválido para busca":
                case "O usuário remetente não existe":
                case "O usuário destinatário não existe":
                case "A nota a ser compartilhada não existe":
                    reply.code(400).send({
                        success: false,
                        error: error.message
                    });
                    break;

                default:
                    console.log(`Erro ao compartilhar nota: ${error.message}`);
                    reply.code(500).send({
                        success: false,
                        error: "Erro interno do servidor"
                    });
                    break;
            }
        }
    }

    static async unshareNote(request: FastifyRequest<{ Body: SharedNotesRequestBody }>, reply: FastifyReply<{ Reply: ShareNoteReply }>) {
        const { noteId, sharedWith } = request.body

        try {
            const shared: boolean = await SharedNotesService.unshareNote(noteId, sharedWith);

            if (shared) {
                reply.code(200).send({
                    success: true,
                    message: "Nota descompartilhada com sucesso!"
                });
            }
        } catch (error: any) {
            switch (error.message) {
                case "ID inválido para busca":
                case "Esse compartilhamento não existe":
                    reply.code(400).send({
                        success: false,
                        error: error.message
                    });
                    break;

                default:
                    console.log(`Erro ao descompartilhar nota: ${error.message}`);
                    reply.code(500).send({
                        success: false,
                        error: "Erro interno do servidor"
                    });
                    break;
            }
        }
    }
}