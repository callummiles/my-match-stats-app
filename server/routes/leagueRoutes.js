import express from 'express';
import { getLeagues, addLeague } from '../controllers/leagueController.js';

const router = express.Router();

router.get('/', getLeagues);
router.post('/', addLeague);

export default router;
