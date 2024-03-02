import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cron from 'node-cron';

import userRoutes from './routes/userRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import dailyPuzzleRoutes from './routes/dailyPuzzleRoutes.js';
import userPuzzleDataRoutes from './routes/userPuzzleDataRoutes.js';
import UserModel from './models/user_model.js';

// initialize
const app = express();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.use('/api/users', userRoutes);
app.use('/api/photo', photoRoutes);
app.use('/api/dailyPuzzle', dailyPuzzleRoutes);
app.use('/api/userPuzzleData', userPuzzleDataRoutes);

// default index route
app.get('/', (req, res) => {
  res.send('hi');
});

// START THE SERVER
// =============================================================================
async function startServer() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/sliderfun';
    
    await mongoose.connect(mongoURI);
    console.log(`Mongoose connected to: ${mongoURI}`);
    
    const port = process.env.PORT || 9090;
    app.listen(port);
    console.log(`Listening on port ${port}`);

  } catch (error) {
    console.error(error);
  }
}

// Schedule the task to run at the start of evey day
cron.schedule('0 0 * * *', async () => {
  console.log('Resetting dailyTaskStatus for all users');
  try {
    await UserModel.updateMany({}, { $set: { dailyTaskStatus: false } });
    console.log('Successfully reset dailyTaskStatus for all users');
  } catch (error) {
    console.error('Failed to reset dailyTaskStatus', error);
  }
});
startServer();
