const mainSeeders = require("./main");

const importData = async () => {
  try {
    await mainSeeders.importData();
    console.log("imported data".green);
    process.exit();
  } catch (error) {
    console.log("data not imported : ".red, error);
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await mainSeeders.deleteData();
    console.log("deleted data".green);
    process.exit();
  } catch (error) {
    console.log("data not deleted : ".red, error);
    process.exit();
  }
};

if (process.argv[2] == '-i') {
    importData();
} else {
    deleteData();
}
