"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fastify_1 = require("fastify");
const cors_1 = __importDefault(require("@fastify/cors"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const tokenRoutes_js_1 = __importDefault(require("./routes/tokenRoutes.js"));
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const noteRoutes_js_1 = __importDefault(require("./routes/noteRoutes.js"));
const markerRoutes_js_1 = __importDefault(require("./routes/markerRoutes.js"));
const ApiRoutes_js_1 = __importDefault(require("./routes/ApiRoutes.js"));
const prisma = new client_1.PrismaClient();
const server = (0, fastify_1.fastify)();
server.register(userRoutes_js_1.default);
server.register(tokenRoutes_js_1.default);
server.register(authRoutes_js_1.default);
server.register(noteRoutes_js_1.default);
server.register(markerRoutes_js_1.default);
server.register(ApiRoutes_js_1.default);
server.register(cors_1.default, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});
server.listen({
    port: 3333,
    host: '0.0.0.0'
}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Server running at ${address} 🚀`);
});
