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

/// HOW TO UPDATE MORE THEAN ONE FIELDDDD BRUHHHH
// ^LIKE WHAT WILL updateFields LOOK LIKE. NEED TO KNOW BEFORE I DO THIS
export async function updateUser(id, updateFields) {
  try {
    const user = await User.findByIdAndUpdate(id, updateFields);

    return user;
  } catch (error) {
    throw new Error(`Update user error: ${error}`);
  }
}

export const signin = (user) => {
  // WHAT DO WE DO HERERERERERERERERERERE ************************
  // FOR TERM 2 (maybe?)
};

export const signup = async ({
  email, password, name, userName, level
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

  await user.save();
  return tokenForUser(user);
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
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
