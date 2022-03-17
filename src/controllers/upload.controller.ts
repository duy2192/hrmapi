import express from 'express';
import multer from 'multer';
import { done, error, success } from '../utils/response';
import aws from 'aws-sdk';
import log from '../utils/logger';
import awsConfig from "../config/aws.config"
import multerS3 from 'multer-s3';
import path from 'path';

declare module 'express' {
  interface Request {
    body: any;
    file: any;
  }
}
const s3Object = new aws.S3({
  apiVersion: '2006-03-01',
  accessKeyId : awsConfig.ACCESS_KEY,
  secretAccessKey : awsConfig.SECRET_KEY,
  region: awsConfig.REGION,
});
// const storage = multer.diskStorage({ 
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/data');
//   },
//   filename: function (req, file, cb) {
//     const filename = file.originalname.split('.');
//     cb(null, Date.now() + Math.random() * 10000 + '.' + filename[filename.length - 1]);
//   },
// });
// const upload = multer({ storage: storage });

const upload = multer({
  storage: multerS3({
    s3:s3Object,
      bucket: awsConfig.BUCKET,
      metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `${Date.now() + Math.random() * 10000}${ext}`);
      },
      acl: 'public-read', 

  })
});
export default class UploadController {
  async upLoadimg(req: express.Request, res) {
    upload.single('img')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);

        error(res, 'Lỗi upload hình ảnh!');
        return;
      } else if (err) {
        error(res, 'Lỗi upload hình ảnh!');
        return;
      }
      const mime = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/jpg'];
      if (!mime.includes(req.file?.mimetype)) {
        error(res, 'Chỉ upload được file ảnh!');
        return;
      } else {
        success(res, `${req.file.destination + '/' + req.file.filename}`);
        return;
      }
    });
  }

  async upLoadFile(req: express.Request, res) {
    upload.single('file')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        error(res, 'Lỗi upload !');
      } else if (err) {
        log.error(err)
        error(res, 'Lỗi upload !');
      }
      success(res, {originalname:req.file.originalname,name:req.file.key,url:req.file.location});
    });
  }
 
  
}
