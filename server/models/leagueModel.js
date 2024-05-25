import mongoose from 'mongoose';

const LeagueSchema = new mongoose.Schema({
  id: Number,
  name: String,
  localizedName: String,
  country: { type: String, required: true },
  code: { type: String, required: true },
});

const League = mongoose.model('League', LeagueSchema);

export default League;
