import provinces from '../../public/uploads/provinces/provinces.json';
 
export const getProvinces = async (input) => {
  try {
    let data: any = provinces;
    let cityList: any = [];
    if (!input.city) {
      return data.map((x) => ({
        value: x.name,
        label: x.name,
        code: x.code,
        districts: x.districts.map((y) => ({
          value: y.name,
          label: y.name,
          code: y.code, 
        })),
      }));
    }
    if (!input.district) {
      data = data.filter((x) => x.code == input.city)[0];
      return data.districts.map((x) => ({
        value: x.name,
        label: x.name,
        code: x.code,
        wards: x.wards.map((y) => ({
          value: y.name,
          label: y.name,
          code: y.code,
        })),
      }));
    }
    if (!input.ward) {
      data = data.filter((x) => x.code == input.city)[0];
      data = data.districts.filter((x) => x.code == input.district)[0];
      return data.wards.map((x) => ({
        value: x.name,
        label: x.name,
        code: x.code,
      }));
    }
  } catch (error) {
    throw new Error(error as string);
  }
};
