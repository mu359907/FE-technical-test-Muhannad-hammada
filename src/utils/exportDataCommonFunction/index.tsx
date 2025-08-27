// utils/exportToExcel.js
import * as XLSX from 'xlsx';
import moment from 'moment';

export const exportToExcel = (data:any, columns:any, filename:any) => {
  let extension = '.xlsx'
  if(filename == 'user_data' || filename == 'CS_Evaluation_Version_History' || filename == 'exam_attempt_data'|| filename == 'exam_attempt_detail_data'){
    extension = '.csv'
  }
    const formattedData = data.map((item: any) => {
        const rowData: any = {};
        for (const columnKey in columns) {
          const apiColumnKey = columns[columnKey]; // Get the corresponding key from the columns object
          if (item.hasOwnProperty(apiColumnKey)) { // Check if the API data object has the corresponding key
            if (apiColumnKey === 'created_on') {
                // Format date using Moment.js if the key is 'created_at'
                rowData[columnKey] = moment(item[apiColumnKey]).format("DD MMM YYYY, HH:mm A");
              } else {
                rowData[columnKey] = item[apiColumnKey];
              } // Use the column key from the columns object
          }
        }
        return rowData;
      });      

  const ws = XLSX.utils.json_to_sheet(formattedData, { header: Object.keys(columns) });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
  XLSX.writeFile(wb, `${filename}${extension}`);
};
