import express from 'express';
import { getShotsByMatchId, addShots } from '../controllers/shotController.js';

const router = express.Router();

router.get('/:matchId', getShotsByMatchId);
router.post('/', addShots);

export default router;
