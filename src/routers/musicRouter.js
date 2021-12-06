import { Router } from 'express';
import * as recommendationController from '../controllers/music.controller.js';

const router = new Router();
router.post('/recommendations', recommendationController.storeMusic);
router.post('/recommendations/:id/upvote', recommendationController.addVote);
router.post('/recommendations/:id/downvote', recommendationController.removeVote);
router.get('/recommendations/random', recommendationController.randomMusics);
router.get('/recommendations/top/:amount', recommendationController.topsMusics);

export default router;
