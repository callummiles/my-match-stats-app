import mongoose from 'mongoose';
import LeagueSchema from './leagueModel.js';
import ShotSchema from './shotModel.js';

const MatchSchema = new mongoose.Schema({
  id: Number,
  date: Date,
  homeTeam: String,
  awayTeam: String,
  score: String,
  league: LeagueSchema,
  shots: [ShotSchema],
  url: String,
});

const Match = mongoose.model('Match', MatchSchema);

export default Match;
