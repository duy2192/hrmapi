import * as yup from "yup"

export const jobTransferSchema = yup.object({
  dv: yup.number().required("Chưa chọn đơn vị!"),
  ns:yup.number().required("Chưa chọn nhân sự!"),
  cv:yup.number().required("Chưa chọn vị trí!"),
});
