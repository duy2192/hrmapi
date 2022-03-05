import { Router } from 'express';
import Controller from '../controllers/utils.controller';

const router = Router();
const controller = new Controller();

router.get('/provinces', controller.getProvinces);




export default router