import { getRepository, MoreThan, Like } from 'typeorm';
import { Personnel } from '../models/Personnel';
import excel from 'exceljs';

export const exportHRFile = async (filters, res) => {
  try {
    const repo = getRepository(Personnel);
    const condition = {
      ten: Like(`%${filters.search}%`),
      trangthai: filters.status,
      dv: { id: Number.parseInt(filters.department) || MoreThan(0) },
      // dantoc: filters.search || Like('%%'),
      gioitinh: filters.gender || Like('%%'),
    };
    const sortField = filters._sort.split(':')[0];
    const sortType = filters._sort.split(':')[1];
    const personnelList = await repo.find({
      where: condition,
      relations: ['dv'],
      order: {
        [sortField]: sortType,
      },
    });
    if(personnelList.length<1) throw "Không có bản ghi nào!"
    const data = personnelList.map((item) => ({
      ...item,
      dv: item.dv.ten,
      trangthai: item.trangthai == 1 ? 'Đang làm việc' : 'Đã nghỉ',
    }));
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Hồ sơ nhân sự');

    worksheet.columns = [
      { header: 'Mã nhân viên', key: 'id', width: 10 },
      { header: 'Họ tên', key: 'ten', width: 20 },
      { header: 'Ngày sinh', key: 'ngaysinh', width: 15 },
      { header: 'Giới tính', key: 'gioitinh', width: 9 },
      { header: 'Đơn vị', key: 'dv', width: 20 },
      { header: 'Dân tộc', key: 'dantoc', width: 20 },
      { header: 'Tôn giáo', key: 'tongiao', width: 20 },
      { header: 'Quốc tịch', key: 'quoctich', width: 20 },
      { header: 'Email', key: 'email', width: 20 },
      { header: 'Số điện thoại', key: 'sdt', width: 20 },
      { header: 'Tỉnh/Thành phố', key: 'tp', width: 20 },
      { header: 'Quận/Huyện', key: 'quan', width: 20 },
      { header: 'Phường/Xã', key: 'phuong', width: 20 },
      { header: 'Địa chỉ', key: 'diachi', width: 20 },
      { header: 'Email', key: 'email', width: 20 },
      { header: 'Trạng thái', key: 'trangthai', width: 20 },
    ];
    worksheet.getRow(1).font = { name: 'Times New Roman', family: 4, size: 12, bold: true };
    worksheet.addRows(data);
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      row.eachCell(function (cell, colNumber) {
        cell.font = {
          name: 'Times New Roman',
          family: 4,
          bold: false,
          size: 11,
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        if (rowNumber == 1) {
          row.height = 20;
          cell.font = {
            bold: true,
            size: 12,
            name: 'Times New Roman',
            family: 4,
          };
        }
      }); 
    });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'Report.xlsx');
    workbook.xlsx.write(res).then(function (data) {
      res.end();
    });
    return;
  } catch (error) {
    throw new Error(error as string);
  }
};
