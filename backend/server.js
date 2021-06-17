import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import productsRouter from './routers/productsRouter.js';

dotenv.config();

const app = express();

const __dirname = path.resolve();

const publicPath = path.join(__dirname, '..', 'public');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('build'));


app.use('/api/products', productsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/', (req, res) => {
  res.send('Server is ready!');
});

app.use((error, req, res, next) => {
  if (error.message.includes('duplicate')) {
    error.message = 'Oh oh, there\'s an account with that email already!';
  }
  res.status(500).send({ message: error.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at ${port}`);
});
