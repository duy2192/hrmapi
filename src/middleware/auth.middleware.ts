import { Request, Response,NextFunction } from 'express';

export default class AuthMiddleware {
   static async authentication(req: Request, res: Response,next:NextFunction) {
      try {
        next()
      } catch (e) {

      }
    }
  }
  