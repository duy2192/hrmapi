import { Request, Response } from 'express';
import { done, error, success } from '../utils/response';
import {
  createUser,
  login,
  forgotPassword,
  changePwd,
  resetPwd,
  validateToken,
  getUser,
  getAllUser,
  changeRole,
  blockAccount,
  unBlockAccount
} from '../services/auth.service';
import {
  createUserSchema,
  loginSchema,
  forgotPwdSchema,
  changePwdSchema,
  resetPwdSchema,
  checkTokenSchema,
} from '../schema/auth.schema';
import log from '../utils/logger';

export default class UserController {
  async getAllUser(req: Request, res: Response) {
    try {
      const filters = {
        _limit: req.query._limit || 8,
        _page: req.query._page || 1,
        search: req.query.search,
      };
      const user = await getAllUser(filters);
      success(res, user.data,user.pagination);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await getUser(id);
      success(res, user);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      createUserSchema.validateSync(req.body);
      const user = await createUser(req.body);
      success(res, user);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async login(req: Request, res: Response) {
    try {
      loginSchema.validateSync(req.body);
      const input = {
        identifier: req.body.identifier,
        password: req.body.password,
      };
      const user = await login(input);
      success(res, user);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async forgotPwd(req: Request, res: Response) {
    try {
      forgotPwdSchema.validateSync(req.body);
      const input = {
        email: req.body.email,
      };
      await forgotPassword(input);
      done(res, 'Success!');
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async resetPwd(req: Request, res: Response) {
    try {
      resetPwdSchema.validateSync(req.body);
      const input = {
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
        confirmPwd: req.body.confirmPwd,
        key: req.body.key,
      };
      await resetPwd(input);
      done(res, 'Success!');
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async changePwd(req: Request, res: Response) {
    try {
      changePwdSchema.validateSync(req.body);
      const input = {
        id: req.body.identifier,
        email: req.body.identifier,
        password: req.body.password,
        newpwd: req.body.newpwd,
        confirmPwd: req.body.confirmPwd,
      };
      await changePwd(input);
      done(res, 'Success!');
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async checkToken(req: Request, res: Response) {
    try {
      const input: any = {
        token: req.query.token,
      };
      checkTokenSchema.validateSync(input);
      await validateToken(input);
      done(res, 'Success!');
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async changeRole(req: Request, res: Response) {
    try {
      const input: any = {
        id: req.body.id,
        role: req.body.role,
      };
      await changeRole(input);
      done(res, 'Success!');
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async blockAccount(req: Request, res: Response) {
    try {
      const input: any = {
        id: req.params.id,
      };
      await blockAccount(input);
      done(res, 'Success!');
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async unBlockAccount(req: Request, res: Response) {
    try {
      const input: any = {
        id: req.params.id,
        key:req.query.key
      };
      await unBlockAccount(input);
      done(res, 'Success!');
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
}
