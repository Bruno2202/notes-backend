import { MarkerService } from "../services/MarkerService.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { MarkerRequestBody, MarkerRequestParams } from "../routes/markerRoutes.js";
import { MarkerModel } from "../models/MarkerModel.js";

export class MarkerController {
    static async selectById(request: FastifyRequest<{ Params: MarkerRequestParams }>, reply: FastifyReply) {
        try {
            const marker: MarkerModel | null = await MarkerService.selectById(request.params.id);

            if (marker) {
                reply.code(200).send(marker);
            } else {
                reply.code(404).send({ error: "Marcador não encontrado" });
            }
        } catch (error: any) {
            switch (error.message) {
                case 'ID inválido para busca':
                    reply.code(400).send({ error: error.message });
                    break;

                default:
                    console.log("Erro ao buscar marcador pelo id:", error.message);
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }

    static async selectByUserId(request: FastifyRequest<{ Params: MarkerRequestParams }>, reply: FastifyReply) {
        try {
            const markers: MarkerModel[] = await MarkerService.selectByUserId(request.params.userId);

            if (markers.length > 0) {
                reply.code(200).send(markers);
            } else if (markers.length == 0) {
                reply.code(200).send({ markers: markers });
            }
        } catch (error: any) {
            switch (error.message) {
                case 'ID inválido para busca':
                    reply.code(400).send({ error: error.message });
                    break;

                default:
                    console.log("Erro ao buscar marcadores pelo id do usuário:", error);
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }

    static async selectByNoteId(request: FastifyRequest<{ Params: MarkerRequestParams }>, reply: FastifyReply) {
        try {
            const noteMarkers: MarkerModel[] = await MarkerService.selectByNoteId(request.params.noteId);

            if (noteMarkers.length > 0) {
                reply.code(200).send(noteMarkers);
            } else if (noteMarkers.length == 0) {
                reply.code(200).send(noteMarkers);
            }
        } catch (error: any) {
            console.log("Erro ao buscar marcadores da nota pelo id da nota:", error.message);
            reply.code(500).send({ error: error.message });
        }
    }

    static async create(request: FastifyRequest<{ Body: MarkerRequestBody }>, reply: FastifyReply) {
        const requestMarker = new MarkerModel(
            request.body.marker.userId,
            request.body.marker.description
        );

        try {
            const marker = await MarkerService.create(requestMarker);

            if (marker) {
                reply.code(201).send({
                    message: "Marcador criado com sucesso",
                    marker: marker
                });
            } else {
                reply.code(400).send({ error: "Não foi possível criar marcador" });
            }
        } catch (error: any) {
            console.log(`Erro ao criar marcador: ${error.message}`);
            reply.code(500).send({ error: "Erro interno do servidor." });
        }
    }

    static async update(request: FastifyRequest<{ Body: MarkerRequestBody }>, reply: FastifyReply) {
        const requestMarker = new MarkerModel(
            request.body.marker.userId,
            request.body.marker.description,
            request.body.marker.id,
        );

        try {
            const marker = await MarkerService.update(requestMarker);

            if (marker) {
                reply.code(200).send(requestMarker);
            }
        } catch (error: any) {
            switch (error.message) {
                case "ID inválido para busca":
                case "O marcador com o ID informado não existe":
                    reply.code(400).send({
                        error: error.message,
                        marker: null
                    });
                    break;

                default:
                    console.log(`Erro ao atualizar marcador: ${error.message}`);
                    reply.code(500).send({ error: "Erro interno do servidor." });
                    break;
            }
        }
    }

    static async delete(request: FastifyRequest<{ Params: MarkerRequestParams }>, reply: FastifyReply) {
        try {
            
            const deleted = await MarkerService.delete(request.params.id);
            
            if (deleted) {
                reply.code(204);
            }
        } catch (error: any) {
            switch (error.message) {
                case "ID inválido para solicitação":
                    reply.code(400).send({
                        error: error.message,
                        deleted: false
                    });
                    break;

                default:
                    console.log(`Erro ao deletar marcador: ${error.message}`);
                    reply.code(500).send({ error: "Erro interno do servidor. Tente novamente mais tarde" });
                    break;
            }
        }
    }
}