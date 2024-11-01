import { fastify } from 'fastify'
import { DB } from './dal/DB.js';
import fastifyCors from "@fastify/cors";
import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import markerRoutes from './routes/markerRoutes.js';
import notesMarkersRoutes from './routes/notesMarkersRoutes.js';
import aiNoteRoute from './routes/aiNoteRoute.js';

const server = fastify();

DB.dbTime();

server.register(userRoutes);
server.register(tokenRoutes);
server.register(authRoutes);
server.register(noteRoutes);
server.register(markerRoutes);
server.register(notesMarkersRoutes);
server.register(aiNoteRoute);

server.register(fastifyCors, {
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
    console.log(`Server running at ${address}`);
});