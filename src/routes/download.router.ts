import path from 'path';
import { Router } from 'express';
import fs from 'fs';
import { success, error } from '../utils/response';
const router = Router();

router.get('/:file', async (req, res) => {
  try {
    const dir = path.join(__dirname, '../../public/uploads/data/' + req.params.file);
    if (fs.existsSync(dir)) res.download(dir);
    else throw 'Not-Found';
  } catch (err) {
    error(res, 'Not-Found',404);
  }
});
export default router;
