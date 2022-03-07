import { Router } from 'express';
import Controller from '../controllers/statistical.controller';

const router = Router();
const controller = new Controller();

router.get('/', controller.exportHRFile);


export default router; 