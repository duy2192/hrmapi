import { Router } from 'express';
import Controller from '../controllers/contract.controller';

const router = Router();
const controller = new Controller();

router.post('/', controller.createContract);
router.get('/byid/:id', controller.getContract);
router.get('/:id', controller.getAllContract);
router.delete('/:id', controller.removeContract);



export default router