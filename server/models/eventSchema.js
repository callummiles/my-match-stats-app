import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  id: { type: Number, default: null },
  name: { type: String, default: null },
  profileUrl: { type: String, default: null },
});

const ShotmapEventSchema = new mongoose.Schema({
  id: Number,
  eventType: String,
  teamId: Number,
  playerId: Number,
  playerName: String,
  x: Number,
  y: Number,
  min: Number,
  minAdded: { type: Number, default: null },
  isBlocked: Boolean,
  isOnTarget: Boolean,
  blockedX: { type: Number, default: null },
  blockedY: { type: Number, default: null },
  goalCrossedY: Number,
  goalCrossedZ: Number,
  expectedGoals: Number,
  expectedGoalsOnTarget: Number,
  shotType: String,
  situation: String,
  period: String,
  isOwnGoal: Boolean,
  onGoalShot: {
    x: Number,
    y: Number,
    zoomRatio: Number,
  },
  isSavedOffLine: Boolean,
  firstName: String,
  lastName: String,
  fullName: String,
  teamColor: String,
});

const SubSchema = new mongoose.Schema({
  name: String,
  id: String,
  profileUrl: String,
});

const CardDescriptionSchema = new mongoose.Schema({
  localizedKey: String,
  defaultText: String,
});

const VARSchema = new mongoose.Schema({
  pendingDecision: Boolean,
  decision: {
    key: [String],
    value: [String],
  },
});

const EventSchema = new mongoose.Schema({
  reactKey: String,
  timeStr: String,
  type: String,
  time: Number,
  overloadTime: { type: Number, default: null },
  eventId: { type: Number, default: null },
  player: PlayerSchema,
  profileUrl: { type: String, default: null },
  overloadTimeStr: { type: String, default: null },
  isHome: Boolean,
  ownGoal: { type: Boolean, default: null },
  goalDescription: { type: String, default: null },
  goalDescriptionKey: { type: String, default: null },
  suffix: { type: String, default: null },
  suffixKey: { type: String, default: null },
  isPenaltyShootoutEvent: Boolean,
  nameStr: String,
  firstName: String,
  lastName: String,
  fullName: String,
  playerId: Number,
  newScore: [Number],
  penShootoutScore: { type: Number, default: null },
  shotmapEvent: ShotmapEventSchema,
  assistStr: { type: String, default: null },
  assistProfileUrl: { type: String, default: null },
  assistPlayerId: { type: Number, default: null },
  assistKey: { type: String, default: null },
  assistInput: { type: String, default: null },
  minutesAddedStr: { type: String, default: null },
  minutesAddedKey: { type: String, default: null },
  minutesAddedInput: { type: Number, default: null },
  halfStrShort: { type: String, default: null },
  halfStrKey: { type: String, default: null },
  swap: [SubSchema],
  card: { type: String, default: null },
  cardDescription: { type: CardDescriptionSchema, default: null },
  VAR: { type: VARSchema, default: null },
});

export default EventSchema;
