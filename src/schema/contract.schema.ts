import * as yup from "yup"

export const createContractSchema = yup.object({
  loaihd: yup.string().required(),
  ngayky:yup.string().required(),
  ngaykt:yup.string().required(),
  ghichu:yup.string()
});

