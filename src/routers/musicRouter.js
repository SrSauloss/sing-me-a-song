import { Router } from 'express';
import * as recommendationController from '../controllers/music.controller.js';

const router = new Router();
router.post('/recommendations', recommendationController.storeMusic);
router.post('/recommendations/:id/upvote', recommendationController.addVote);

export default router;
