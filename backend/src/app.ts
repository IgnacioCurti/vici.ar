import express from 'express';
import router from './router.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-type', 'Authorization']
}));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ok: true});
});

app.use('/api', router);


export default app
