import mongoose from 'mongoose';

const ShotSchema = new mongoose.Schema({
  id: Number,
  eventType: String,
  teamId: Number,
  playerName: String,
  x: Number,
  y: Number,
  min: Number,
  minAdded: Number,
  isBlocked: Boolean,
  isOnTarget: Boolean,
  expectedGoals: Number,
  expectedGoalsOnTarget: Number,
  shotType: String,
  situation: String,
  period: String,
  isOwnGoal: Boolean,
});

export default ShotSchema;
