import { fastify, FastifyReply, FastifyRequest } from 'fastify'
import { UserController } from "./controllers/UserController.js";
import fastifyCors from "@fastify/cors";
import { DB } from './dal/DB.js';
import userRoutes from './routes/userRoutes.js';

const server = fastify();

console.log("Hello world");
DB.dbTime();

server.register(userRoutes);

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