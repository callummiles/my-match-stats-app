import mongoose from 'mongoose';

const LeagueSchema = new mongoose.Schema({
  id: Number,
  name: String,
  selectedSeason: String,
  country: String,
  //code: { type: String, required: true },
});

export default LeagueSchema;
