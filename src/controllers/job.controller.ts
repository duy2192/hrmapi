import { Request, Response } from "express";
import { done,error, success } from "../utils/response";
import {jobTransfer,getJob,removeJob} from "../services/job.service"
import log from "../utils/logger";
import {jobTransferSchema} from "../schema/job.schema";

export default class JobController {

   async jobTransfer(req: Request, res: Response) {
        try {
          jobTransferSchema.validateSync(req.body)
          const job = await jobTransfer(req.body);
          success(res,job);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async getJobTransfer(req: Request, res: Response) {
        try {
          const input={
            id:req.params.id
          }
          const job = await getJob(input);
          success(res,job);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async removeJob(req: Request, res: Response) {
        try {
          const input={
            id:req.params.id
          }
          const job = await removeJob(input);
          success(res,job);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
}