import { Router } from 'express';
import Controller from '../controllers/reward.controller';

const router = Router();
const controller = new Controller();

router.post('/', controller.createReward);
router.get('/:id', controller.getReward);
router.delete('/:id', controller.removeReward);


export default router