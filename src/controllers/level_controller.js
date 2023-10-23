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
  