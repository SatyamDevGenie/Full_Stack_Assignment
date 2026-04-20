import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';
import User from './models/User.js';
import Task from './models/Task.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const users = [
  {
    name: 'Satyam Sawant',
    email: 'satyam@gmail.com',
    password: '123456',
  },
  {
    name: 'Vedang Kanade',
    email: 'vedang@gmail.com',
    password: '123456',
  }
];

const importData = async () => {
  try {
    await Task.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    console.log(chalk.greenBright('✅ Data Imported!'));
    console.log(chalk.cyanBright('\nTest Users:'));
    createdUsers.forEach((user) => {
      console.log(chalk.yellowBright(`Email: ${user.email} | Password: 123456`));
    });
    process.exit();
  } catch (error) {
    console.error(chalk.redBright(`❌ Error: ${error.message}`));
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Task.deleteMany();
    await User.deleteMany();

    console.log(chalk.redBright('🗑️  Data Destroyed!'));
    process.exit();
  } catch (error) {
    console.error(chalk.redBright(`❌ Error: ${error.message}`));
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
