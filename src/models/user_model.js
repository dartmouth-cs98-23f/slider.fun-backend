import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    userName: String,
    about: String,
    sliderScore: Number,
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
    dailyPuzzles: [{ type: Schema.Types.ObjectId, ref: 'UserPuzzleData' }]
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  },
);

userSchema.pre('save', async function beforeyYourModelSave(next) {

  const user = this;
  if (!user.isModified('password')) return next();

  try {
    // salt, hash, then set password to hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

// use of named function rather than arrow notation, required here
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const comparison = await bcrypt.compare(candidatePassword, this.password);
  return comparison;
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
