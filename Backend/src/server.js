import express from 'express';
import { startServer } from './utils/logger.js';

const app = express();
const PORT = 3333;

startServer(app, PORT);
