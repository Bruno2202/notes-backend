import { fastify } from 'fastify'
import { DB } from './dal/DB.js';
import fastifyCors from "@fastify/cors";
import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import authRoutes from './routes/authRoutes.js';

const server = fastify();

DB.dbTime();

server.register(userRoutes);
server.register(tokenRoutes);
server.register(authRoutes);

server.register(fastifyCors, {
    origin: true,
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