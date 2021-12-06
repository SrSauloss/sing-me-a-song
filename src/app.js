import express from 'express';
import cors from 'cors';
import router from './routers/musicRouter.js';
import errorMiddleware from './middlewares/serverMiddlewareErro.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

export default app;
