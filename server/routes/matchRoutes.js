import express from 'express';
import {
  getMatchesByLeagueId,
  addMatch,
} from '../controllers/matchController.js';

const router = express.Router();

router.get('/:leagueId', getMatchesByLeagueId);
router.post('/', addMatch);

export default router;
