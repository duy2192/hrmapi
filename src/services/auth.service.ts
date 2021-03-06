import { User } from '../models/User';
import { getRepository, Like } from 'typeorm';
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
    const condition = [{ name: Like(`%${input.search}%`), trangthai: 1 }];

    const [user, count] = await Promise.all([
      repo.find({
        skip: (input._page - 1) * input._limit,
        take: input._limit,
        where: condition,
      }),
      repo.count({
        where: condition,
      }),
    ]);
    return {
      data: user,
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

export const createUser = async (input: {
  email: string;
  name: string;
  sdt: string;
  username: string;
  password: string;
  role: number;
}) => {
  try {
    const repo = getRepository(User);
    let user = new User();
    const password = input.password || crypto.randomBytes(3).toString('hex');
    const hash = await bcrypt.hashSync(password, 10);

    user.email = input.email;
    user.sdt=input.sdt||"";
    user.name = input.name?.replace( /  +/g, ' ' );
    user.username = input.username||input.email;
    user.password = hash;
    user.role = input.role;

    await repo.save(user);
    const send =process.env.NODE_ENV=="development"
    ? await ejs.renderFile(__dirname + '/../assets/templates/register.ejs', {
      data: { name: user.name, email: user.email, password: password },
    }):
    await ejs.renderFile('./assets/templates/register.ejs', {
      data: { name: user.name, email: user.email, password: password },
    })
    sendMail(send, user.email, '[????ng k?? t??i kho???n] ');
    return user;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new Error('Email ho???c t??n t??i kho???n ???? ???????c ????ng k??!' as string);

    throw new Error(error as string);
  }
};

export const login = async (input: { identifier: string; password: string }) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne({ where: [{ username: input.identifier }, { email: input.identifier }] });

    if (!user) throw 'T??i kho???n kh??ng t???n t???i!';
    if (user.trangthai == 0) throw 'T??i kho???n ???? b??? kh??a!';
    const checkUser = [user.email, user.username];
    if (!checkUser.includes(input.identifier)) {
      throw 'T??i kho???n kh??ng t???n t???i!';
    }
    const checkPassword = await bcrypt.compare(input.password, user.password);
    if (user.failLogin >= 5) {
      const resetToken = crypto.randomBytes(10).toString('hex');
      const hash = await bcrypt.hashSync(resetToken, 10);
      const link = process.env.CLIENT_DOMAIN + `auth/${user.id}/${resetToken}`;
      const send =process.env.NODE_ENV=="development"
      ? await ejs.renderFile(__dirname + '/../../public/templates/unBlockAccount.ejs', {
        data: { name: user.name, username: user.username, link: link },
      }):await ejs.renderFile('./assets/templates/unBlockAccount.ejs', {
        data: { name: user.name, username: user.username, link: link },
      })
      sendMail(send, user.email, '[M??? kh??a t??i kho???n] ');
      user.unblocktoken = hash; 
      repo.save(user);
      throw 'T??i kho???n c???a b???n ???? b??? kh??a!';
    
    }

    if (checkPassword && user.password) {
      const jsonObject = {
        id: user.id,
      };
      const token = await jwt.sign(jsonObject, process.env.JWT_KEY, {
        expiresIn: 86400,
      });
      user.failLogin = 0;
      repo.save(user)
      return { user, token };  
    } else {
      if (user.failLogin == 4) {
        const resetToken = crypto.randomBytes(10).toString('hex');
        const hash = await bcrypt.hashSync(resetToken, 10);
        const link = process.env.CLIENT_DOMAIN + `auth/${user.id}/${resetToken}`;
        const send =process.env.NODE_ENV=="development"? await ejs.renderFile(__dirname + '/../../public/templates/unBlockAccount.ejs', {
          data: { name: user.name, username: user.username, link: link },
        }):await ejs.renderFile('./assets/templates/unBlockAccount.ejs', {
          data: { name: user.name, username: user.username, link: link },
        })
        sendMail(send, user.email, '[M??? kh??a t??i kho???n] ');
        user.unblocktoken = hash;
      }
      user.failLogin = user.failLogin + 1;
      repo.save(user);

      throw 'M???t kh???u sai!';
    }
  } catch (error) {
    throw new Error(error as string);
  }
};

export const forgotPassword = async (input: { email: string }) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne({ where: { email: input.email } });
    if (!user) throw 'Email kh??ng t???n t???i!';
    const resetToken = crypto.randomBytes(3).toString('hex');
    const hash = await bcrypt.hashSync(resetToken, 10);

    const jsonObject = {
      id: user.id,
      key: hash,
    };
    const token = await jwt.sign(jsonObject, process.env.JWT_KEY, {
      expiresIn: 3600,
    });
    const send =process.env.NODE_ENV=="development"? await ejs.renderFile(__dirname + '/../../public/templates/forgotPwd.ejs', {
      data: { name: user.name, email: user.email, key: resetToken },
    }):await ejs.renderFile('./assets/templates/forgotPwd.ejs', {
      data: { name: user.name, email: user.email, key: resetToken },
    });
    sendMail(send, user.email, '[X??c minh t??i kho???n] ');
    user.resetpwdtoken = token;
    repo.save(user);
    return;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const resetPwd = async (input: {
  id: string;
  email: string;
  key: string;
  password: string;
  confirmPwd: string;
}) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne({ where: [{ id: input.id }, { email: input.email }] });
    if (!user) throw 'T??i kho???n kh??ng t???n t???i!';
    if (!user.resetpwdtoken) throw 'Kh??ng c?? y??u c???u t???o l???i m???t kh???u!';
    const data: any = jwt.verify(user.resetpwdtoken, process.env.JWT_KEY);

    const checkPassword = await bcrypt.compare(input.key, data.key);
    if (!checkPassword || user.id !== data.id) throw 'L???i m?? x??c nh???n!';
    if (input.password !== input.confirmPwd) throw 'X??c nh???n m???t kh???u sai!';
    const hash = await bcrypt.hashSync(input.password, 10);
    user.failLogin=0;
    user.password = hash;
    user.resetpwdtoken = '';
    repo.save(user);

    return;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const changePwd = async (input: {
  id: string;
  email: string;
  password: string;
  newpwd: string;
  confirmPwd: string;
}) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne({ where: [{ id: input.id }, { email: input.email }] });
    if (!user) throw 'T??i kho???n kh??ng t???n t???i!';
    const checkPassword = await bcrypt.compare(input.password, user.password);
    if (!checkPassword) throw 'M???t kh???u sai!';

    if (input.newpwd !== input.confirmPwd) throw 'M???t kh???u m???i kh??ng tr??ng kh???p!';
    const hash = await bcrypt.hashSync(input.newpwd, 10);
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
    if (!user) throw 'T??i kho???n kh??ng t???n t???i!';
    user.role = input.role;
    repo.save(user);
    return;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const blockAccount = async (input) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne({ where: { id: input.id } });
    if (!user) throw 'T??i kho???n kh??ng t???n t???i!';
    user.trangthai = 0;
    repo.save(user);
    return;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const unBlockAccount = async (input) => {
  try {
    const repo = getRepository(User);
    const user = await repo.findOne({ where: { id: input.id } });
    if (!user) throw 'T??i kho???n kh??ng t???n t???i!';
    if(user.failLogin>=5){
      const check = await bcrypt.compare(input.key, user.unblocktoken);
      if(!check) throw "L???i x??c th???c!";
      user.failLogin=0;
      repo.save(user);
    }else{
      throw "T??i kho???n kh??ng b??? kh??a!"
    }
    return;
  } catch (error) {
    throw new Error(error as string);
  }
};
