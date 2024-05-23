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
});

export default ShotSchema;
