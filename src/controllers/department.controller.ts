import { Request, Response } from 'express';
import { done, error, success } from '../utils/response';
import { createDepartment, editDepartment, removeDepartment, getDepartment } from '../services/department.service';
import { createDepSchema, editDepSchema,removeDepSchema } from '../schema/department.schema';
import log from '../utils/logger';

export default class DepartmentController {
  async getDepartment(req: Request, res: Response) {
    try {
      const filters={
        _limit:req.query._limit||8,
        _page:req.query._page||1,
        search:req.query.search||"",
        status:req.query.status||1,
      }      
      const department = await getDepartment(filters);
      success(res, department.data,department.pagination);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async createDepartment(req: Request, res: Response) {
    try {
      createDepSchema.validateSync(req.body);
      const department = await createDepartment(req.body);
      success(res, department);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async editDepartment(req: Request, res: Response) {
    try {
      const data = {
        id: req.body.id,
        ten: req.body.ten,
        mota: req.body.mota,
      };
      editDepSchema.validateSync(data);

      const department = await editDepartment(data);
      success(res, department);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async removeDepartment(req: Request, res: Response) {
    try {
      const data = {
        id: req.params.id,
      };
      removeDepSchema.validateSync(data)
      const department = await removeDepartment(data);
      success(res, department);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
}
