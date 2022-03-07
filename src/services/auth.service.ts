import { User } from '../models/User';
import { getRepository,Like } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendMail from '../utils/sendMails';
import ejs from 'ejs';


export const getUser = async (id) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne(id);
    return user;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getAllUser = async (input) => {
  try {
    const repo = getRepository(User);
    const condition=[{name:Like(`%${input.search}%`)}]

    const [user, count] = await Promise.all([
      repo.find({
        skip: (input._page - 1) * input._limit,
        take: input._limit,
        where:condition
      }),
      repo.count({
        where:condition
      }), 
    ]); 
    return {
      data:user,
      pagination: {
        limit: input._limit,
        page: input._page,
        total: count,
      },
    };
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createUser = async (input: { email: string; name: string; username: string; password: string,role:number }) => {
  try {
    const repo = getRepository(User);
    let user = new User();
    const password=input.password||crypto.randomBytes(3).toString('hex')
    const hash = await bcrypt.hashSync(password, 10);

    user.email = input.email;
    user.name = input.name;
    user.username = input.username;
    user.password = hash;
    user.role=input.role

    await repo.save(user);
    const send = await ejs.renderFile(__dirname + '/../../public/templates/register.ejs', {
      data: { name: user.name, email: user.email,password:password },
    });
    sendMail(send, user.email, '[Đăng ký tài khoản] ');
    return user;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new Error('Trùng Email hoặc tên tài khoản!' as string);

    throw new Error(error as string);
  }
};

export const login = async (input: { email: string; username: string; password: string }) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne({ where: [{ username: input.username }, { email: input.email }] });
    if (!user) throw 'Tài khoản không tồn tại!';
    const checkPassword = await bcrypt.compare(input.password, user.password);

    if (checkPassword && user.password) {
      const jsonObject = {
        id: user.id,
      };
      const token = await jwt.sign(jsonObject, process.env.JWT_KEY, {
        expiresIn: 86400,
      });
      return { user, token };
    } else {
      throw 'Mật khẩu sai!';
    }
  } catch (error) {
    throw new Error(error as string);
  }
};

export const forgotPassword = async (input: { email: string }) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne({ where: { email: input.email } });
    if (!user) throw 'Email không tồn tại!';
    const resetToken = crypto.randomBytes(3).toString('hex');
    const hash = await bcrypt.hashSync(resetToken, 10);

    const jsonObject = {
      id: user.id,
      key: hash,
    };
    const token = await jwt.sign(jsonObject, process.env.JWT_KEY, {
      expiresIn: 3600,
    });
    const send = await ejs.renderFile(__dirname + '/../../public/templates/forgotPwd.ejs', {
      data: { name: user.name, email: user.email, key: resetToken },
    });
    sendMail(send, user.email, '[Xác minh tài khoản] ');
    user.resetpwdtoken = token;
    repo.save(user);
    return;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const resetPwd = async (input: { id:string;email: string; key: string; password: string; confirmPwd: string  }) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne({ where: [{ id: input.id }, { email: input.email }] });
    if (!user) throw 'Tài khoản không tồn tại!';
    if (!user.resetpwdtoken) throw 'Không có yêu cầu tạo lại mật khẩu!';
    const data: any = jwt.verify(user.resetpwdtoken, process.env.JWT_KEY);

    const checkPassword = await bcrypt.compare(input.key, data.key);
    if (!checkPassword || user.id !== data.id) throw 'Lỗi mã xác nhận!';
    if (input.password !== input.confirmPwd) throw 'Xác nhận mật khẩu sai!';
    const hash = await bcrypt.hashSync(input.password, 10);

    user.password = hash;
    user.resetpwdtoken = '';
    repo.save(user);

    return;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const changePwd = async (input: { id: string; email: string; password: string;newpwd:string; confirmPwd: string }) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne({ where: [{ id: input.id }, { email: input.email }] });
    if (!user) throw 'Tài khoản không tồn tại!';
    const checkPassword = await bcrypt.compare(input.password, user.password);
    if (!checkPassword) throw 'Mật khẩu sai!';

    if (input.newpwd !== input.confirmPwd) throw 'Mật khẩu mới không trùng khớp!';
    const hash = await bcrypt.hashSync(input.password, 10);
    user.password = hash;
    repo.save(user);
    return;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const validateToken = async (input: { token: string }) => {
  try {

     jwt.verify(input.token, process.env.JWT_KEY);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const changeRole = async (input) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne({ where: [{ id: input.id }, { email: input.email }] });
    if (!user) throw 'Tài khoản không tồn tại!';
    user.role=input.role
    repo.save(user);
    return;
  } catch (error) {
    throw new Error(error as string);
  }
};