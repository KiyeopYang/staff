import XLSX from 'xlsx';
import dayjs from 'dayjs';

export default function (workList = []) {
  /* make worksheet */
  const ws_data = [
    [ "이름", "전화번호", "매장", "출근", "퇴근", "근무 시간" ],
  ];

  const sorted = workList
    .map(work => ({
      ...work,
      datetime: new Date(work.datetime),
      endDatetime: new Date(work.endDatetime),
      shopName: work.shop.name,
      staffName: work.staff.name,
      staffPhone: work.staff.phone,
    }))
    .sort((a, b) => (a.datetime.getTime() - b.datetime.getTime()));
  sorted.forEach(work => ws_data.push([
    work.staffName,
    work.staffPhone,
    work.shopName,
    dayjs(work.datetime).format('YYYY-MM-DD HH:mm'),
    dayjs(work.endDatetime).format('YYYY-MM-DD HH:mm'),
    ((work.endDatetime - work.datetime) / 1000 / 60 / 60).toFixed(1),
  ]));
  const sheet = XLSX.utils.aoa_to_sheet(ws_data);

  const new_workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(new_workbook, sheet, "Data");
  XLSX.writeFile(new_workbook, 'WorkList.xlsx', {
    type: 'string',
  });
}
