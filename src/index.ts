import * as dotenv from 'dotenv';
dotenv.config();
import {createConnection} from "typeorm";
import express,{Application} from 'express';
import log from './utils/logger';
import userRouter from './routes/auth.router';
import contractRouter from './routes/contract.router';
import publicRouter from './routes/public.router';
import departmentRouter from './routes/department.router';
import levelRouter from './routes/level.router';
import salaryRouter from './routes/salary.router';
import personnelRouter from './routes/personnel.router';
import positionRouter from './routes/position.router';
import rewardRouter from './routes/reward.router';
import disciplineRouter from './routes/discipline.router';
import jobRouter from './routes/job.router';
import statisticalRouter from './routes/statistical.router';
import uploadRouter from './routes/upload.router';
import insuranceRouter from './routes/insurance.router';
import downloadRouter from './routes/download.router';
import utilsRouter from './routes/utils.router';
import cors from 'cors';
import reqlogger from "./middleware/logger.middleware"
import "reflect-metadata";

const app:Application = express();
const PORT = process.env.PORT; 

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(reqlogger)

app.use('/api/auth', userRouter);
app.use('/api/contract', contractRouter);
app.use('/api/public', publicRouter);
app.use('/api/department', departmentRouter);
app.use('/api/level', levelRouter);
app.use('/api/personnel', personnelRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/position', positionRouter);
app.use('/api/reward', rewardRouter); 
app.use('/api/discipline', disciplineRouter);
app.use('/api/job', jobRouter);
app.use('/api/statistical', statisticalRouter);
app.use('/api/insurance', insuranceRouter);
app.use('/api/download', downloadRouter);
app.use('/api/uploads', uploadRouter); 
app.use('/api/utils', utilsRouter);

createConnection().then(async () => {
  app.listen(PORT, () => {
    log.info('Server starting on port ' + PORT);
  });
}).catch(error => log.error(error));