import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
  id: Number,
  homeTeam: String,
  awayTeam: String,
  pageUrl: String,
  date: Date,
  league: { type: mongoose.Schema.Types.ObjectId, ref: 'League' },
});

const Match = mongoose.model('Match', MatchSchema);

export default Match;
