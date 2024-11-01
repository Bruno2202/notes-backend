import { MarkerService } from "../services/MarkerService.js";
import { MarkerModel } from "../models/MarkerModel.js";
export class MarkerController {
    static async selectById(request, reply) {
        try {
            const marker = await MarkerService.selectById(request.params.id);
            if (marker) {
                reply.code(200).send(marker);
            }
            else {
                reply.code(404).send({ error: "Marcador não encontrado" });
            }
        }
        catch (error) {
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
    static async selectByUserId(request, reply) {
        try {
            const markers = await MarkerService.selectByUserId(request.params.userId);
            if (markers.length > 0) {
                reply.code(200).send(markers);
            }
            else if (markers.length == 0) {
                reply.code(200).send({ markers: markers });
            }
        }
        catch (error) {
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
    static async selectByNoteId(request, reply) {
        try {
            const noteMarkers = await MarkerService.selectByNoteId(request.params.noteId);
            if (noteMarkers.length > 0) {
                reply.code(200).send(noteMarkers);
            }
            else if (noteMarkers.length == 0) {
                reply.code(200).send(noteMarkers);
            }
        }
        catch (error) {
            console.log("Erro ao buscar marcadores da nota pelo id da nota:", error.message);
            reply.code(500).send({ error: error.message });
        }
    }
    static async create(request, reply) {
        const requestMarker = new MarkerModel(request.body.marker.userId, request.body.marker.description, request.body.marker.id);
        try {
            const marker = await MarkerService.create(requestMarker);
            if (marker) {
                reply.code(201).send({
                    message: "Marcadore criado com sucesso",
                    marker: marker
                });
            }
            else {
                reply.code(400).send({ error: "Não foi possível criar marcador" });
            }
        }
        catch (error) {
            console.log(`Erro ao criar marcador: ${error.message}`);
            reply.code(500).send({ error: "Erro interno do servidor. Tente novamente mais tarde" });
        }
    }
    static async update(request, reply) {
        const requestMarker = new MarkerModel(request.body.marker.userId, request.body.marker.description, request.body.marker.id);
        try {
            const marker = await MarkerService.update(requestMarker);
            if (marker) {
                reply.code(200).send(requestMarker);
            }
            else {
                reply.code(404).send({ error: "Não foi possível atualizar marcador" });
            }
        }
        catch (error) {
            console.log(`Erro ao atualizar marcador: ${error.message}`);
            reply.code(500).send({ error: "Erro interno do servidor. Tente novamente mais tarde" });
        }
    }
    static async delete(request, reply) {
        try {
            const deleted = await MarkerService.delete(request.params.id);
            if (deleted) {
                reply.code(204);
            }
        }
        catch (error) {
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
