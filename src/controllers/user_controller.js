import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model.js';
import { getLevel } from './level_controller.js';

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

// delete user by id
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

// update user fields
export async function updateUser(id, updateFields) {
  try {
    const user = await User.findByIdAndUpdate(id, updateFields);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Update user error: ${error}`);
  }
}

// add a puzzle data object to user
export async function addPuzzleData(id, puzzleDataId) {
  try {
    const user = await User.findById(id);
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
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    user.dailyPuzzles = user.dailyPuzzles.filter(puzzleId => puzzleId.toString() !== puzzleDataId);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Update user error: ${error}`);
  }
}

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

export const signup = async ({
  email, password, name, userName, level, about
}) => {
  if (!email || !password) {
    throw new Error('You must provide email and password');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is in use');
  }

  const user = new User();

  user.email = email;
  user.name = name;
  user.password = password;
  user.userName = userName;
  user.level = await getLevel(level);
  user.dailyPuzzles = [];
  user.sliderScore = 0;
  user.about = about;

  await user.save();

  return tokenForUser(user);
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  const token = jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
  return token
}

// decodes the token and gets the userID from it and returns the user
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
