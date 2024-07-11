import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import './shared/services/translationsYup';
import { router } from './routes';

const server = express();

server.use(cors({
    origin: process.env.ENABLE_CORS?.split(';') || []
}));

console.log(process.env.ENABLE_CORS?.split(';'));


server.use(express.json());

server.use(router);

export { server }