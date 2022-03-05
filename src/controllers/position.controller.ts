import { Request, Response } from 'express';
import { done, error, success } from '../utils/response';
import { createPosition, getAllPosition,getPosition,updatePosition,removePosition } from '../services/position.service';
import log from '../utils/logger';

export default class PositionController {
  async getPosition(req: Request, res: Response) {
    try {
      const input={
      id:  req.params.id
      }
      const pos = await getPosition(input);
      success(res, pos);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async updatePosition(req: Request, res: Response) {
    try {
      const input={
      id:  req.body.id,
      ten:req.body.ten,
      mota:req.body.mota,
      }
      const pos = await updatePosition(input);
      success(res, pos);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async getAllPosition(req: Request, res: Response) {
    try {
      const filters = {
        _limit: req.query._limit || 8,
        _page: req.query._page || 1,
        search: req.query.search || '',
        status: req.query.status || 1,
      };
      const pos = await getAllPosition(filters);
      success(res, pos.data, pos.pagination);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async createPosition(req: Request, res: Response) {
    try {
      const pos = await createPosition(req.body);
      success(res, pos);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async removePosition(req: Request, res: Response) {
    try {
      const input={
        id:req.params.id
      }
      const pos = await removePosition(input);
      success(res, pos);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
}
