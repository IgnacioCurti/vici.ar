import express from 'express';
import router from './router';

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ok: true});
});

app.use('/api', router);

export default app
