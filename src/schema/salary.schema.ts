import * as yup from 'yup';

export const createSalarySchema = yup.object({
  ns: yup.string().required('Chưa chọn nhân sự!'),
  hsl: yup.number().required(),
  hspc: yup.number().required(),
  luongcb: yup.number().required(),
});
