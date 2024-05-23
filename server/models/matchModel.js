import mongoose from 'mongoose';
import ShotSchema from './shotModel.js';

const MatchSchema = new mongoose.Schema({
  id: Number,
  homeTeam: String,
  awayTeam: String,
  pageUrl: String,
  date: Date,
  shots: [ShotSchema],
});

export default MatchSchema;
