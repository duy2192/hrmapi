import { Router } from 'express';
import Controller from '../controllers/position.controller';

const router = Router();
const controller = new Controller();

router.get('/', controller.getAllPosition);
router.get('/:id', controller.getPosition);
router.post('/', controller.createPosition);
router.patch('/', controller.updatePosition);
router.delete('/:id', controller.removePosition);



export default router