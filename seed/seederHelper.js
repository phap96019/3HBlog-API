// IMPORT DATA INTO DB
exports.importData = async (Model, data) => {
  try {
    await Model.create(data); // [id : 1, id: 2,....]
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
exports.deleteData = async Model => {
  try {
    await Model.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
