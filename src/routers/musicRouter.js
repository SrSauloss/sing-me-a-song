import { Router } from 'express';
import * as recommendationController from '../controllers/music.controller.js';

const router = new Router();
router.post('/recommendations', recommendationController.storeMusic);

export default router;
