const path = require("path");
const BaseConfig = require("./modal/baseConfig");
const getConfiguredTestCases = require("./util/getConfiguredTestCases");
const readXlsxAndFilter = require("./util/readXlsxAndFilter");

const baseConfigFilename = path.join(__dirname, "config/Main.xlsx");
const testCasesFilename = path.join(__dirname, "config/Feature_TestCases.xlsx");

async function getSuitesToRun() {
  const result = await readXlsxAndFilter(baseConfigFilename, 2, "Yes");
  if(result[0].length) 
  return new BaseConfig(...result[0][0]);
  else throw "Please mention proper the Execute type in the Main.xlsx file"
}

async function filterTestCases(baseConfig) {
    const result = await readXlsxAndFilter(testCasesFilename, 4, baseConfig.type);
    console.log("Test case :::", JSON.stringify(result));
}

async function getConditionedTestCases(baseConfig) {
  const result = await getConfiguredTestCases(testCasesFilename, baseConfig);
  console.log("Filtered Test case :::", result);
}

async function getTestCaseBySuite() {
  try {
    const baseConfig = await getSuitesToRun();
    // await filterTestCases(baseConfig);
    await getConditionedTestCases(baseConfig);
  } catch (error) {
    console.log(error);
  }
}
(async () => getTestCaseBySuite())()

module.exports = getTestCaseBySuite;

