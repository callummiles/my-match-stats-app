import mongoose from 'mongoose';
import LeagueSchema from './leagueModel.js';
import ShotSchema from './shotModel.js';
import HalfsSchema from './halfsModel.js';
import EventSchema from './eventSchema.js';

const MatchSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  date: Date,
  roundName: Number,
  homeTeam: String,
  homeId: Number,
  awayTeam: String,
  awayId: Number,
  score: String,
  league: LeagueSchema,
  shots: [ShotSchema],
  halfs: HalfsSchema,
  events: [EventSchema],
  url: String,
});

const Match = mongoose.model('Match', MatchSchema);

export default Match;
