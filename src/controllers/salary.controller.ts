import { Request, Response } from "express";
import { done,error, success } from "../utils/response";
import {createSalary,getSalary} from "../services/salary.service"
import {createSalarySchema} from "../schema/salary.schema";
import log from "../utils/logger";

export default class SalaryController {

   async createSalary(req: Request, res: Response) {
        try {
          createSalarySchema.validateSync(req.body)
          const salary = await createSalary(req.body);
          success(res,salary);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async getSalary(req: Request, res: Response) {
        try {
          const input={
            id:req.params.id
          }
          const salary = await getSalary(input);
          success(res,salary);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
}