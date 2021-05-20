import express, { NextFunction, Request, Response } from 'express';
import usersRouter from './routers/users';
import { sequelize } from './data-access/sequelize';
import { Error } from 'sequelize/types';

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.json());
app.use(usersRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);
  console.error(err.stack);
  res.status(500).json({
    status: 'failed',
    error: 'Internal Server Error',
  });
});

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
