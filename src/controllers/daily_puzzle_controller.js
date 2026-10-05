import DailyPuzzle from "../models/daily_puzzle_model.js";
import Photo from '../models/photo_model.js';
import { getPhotoById } from './photo_controller.js';

// Create  Daily Puzzle
export async function createDailyPuzzle(puzzleFields) {

  const existingPuzzle = await DailyPuzzle.findOne({ date: puzzleFields.date });
  if (existingPuzzle) {
    throw new Error(`A puzzle for ${puzzleFields.date} already exists.`);
  }

  const photoReturned = await getPhotoById(puzzleFields.photo);
  if (!photoReturned) {
    throw new Error(`A Photo for ID ${puzzleFields.photo} was not found.`);
  }

  const dailyPuzzle = new DailyPuzzle();
  dailyPuzzle.photo = photoReturned
  dailyPuzzle.date = puzzleFields.date

  try {
    const savedDailyPuzzle = await dailyPuzzle.save();
    return savedDailyPuzzle;
  } catch (error) {
    throw new Error(`Create Daily Puzzle error: ${error}`);
  }
}

// Get Daily Puzzle with the given id
export async function getDailyPuzzleByID(id) {
  try {
    const returnDailyPuzzle = await DailyPuzzle.findById(id);
    return returnDailyPuzzle;
  } catch (error) {
    throw new Error(`Get Daily Puzzle error: ${error}`);
  }
}

// A photo can't be the daily puzzle again within this many days
const NO_REPEAT_DAYS = 7;

// YYYY-MM-DD in New York time, which is the date the frontend asks for
function newYorkDate(ms) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date(ms));
}

function shiftDate(date, days) {
  const shifted = new Date(`${date}T00:00:00Z`);
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted.toISOString().slice(0, 10);
}

// Pick a random photo that wasn't a daily puzzle in the week around this date, and save it
async function createRandomDailyPuzzle(date) {
  const nearby = [];
  for (let i = 1; i < NO_REPEAT_DAYS; i += 1) {
    nearby.push(shiftDate(date, -i), shiftDate(date, i));
  }
  const recent = await DailyPuzzle.find({ date: { $in: nearby } }, 'photo');
  const recentPhotos = recent.map((puzzle) => puzzle.photo);

  let [photo] = await Photo.aggregate([{ $match: { _id: { $nin: recentPhotos } } }, { $sample: { size: 1 } }]);
  if (!photo) {
    // fewer photos than days in a week: repeating beats having no puzzle
    [photo] = await Photo.aggregate([{ $sample: { size: 1 } }]);
  }
  if (!photo) return null;

  // upsert, so two people opening the page at once still get the same puzzle
  return DailyPuzzle.findOneAndUpdate(
    { date },
    { $setOnInsert: { date, photo: photo._id } },
    { upsert: true, new: true },
  );
}

// Get Daily Puzzle by the date
export async function getDailyPuzzleByDate(date) {
  try {

    let returnDailyPuzzle = await DailyPuzzle.findOne({ date });

    // Nothing scheduled: pick one, but only for dates around today so requests can't fill the calendar
    const now = Date.now();
    const aroundToday = [-1, 0, 1].some((offset) => newYorkDate(now + offset * 86400000) === date);
    if (!returnDailyPuzzle && aroundToday) {
      returnDailyPuzzle = await createRandomDailyPuzzle(date);
    }

    if (!returnDailyPuzzle) {
      throw new Error(`A daily puzzle for date ${date} doesn't exists.`);
    }
    return returnDailyPuzzle;

  } catch (error) {
    throw new Error(`Get Daily Puzzle error: ${error}`);
  }
}

// Get All Daily Puzzles
export async function getAllDailyPuzzles() {
  try {
    const allDailyPuzzles = await DailyPuzzle.find({}).sort([['date', -1]]);
    return allDailyPuzzles;
  } catch (error) {
    throw new Error(`Get All Daily Puzzles error: ${error}`);
  }
}

// Delete a Daily Puzzle
export async function deleteDailyPuzzle(id) {
  try {
    const removedDailyPuzzle = await DailyPuzzle.deleteOne({ _id: id });
    return removedDailyPuzzle.deletedCount;
  } catch (error) {
    throw new Error(`Remove Daily Puzzle error: ${error}`);
  }
}

// Updating a Daily Puzzle
export async function updateDailyPuzzle(id, fields) {
  try {
    const updateDailyPuzzle = await DailyPuzzle.findByIdAndUpdate(id, fields);
    return updateDailyPuzzle;
  } catch (error) {
    throw new Error(`Update Daily Puzzle error: ${error}`);
  }
}
