import express from 'express';
import multer from 'multer';
import { done, error, success } from '../utils/response';

declare module 'express' {
  interface Request {
    body: any;
    file: any;
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/data');
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split('.');
    cb(null, Date.now() + Math.random() * 10000 + '.' + filename[filename.length - 1]);
  },
});
const upload = multer({ storage: storage });

export default class UploadController {
  async upLoadimg(req: express.Request, res) {
    upload.single('img')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);

        error(res,'Lỗi upload hình ảnh!'); return
      } else if (err) {
        error(res,'Lỗi upload hình ảnh!' ); return
      }
      const mime = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml','image/jpg'];
      if (!mime.includes(req.file?.mimetype)) {
        error(res,'Chỉ upload được file ảnh!' ); return
      } else {
        success(res,`${ req.file.destination + '/' + req.file.filename}`);return
      }
    });
  }

  async upLoadFile(req: express.Request, res) {
    upload.single('file')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        error(res,'Lỗi upload !' );
      } else if (err) {
        error(res,'Lỗi upload !' );
      }
        success(res,`${ req.file.destination + '/' + req.file.filename}`);
      
    });
  }
}
