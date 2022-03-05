import { Router } from 'express';
import Controller from '../controllers/salary.controller';

const router = Router();
const controller = new Controller();

router.post('/', controller.createSalary);
router.get('/:id', controller.getSalary);


export default router