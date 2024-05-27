import express from 'express';
import { getDataByMatchId, addShots } from '../controllers/dataController.js';

const router = express.Router();

router.get('/:matchId', getDataByMatchId);
router.post('/', addShots);

export default router;
