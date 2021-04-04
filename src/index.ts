import express from 'express';
import { usersRoutes } from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.json());
app.use(`/users`, usersRoutes);

app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));
