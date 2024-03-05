import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model.js';
import { deletePhoto, getPhotoById } from './photo_controller.js'
import { getAchievementByName, incrementUserCount } from './achievements_controller.js'

dotenv.config({ silent: true });

// Returns all users
export async function getUsers() {
  try {
    const allUsers = await User.find({}).sort([['date', -1]]);
    return allUsers;
  } catch (error) {
    throw new Error(`Get users error: ${error}`);
  }
}

// Returns top 25 users based off sliderScore
export async function getTop25() {
  try {
    const topUsers = await User.find({}).sort({ sliderScore: -1 }).limit(25);
    return topUsers;
  } catch (error) {
    throw new Error(`Get top users error: ${error}`);
  }
}

// Delete user with given id
export async function deleteUser(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw new Error(`Delete user error: ${error}`);
  }
}

// Return the user given their id
export async function getUser(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(`Get user error: ${error}`);
  }
}

// Return the username for the user with given id
export async function getUserName(id) {
  try {
    const user = await getUser(id);
    if(!user){
      throw new Error(`User for ID: ${id} does not exist`);
    }

    return user.userName;
  } catch (error) {
    throw new Error(`Get user error: ${error}`);
  }
}

// Update user fields
export async function updateUser(id, updateFields) {
  try {
    const user = await User.findByIdAndUpdate(id, updateFields);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Update user error: ${error}`);
  }
}

// add a photo object to user
export async function addPhoto(id, photoId) {
  try {
    const user = await getUser(id);
    
    if (!user.photos){
      user.photos = [];
    }

    try {
      await getPhotoById(photoId);
    } catch (error) {
      throw new Error(`Error retrieving photo for the given photoID: ${error}`);
    }

    user.photos.push(photoId);
    await user.save();
    return user;

  } catch (error) {
    throw new Error(`Update user error: ${error}`);
  }
}

// Remove a photo object from user
export async function removePhoto(id, photoId) {
  try {

    // delete photo object from user
    const user = await getUser(id);
    user.photos = user.photos.filter(photo_id => photo_id.toString() !== photoId);
    await user.save();

    // delete photo object from database
    await deletePhoto(photoId);
    return user;

  } catch (error) {
    throw new Error(`Update user error: ${error}`);
  }
}

// Add a puzzle data object to user
export async function addPuzzleData(id, puzzleDataId) {
  try {
    const user = await getUser(id);
    user.dailyPuzzles.push(puzzleDataId)
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Update user error: ${error}`);
  }
}

// Remove a puzzle data object from user
export async function removePuzzleData(id, puzzleDataId) {
  try {
    const user = await getUser(id);
    user.dailyPuzzles = user.dailyPuzzles.filter(puzzleId => puzzleId.toString() !== puzzleDataId);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Update user error: ${error}`);
  }
}

// Remove a puzzle data object from user
export async function addAchievement(id, achievementName) {
  try {

    const achievement = await getAchievementByName(achievementName);
    if (!achievement){
      throw new Error(`Achievement with name ${achievementName} does not exist`);
    }

    const user = await getUser(id);
    if(!user){
      throw new Error(`User for ID: ${id} does not exist`);
    }

    if (!user.achievements){
      user.achievements = []
    }

    const userAlreadyHasAchievement = user.achievements.some(u => u.toString() === achievement.id);
    if (!userAlreadyHasAchievement) {
      user.achievements.push(achievement);
      await incrementUserCount(achievementName);

    } else {
      throw new Error(`User with ID: ${id} has already has achievement ${achievementName}`);
    }

    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Update user error: ${error}`);
  }
}

// Update slider score by count
export async function addSliderScore(id, count) {
  try {
    
    const user = await getUser(id);
    if (!user){
      throw new Error(`Found no user with ID: ${id}`);
    }

    user.sliderScore += count;

    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Update slider score error: ${error}`);
  }
}

// check if the user has done today's puzzle
export async function updateDailyPuzzleStatus(id) {
  try {
    
    const user = await getUser(id);
    if (!user){
      throw new Error(`Found no user with ID: ${id}`);
    }

    user.dailyTaskStatus = true;
    await user.save();
    return user;

  } catch (error) {
    throw new Error(`Update slider score error: ${error}`);
  }
}

// Sign the user in - validate they exist and have provided the right credentials
export const signin = async ({
  email, password, userName
}) => {
  if (!email || !password) {
    throw new Error('You must provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return tokenForUser(user);
}



// Create new user
export const signup = async ({
  email, password, name, userName, about, sliderScore
}) => {
  if (!email || !password) {
    throw new Error('You must provide email and password');
  }

  const existingUserEmail = await User.findOne({ email });
  if (existingUserEmail) {
    throw new Error('Email is in use');
  }

  const existingUserName = await User.findOne({ userName });
  if (existingUserName) {
    throw new Error('Username is not available');
  }

  const user = new User();

  user.email = email;
  user.name = name;
  user.password = password;
  user.userName = userName;
  user.dailyPuzzles = [];
  user.photos = [];
  user.about = about;
  user.clout = 1;
  user.achievements = [];

  if(!sliderScore){
    user.sliderScore = 0
    user.dailyTaskStatus = false;
  } else {
    user.sliderScore = sliderScore;
    user.dailyTaskStatus = true;
  }

  await user.save();
  return tokenForUser(user);
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  const token = jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
  return token
}

// Decodes the token and gets the userID from it and returns the user
export async function getUserFromToken(token) {
  try {
    const decoded = jwt.decode(token, process.env.AUTH_SECRET);
    const userId = decoded.sub;
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error(`Error getting user from token: ${error}`);
  }
}


