import { Router } from 'express';
import * as recommendationController from '../controllers/recommendation.controller.js';

const router = new Router();
router.post('/recommendations', recommendationController.storeMusic);

export default router;
