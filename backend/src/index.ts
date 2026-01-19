import express from 'express';
import authRoutes from './routes/auth.routes';

const router = express.Router();

router.use('./auth', authRoutes); // no se si esto va aca o en un intex.ts en src/routes/index.ts

const app: express.Application = express();

app.listen(3000, () => {
  console.log(`Listening: http://localhost:3000`);
});
