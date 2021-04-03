import express from 'express';
import { usersRoutes } from './routes/users';

const app = express();

app.use(`/users`, usersRoutes);
app.listen(3000, () => console.log('Server is listening on port 3000'));
