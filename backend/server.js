import express from 'express';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import dotenv from 'dotenv';


dotenv.config();
connectDB();

const app = express();

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Body parsing middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());


// API Check
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.yellowBright(`📡 Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));
});






