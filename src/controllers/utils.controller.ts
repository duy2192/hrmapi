import { Request, Response } from 'express';
import { done, error, success } from '../utils/response';
import { getProvinces } from '../services/utils.service';
import log from '../utils/logger';

export default class UtilsController {
  async getProvinces(req: Request, res: Response) {
    try {
      const filters={
          city:req.query.city,
          district:req.query.district,
          ward:req.query.ward
      }
        const prov = await getProvinces(filters); 
      success(res, prov);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
}
