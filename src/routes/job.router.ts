import { Router } from 'express';
import Controller from '../controllers/job.controller';

const router = Router();
const controller = new Controller();

router.post('/', controller.jobTransfer);
router.get('/:id', controller.getJobTransfer);
router.delete('/:id', controller.removeJob);


export default router