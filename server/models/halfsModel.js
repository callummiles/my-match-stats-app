import mongoose from 'mongoose';

const HalfsSchema = new mongoose.Schema({
  firstHalfStarted: String,
  firstHalfEnded: String,
  secondHalfStarted: String,
  secondHalfEnded: String,
  gameEnded: String,
});

export default HalfsSchema;
