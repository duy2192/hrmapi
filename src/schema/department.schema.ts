import * as yup from "yup"

export const createDepSchema = yup.object({
  ten: yup.string().required("Chưa nhập tên đơn vị!"),
  mota:yup.string().nullable(),
});
export const editDepSchema = yup.object({
  id:yup.string().required("Chưa chọn đơn vị!"),
  ten: yup.string().required("Chưa nhập tên đơn vị!"),
  mota:yup.string().nullable(),
});
export const removeDepSchema = yup.object({
  id:yup.string().required("Chưa chọn đơn vị!"),
});
