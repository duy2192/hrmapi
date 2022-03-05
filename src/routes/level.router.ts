import { Router } from 'express';
import Controller from '../controllers/level.controller';

const router = Router();
const controller = new Controller();

router.get('/', controller.getLevel);
router.post('/', controller.createLevel);
router.patch('/:id', controller.editLevel);
router.delete('/:id', controller.removeLevel);



export default router