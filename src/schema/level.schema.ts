import * as yup from "yup"

export const createLevelSchema = yup.object({
  ten: yup.string().required("Chưa nhập tên trình độ!"),
  mota:yup.string(),
});
export const editLevelSchema = yup.object({
  id:yup.string().required("Chưa chọn trình độ!"),
  ten: yup.string().required("Chưa nhập tên trình độ!"),
  mota:yup.string(),
});
export const removeLevelSchema = yup.object({
  id:yup.string().required("Chưa chọn trình độ!"),
});
