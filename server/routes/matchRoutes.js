import express from 'express';
import {
  getMatchesByLeagueIdAndSeason,
  addMatch,
} from '../controllers/matchController.js';

const router = express.Router();

router.get('/:leagueId/:season', getMatchesByLeagueIdAndSeason);
router.post('/', addMatch);

export default router;
