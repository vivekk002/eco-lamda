import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Chat Schema (Private)
const ChatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  type: { type: String, enum: ['text', 'audio'], default: 'text' }
}, { timestamps: true });

// Source Schema
const SourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['pdf', 'video'], required: true },
  url: { type: String }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
export const Chat = mongoose.model('Chat', ChatSchema);
export const Source = mongoose.model('Source', SourceSchema);
