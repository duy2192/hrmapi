import { Request, Response } from "express";
import { done,error, success } from "../utils/response";
import {exportHRFile} from "../services/statistical.service"
import {createSalarySchema} from "../schema/salary.schema";
import log from "../utils/logger";
import path from 'path';

export default class StatisticalController {
    async exportHRFile(req: Request, res: Response) {
        try {
          const filters = {
            search: req.query.search||"",
            _sort:req.query._sort||"ten:ASC",
            status:req.query.status||1,
            department:req.query.department,
            gender:req.query.gender,
          };
          await exportHRFile(filters,res);

        } catch (e) {
          log.error((e as Error).message);
          error(res, (e as Error).message);
        }
      }

}