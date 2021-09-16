const { checkIsArray } = require("./helper");
const readXlsx = require("./readXlsx");

async function readXlsxAndFilter(filename, cellNumber, filterValue) {
  try {
    let result = [];
    const sheets = await readXlsx(filename);

    sheets.forEach(sheet => {
      const _keys = Object.keys(sheet);
      _keys.forEach(key => {
        if (checkIsArray(sheet[key])) {
          if(sheet[key].filter((row, idx) => row[cellNumber] === filterValue).length)
          result.push(sheet[key].filter((row, idx) => row[cellNumber] === filterValue));
        }
      });
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = readXlsxAndFilter;
