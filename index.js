const path = require("path");
const readXlsxAndFilter = require("./util/readXlsxAndFilter");

const baseConfigFilename = path.join(__dirname, "config/Main.xlsx");
const testCasesFilename = path.join(__dirname, "config/Feature_TestCases.xlsx");

async function getSuitesToRun() {
  const result = await readXlsxAndFilter(baseConfigFilename, 2, "Yes");
  return result;
}

async function filterTestCases(suites = []) {
  suites.forEach(async suite => {
    const result = await readXlsxAndFilter(testCasesFilename, 4, "Smoke");
    console.log("Test case :::", result);
  });
}

async function getTestCaseBySuite() {
  try {
    const suitesToRun = await getSuitesToRun();
    await filterTestCases(suitesToRun);

  } catch (error) {
    console.log(error);
  }
}
(async () => getTestCaseBySuite())()

module.exports = getTestCaseBySuite;

