import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
});

const port: any = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
