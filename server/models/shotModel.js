import mongoose from 'mongoose';

const ShotSchema = new mongoose.Schema({
  id: Number,
  minute: Number,
  player: String,
  type: String,
  situation: String,
  xG: Number,
  xGOT: Number,
  xCoord: Number,
  yCoord: Number,
  result: String,
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
});

const Shot = mongoose.model('Shot', ShotSchema);

export default Shot;
