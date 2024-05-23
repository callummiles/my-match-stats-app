import express from 'express';
import ViteExpress from 'vite-express';

import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import leagueRoutes from './routes/leagueRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import shotRoutes from './routes/shotRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const uri =
  // eslint-disable-next-line no-undef
  process.env.MONGODB_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected successfully to MongoDB.'))
  .catch((err) => console.error('Failed to connect to MongoDB: ', err));

app.use('/leagues', leagueRoutes);
app.use('/matches', matchRoutes);
app.use('/shots', shotRoutes);

ViteExpress.listen(app, 3000, () => console.log('Server is listening...'));
