import DailyPuzzle from "../models/daily_puzzle_model.js";
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

// Get Daily Puzzle by the date
export async function getDailyPuzzleByDate(date) {
  try {

    const returnDailyPuzzle = await DailyPuzzle.findOne({ date });

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
