import { PrismaClient } from '@prisma/client'
import { fastify } from 'fastify'
import fastifyCors from "@fastify/cors";

import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import markerRoutes from './routes/markerRoutes.js';
import ApiRoutes from './routes/ApiRoutes.js';
import sharedNotesRoutes from './routes/sharedNotesRoutes.js';

const prisma = new PrismaClient();
const server = fastify();

server.register(userRoutes);
server.register(tokenRoutes);
server.register(authRoutes);
server.register(noteRoutes);
server.register(markerRoutes);
server.register(sharedNotesRoutes)
server.register(ApiRoutes);

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
    console.log(`Server running at ${address} 🚀`);
});

setInterval(async () => {
    await fetch(`${process.env.APIHOST}/status`, {
        method: 'GET',
    });
}, 10000);