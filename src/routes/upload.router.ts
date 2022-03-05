import { Router } from 'express';
import Controller from '../controllers/upload.controller';
const router = Router();
const controller = new Controller();
router.post('/img', controller.upLoadimg);
router.post('/file', controller.upLoadFile);

export default router;
