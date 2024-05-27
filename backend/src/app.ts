import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();

const port: number = 8080;

app.use(cors());

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
