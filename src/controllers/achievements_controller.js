import Achievement from '../models/achievement_model.js';

// Returns all users
export async function getAchievements() {
  try {
    const allAchievements = await Achievement.find({}).sort([['date', -1]]);
    return allAchievements;
  } catch (error) {
    throw new Error(`Get users error: ${error}`);
  }
}

// Create a new achievement object
export async function newAchievement(achievementFields) {
  try {
    const newAchievement = new Achievement();
    newAchievement.name = achievementFields.name;
    newAchievement.points = achievementFields.points;
    newAchievement.about = achievementFields.about;
    newAchievement.numUsers = 0;

    const achievement = await newAchievement.save();
    return achievement;
  } catch (error) {
    throw new Error(`Create Achievement error: ${error}`);
  }
}

// Delete achievement with given id
export async function deleteAchievement(id) {
  try {
    const achievement = await Achievement.findByIdAndDelete(id);
    return achievement;
  } catch (error) {
    throw new Error(`Delete achievement error: ${error}`);
  }
}

// Return the achievement given their id
export async function getAchievement(id) {
  try {
    const achievement = await Achievement.findById(id);
    return achievement;
  } catch (error) {
    throw new Error(`Get achievement error: ${error}`);
  }
}

// Return an achievement by its name
export async function getAchievementByName(name) {
  try {
    const achievement = await Achievement.findOne({ name: name });
    if (!achievement) {
      throw new Error('Achievement not found');
    }
    return achievement;
  } catch (error) {
    throw new Error(`Get achievement by name error: ${error}`);
  }
}

// Updating an Achievement
export async function updateAchievement(id, fields) {
  try {
    const updateAchievement = await Achievement.findByIdAndUpdate(id, fields);
    return updateAchievement;
  } catch (error) {
    throw new Error(`Update Achievement error: ${error}`);
  }
}

// Increment Number of users with this achievement
export async function incrementUserCount(name) {
  try {
    const achievement = await getAchievementByName(name);
    if (!achievement){
      throw new Error(`Achievement with name ${name} does not exist`)
    }
    
    achievement.numUsers += 1;

    const updateAchievement = await achievement.save();
    return updateAchievement;
  } catch (error) {
    throw new Error(`Increment Achievement user count: ${error}`);
  }
}

// get number of user with this achievement
export async function getUserCount(name) {
  try {
    const achievement = await getAchievementByName(name);
    if (!achievement){
      throw new Error(`Achievement with name ${name} does not exist`)
    }

    return achievement.numUsers;
  } catch (error) {
    throw new Error(`Get Achievementser count error: ${error}`);
  }
}
