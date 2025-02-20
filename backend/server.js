import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import fs from 'fs';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import dailyIntakeRoutes from './routes/dailyIntakeRoutes.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Conectăm baza de date
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', dailyIntakeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import swaggerUi from 'swagger-ui-express';
const swaggerDocument = JSON.parse(
  fs.readFileSync('./docs/swagger.json', 'utf-8')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
