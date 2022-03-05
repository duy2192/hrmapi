import { Request, Response } from 'express';
import { done, error, success } from '../utils/response';
import { createLevel, editLevel, removeLevel, getLevel } from '../services/level.service';
import { createLevelSchema, editLevelSchema, removeLevelSchema } from '../schema/level.schema';
import log from '../utils/logger';

export default class LevelController {
  async getLevel(req: Request, res: Response) {
    try {
      const filters={
        _limit:req.query._limit||8,
        _page:req.query._page||1,
        search:req.query.search||"",
        status:req.query.status||1,
      } 
      const level = await getLevel(filters);
      success(res, level.data,level.pagination);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async createLevel(req: Request, res: Response) {
    try {
      createLevelSchema.validateSync(req.body);
      const level = await createLevel(req.body);
      success(res, level);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async editLevel(req: Request, res: Response) {
    try {
      const data = {
        id: req.params.id,
        ten: req.body.ten,
        mota: req.body.mota,
      };
      editLevelSchema.validateSync(data);

      const level = await editLevel(data);
      success(res, level);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async removeLevel(req: Request, res: Response) {
    try {
      const data = {
        id: req.params.id,
      };
      removeLevelSchema.validateSync(data);

      const level = await removeLevel(data);
      success(res, level);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
}
