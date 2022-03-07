import { Request, Response } from "express";
import { done,error, success } from "../utils/response";
import {createInsurance,getAllInsurance,removeInsurance} from "../services/insurance.service"
import {createContractSchema} from "../schema/contract.schema"
import log from "../utils/logger";

export default class InsuranceController {

   async createInsurance(req: Request, res: Response) {
        try {
        //   createContractSchema.validateSync(req.body)
          const insurance = await createInsurance(req.body);
          success(res,insurance);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }

      async getAllInsurance(req: Request, res: Response) {
        try {
        //   createContractSchema.validateSync(req.body)
        const input={
            id:req.params.id
        }
          const insurance = await getAllInsurance(input);
          success(res,insurance);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
      async removeInsurance(req: Request, res: Response) {
        try {
        //   createContractSchema.validateSync(req.body)
        const input={
            id:req.params.id
        }
          const insurance = await removeInsurance(input);
          success(res,insurance);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
}