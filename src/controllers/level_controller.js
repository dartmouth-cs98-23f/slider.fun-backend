import Level from "../models/level_model.js";

// Create Level
export async function createLevel(levelFields) {
  const level = new Level();
  level.exposure = levelFields.exposure;
  level.contrast = levelFields.contrast;
  level.highlights = levelFields.highlights;
  level.shadows = levelFields.shadows;
  level.whites = levelFields.whites;
  level.blacks = levelFields.blacks;
  level.tint = levelFields.tint;
  level.temperature = levelFields.temperature;
  level.saturation = levelFields.saturation;
  level.vibrance = levelFields.vibrance;
  level.brightness = levelFields.brightness;
  level.levelNumber = levelFields.levelNumber;
  level.nextLevel = await getLevel(levelFields.nextLevel);
  
  try {
    const savedLevel = await level.save();
    return savedLevel;
  } catch (error) {
    throw new Error(`Create level error: ${error}`);
  }
}
  
// Get level with the given id
export async function getLevel(id) {
  try {
    const returnLevel = await Level.findById(id);
    return returnLevel;
  } catch (error) {
    throw new Error(`Get level error: ${error}`);
  }
}

// Get level for the given level number
export async function getLevelByNumber(levelNum) {
  try {
    const returnLevel = await Level.findOne({ levelNumber: levelNum });
    return returnLevel;
  } catch (error) {
    throw new Error(`Get level for the given level number error: ${error}`);
  }
}


// Get All levels
export async function getAllLevels() {
  try {
    const allPosts = await Level.find({}).sort([['date', -1]]);
    return allPosts;
  } catch (error) {
    throw new Error(`Get levels error: ${error}`);
  }
}
  
  
// Delete a level
export async function deleteLevel(id) {
  try {
    const removeLevel = await Level.deleteOne({ _id: id });
    return removeLevel.deletedCount;
  } catch (error) {
    throw new Error(`Remove level error: ${error}`);
  }
}
  
// Updating a level
export async function updateLevel(id, postFields) {
  try {
    const updateLevel = await Level.findByIdAndUpdate(id, postFields);
    return updateLevel;
  } catch (error) {
    throw new Error(`Update level error: ${error}`);
  }
}
  