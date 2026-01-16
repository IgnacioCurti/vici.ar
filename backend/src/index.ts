import express from "express";

const app: express.Application = express();

app.listen(3000, () => {
  console.log(`Listening: http://localhost:3000`);
});
