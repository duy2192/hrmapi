import { Request, Response } from "express";
import { done,error, success } from "../utils/response";
import {createContract,getContract,removeContract,getAllContract} from "../services/contract.service"
import {createContractSchema} from "../schema/contract.schema"
import log from "../utils/logger";

export default class ContractController {

   async createContract(req: Request, res: Response) {
        try {
          createContractSchema.validateSync(req.body)
          const contract = await createContract(req.body);
          success(res,contract);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }

      async getAllContract(req: Request, res: Response) {
        try {
          const input={
            id:req.params.id
          }
          const job = await getAllContract(input);
          success(res,job);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }

      async getContract(req: Request, res: Response) {
        try {
          const input={
            id:req.params.id
          }
          const job = await getContract(input);
          success(res,job);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
      async removeContract(req: Request, res: Response) {
        try {
          const input={
            id:req.params.id
          }
          const job = await removeContract(input);
          success(res,job);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
}