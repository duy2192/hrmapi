import { Router } from 'express';
import Controller from '../controllers/auth.controller';
import AuthMiddleware from '../middleware/auth.middleware';

const router = Router();
const controller = new Controller();

router.get('/token', controller.checkToken);
router.get('/',AuthMiddleware.authentication, controller.getAllUser);
router.get('/:id',AuthMiddleware.authentication, controller.getUser);
router.post('/', AuthMiddleware.authentication,controller.createUser);
router.post('/login', controller.login);
router.post('/forgotpwd', controller.forgotPwd);
router.post('/resetpwd', controller.resetPwd);
router.patch('/changepwd', controller.changePwd);
router.patch('/changerole', controller.changeRole);
router.patch('/block/:id', controller.blockAccount);
router.get('/unblock/:id', controller.unBlockAccount);


export default router