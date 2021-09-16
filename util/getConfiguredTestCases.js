const { checkIsArray } = require("./helper");
const readXlsx = require("./readXlsx");

function filterBasedOnConfig(sheets, baseConfig) {
  let type = baseConfig.type;
  let tag = baseConfig.tag;
  let status = baseConfig.status;
  let result = [];
  sheets.forEach(sheet => {
    const _keys = Object.keys(sheet);
    _keys.forEach(key => {
      let _filter = [];
      if (checkIsArray(sheet[key])) {
        if(tag && status){
          _filter = sheet[key].filter((row, idx) => (row[4] === type && row[5] === tag && row[6] === status));
        } else if(tag) {
          _filter = sheet[key].filter((row, idx) => (row[4] === type && row[5] === tag));
        } else if(status) {
          _filter = sheet[key].filter((row, idx) => (row[4] === type && row[6] === status));
        } else {
          _filter = sheet[key].filter((row, idx) => (row[4] === type)); 
        }
      }
      if(_filter.length)
      result.push(_filter);
    });
  });
  return result;
}

async function getConfiguredTestCases(filename, baseConfig) {
  try {
    const sheets = await readXlsx(filename);
    let result = filterBasedOnConfig(sheets, baseConfig)
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = getConfiguredTestCases;
