import awsConfig from './aws.config'
import AWS from "aws-sdk"
import S3  from "aws-sdk/clients/s3"
import log from "../utils/logger"

const REGION = awsConfig.REGION;
const ACCESS_KEY = awsConfig.ACCESS_KEY;
const SECRET_KEY = awsConfig.SECRET_KEY;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION
});

const s3 = new S3 ({apiVersion: '2006-03-01'});

const params = {
  Bucket: process.env.BUCKET
};

const editBucketCORS = () =>
  s3.putBucketCors(
    {
      Bucket: awsConfig.BUCKET,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ["*"],
            AllowedMethods: ["PUT", "POST", "DELETE"],
            AllowedOrigins: ["*"]
          },
          {
            AllowedMethods: ["GET"],
            AllowedOrigins: ["*"]
          }
        ]
      }
    },
    err => {
      if (err) log.error(err, err.stack);
      else log.info(`Edit Bucket CORS succeed!`);
    }
  );
s3.createBucket(params, (err, data) => {
  if (err) log.error(err, err.stack);
  else {
    log.info(data);
    editBucketCORS();
  }
});