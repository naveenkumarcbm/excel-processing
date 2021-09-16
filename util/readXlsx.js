const ExcelJS = require("exceljs");

async function readXlsx(filename) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filename);
    return iterateSheets(workbook);
  } catch (error) {
    console.log(error);
  }
}

async function iterateSheets(workbook) {
  const sheets = [];
  workbook.eachSheet(sheet => {
    let rows = [];
    let name = sheet.name;
    sheet.eachRow((row, rowNumber) => rowNumber !== 1 && rows.push(row.values));
    sheets.push({ [name]: rows });
  });
  return sheets;
}

module.exports = readXlsx;