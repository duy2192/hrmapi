import * as yup from 'yup';

export const createPersonnelSchema = yup.object({
  lv: yup.string().required('Chưa chọn trình độ!'),
  dv: yup.string().required('Chưa chọn đơn vị!'),
  cv: yup.string().required('Chưa chọn chức vụ!'),
  ten: yup.string().required('Chưa nhập tên nhân sự!'),
  email: yup.string().email().required('Chưa nhập tên nhân sự!'),
});
export const updatePersonnelSchema = yup.object({
  id: yup.string().required('Chưa chọn hồ sơ nhân sự!'),
});

export const getPersonnelSchema = yup.object({
  search: yup.string(),
  _limit: yup.number(),
  _page: yup.number(),
  position: yup.number(),
  level: yup.number(),
  department: yup.number(),
});
export const addLevelSchema = yup.object({
  ns: yup.string().required('Chưa chọn nhân sự!'),
  lv: yup.string().required('Chưa chọn trình độ!'),
});
