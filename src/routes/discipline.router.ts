import { Router } from 'express';
import Controller from '../controllers/discipline.controller';

const router = Router();
const controller = new Controller();

router.post('/', controller.createDiscipline);
router.get('/:id', controller.getDiscipline);
router.delete('/:id', controller.removeDiscipline);


export default router