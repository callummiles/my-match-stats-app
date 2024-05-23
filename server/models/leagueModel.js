import mongoose from 'mongoose';
import MatchSchema from './matchModel.js';

const LeagueSchema = new mongoose.Schema({
  id: Number,
  name: String,
  localizedName: String,
  country: String,
  code: String,
  matches: [MatchSchema],
});

const League = mongoose.model('League', LeagueSchema);

export default League;
