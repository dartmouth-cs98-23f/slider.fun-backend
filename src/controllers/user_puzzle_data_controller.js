import UserPuzzleData from "../models/user_puzzle_data_model.js";
import { getDailyPuzzleByID } from "./daily_puzzle_controller.js"

// Create User Puzzle Data
export async function createUserPuzzleData(fields) {
  const puzzleData = new UserPuzzleData();
  const dailyPuzzleReturned = await getDailyPuzzleByID(fields.dailyPuzzle);

  if (!dailyPuzzleReturned) {
    throw new Error(`Daily puzzle for ID ${fields.dailyPuzzle} was not found`);
  }

  const userSelectedProperties = fields.userSelectedProperties.map(property => ({
    name: property.name,
    property: property.property,
    value: property.value,
    range: {
      min: property.range.min,
      max: property.range.max
    },
    unit: property.unit,
    status: property.status
  }));

  puzzleData.dailyPuzzle = dailyPuzzleReturned
  puzzleData.score = fields.score;
  puzzleData.userSelectedProperties = userSelectedProperties;

  try {
    const savedPuzzleData = await puzzleData.save();
    return savedPuzzleData;

  } catch (error) {
    throw new Error(`Create Puzzle Data error: ${error}`);
  }
}
  
// Get Puzzle Data with the given ID
export async function getPuzzleData(id) {
  try {
    const returnPuzzleData = await UserPuzzleData.findById(id);
    return returnPuzzleData;
  } catch (error) {
    throw new Error(`Get Puzzle Data error: ${error}`);
  }
}

// Get All Puzzle Data
export async function getAllPuzzleData() {
  try {
    const allPuzzleData = await UserPuzzleData.find({}).sort([['date', -1]]);
    return allPuzzleData;
  } catch (error) {
    throw new Error(`Get All Puzzle Data error: ${error}`);
  }
}

// Updating Puzzle Data
export async function updatePuzzleData(id, fields) {
  try {
    const updatePuzzleData = await UserPuzzleData.findByIdAndUpdate(id, fields);
    return updatePuzzleData;
  } catch (error) {
    throw new Error(`Update Puzzle Data error: ${error}`);
  }
}
  
// Delete Puzzle Data with given ID
export async function deletePuzzleData(id) {
  try {
    const removedPuzzleData = await UserPuzzleData.deleteOne({ _id: id });
    return removedPuzzleData.deletedCount;
  } catch (error) {
    throw new Error(`Remove Puzzle Data error: ${error}`);
  }
}
  