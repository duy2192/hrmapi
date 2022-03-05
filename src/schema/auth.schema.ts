import * as yup from "yup"

export const createUserSchema = yup.object({
  email: yup.string().email("Sai định dạng email!").required(),
  name:yup.string().required(),
  role:yup.string(),
  username:yup.string(),
  password:yup.string()
});
export const loginSchema = yup.object({
  identifier: yup.string().required(),
  password:yup.string().required()
});
export const forgotPwdSchema = yup.object({
  email: yup.string().email("Sai định dạng Email!").required(),
});
export const resetPwdSchema = yup.object({
  email: yup.string().email("Sai định dạng Email!").required(),
  key: yup.string().required(),
});
export const changePwdSchema = yup.object({
  identifier: yup.string().required(),
  newpwd: yup.string().required().min(6, 'Mật khẩu phải lớn hơn 6 ký tự!'),
  confirmPwd: yup.string().required().oneOf([yup.ref('newpwd')], 'Mật khẩu xác nhận chưa đúng!'),
});
export const checkTokenSchema = yup.object({
  token: yup.string().required(),

});


