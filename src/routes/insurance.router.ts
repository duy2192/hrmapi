import { Router } from 'express';
import Controller from '../controllers/insurance.controller';

const router = Router();
const controller = new Controller();

router.get('/:id', controller.getAllInsurance);
router.post('/', controller.createInsurance);
router.delete('/:id', controller.removeInsurance);




export default router