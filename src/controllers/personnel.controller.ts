import { Request, Response } from "express";
import { done,error, success } from "../utils/response";
import {createPersonnel,getAllPersonnel,getPersonnel,getPositionDetail,getLevelDetail,addLevelDetail,addPositionDetail,updatePersonnel,removeLevelDetail,removePositionDetail} from "../services/personnel.service"
import {createPersonnelSchema,getPersonnelSchema,addLevelSchema,updatePersonnelSchema} from "../schema/personnel.schema";
import log from "../utils/logger";
export default class PersonnelController {

   async getAllPersonnel(req: Request, res: Response) {
        try {
        const filters={
          _limit:req.query._limit||8,
          _page:req.query._page||1,
          search:req.query.search||"",
          status:req.query.status||1,
          department:req.query.department||0,
          level:req.query.level||0,
          position:req.query.position||0,
        }
        getPersonnelSchema.validateSync(filters)
          const personnel = await getAllPersonnel(filters);
          success(res,personnel.data,personnel.pagination);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async getPersonnel(req: Request, res: Response) {
        try {
        const filters={
          id:req.params.id
        }
          const personnel = await getPersonnel(filters);
          success(res,personnel);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async getPositionDetail(req: Request, res: Response) {
        try {
        const filters={
          id:req.params.id
        }
          const position = await getPositionDetail(filters);
          success(res,position);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async addPosition(req: Request, res: Response) {
        try {
        
          const position = await addPositionDetail(req.body);
          success(res,position);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }

      async removePositionDetail(req: Request, res: Response) {
        try {
          const input={
            id:req.params.id
          }
          const level = await removePositionDetail(input);
          success(res,level);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }

   async getLevelDetail(req: Request, res: Response) {
        try {
        const filters={
          id:req.params.id
        }
          const level = await getLevelDetail(filters);
          success(res,level);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async addLevelDetail(req: Request, res: Response) {
        try {

        addLevelSchema.validateSync(req.body)
          const level = await addLevelDetail(req.body);
          success(res,level);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async removeLevelDetail(req: Request, res: Response) {
        try {
          const input={
            id:req.params.id
          }
          const level = await removeLevelDetail(input);
          success(res,level);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async createPersonnel(req: Request, res: Response) {
        try {
          createPersonnelSchema.validateSync(req.body)
          const personnel = await createPersonnel(req.body);
          success(res,personnel);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
   async updatePersonnel(req: Request, res: Response) {
        try {
          updatePersonnelSchema.validateSync(req.body)
          const personnel = await updatePersonnel(req.body);
          success(res,personnel);
        } catch (e) {
          log.error((e as Error).message );
          error(res,(e as Error).message)
        }
      }
} 