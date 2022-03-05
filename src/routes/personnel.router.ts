import { Router } from 'express';
import Controller from '../controllers/personnel.controller';
import AuthMiddleware from '../middleware/auth.middleware';

const router = Router();
const controller = new Controller();

router.post('/',AuthMiddleware.authentication, controller.createPersonnel);
router.get('/',AuthMiddleware.authentication, controller.getAllPersonnel);
router.patch('/',AuthMiddleware.authentication, controller.updatePersonnel);
router.get('/position/:id',AuthMiddleware.authentication, controller.getPositionDetail);
router.post('/position/',AuthMiddleware.authentication, controller.addPosition);
router.delete('/position/:id',AuthMiddleware.authentication, controller.removePositionDetail);
router.get('/level/:id',AuthMiddleware.authentication, controller.getLevelDetail);
router.delete('/level/:id',AuthMiddleware.authentication, controller.removeLevelDetail);
router.post('/level/',AuthMiddleware.authentication, controller.addLevelDetail);
router.get('/:id',AuthMiddleware.authentication, controller.getPersonnel);


export default router