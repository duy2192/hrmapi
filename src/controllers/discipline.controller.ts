import { Request, Response } from "express";
import { done,error, success } from "../utils/response";
import {createDiscipline,getDiscipline,removeDiscipline} from "../services/discipline.service"
// import {createSalarySchema} from "../schema/salary.schema";
import log from "../utils/logger";

export default class DisciplineController {

   async createDiscipline(req: Request, res: Response) {
        try {
        //   createSalarySchema.validateSync(req.body)
          const dis = await createDiscipline(req.body);
          success(res,dis);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async getDiscipline(req: Request, res: Response) {
        try {
          const input={
           id: req.params.id
          }
          const dis = await getDiscipline(input);
          success(res,dis);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async removeDiscipline(req: Request, res: Response) {
        try {
          const input={
           id: req.params.id
          }
          const dis = await removeDiscipline(input);
          success(res,dis);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
}