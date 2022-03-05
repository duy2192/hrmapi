import { Router } from 'express';
import Controller from '../controllers/department.controller';

const router = Router();
const controller = new Controller();

router.get('/', controller.getDepartment);
router.post('/', controller.createDepartment);
router.patch('/:id', controller.editDepartment);
router.delete('/:id', controller.removeDepartment);



export default router