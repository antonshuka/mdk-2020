const fs = require("fs").promises;
const path = require("path");
await fs.mkdir(path.join(__dirname, "stores", "201", "newDir"));
async function main() {
  const salesDir = path.join(__dirname, "stores");
  const salesFiles = await findSalesFiles(salesDir);
  console.log(salesFiles);

}

main();

async function findSalesFiles(folderName) {
  // this array will hold sales files as they are found
  let salesFiles = [];

  async function findFiles(folderName) {
    // read all the items in the current folder
    const items = await fs.readdir(folderName, { withFileTypes: true });

    // iterate over each found item
    for (item of items) {
      if (item.isDirectory()) {
        // search this directory for files (this is recursion!)
        await findFiles(`${folderName}/${item.name}`);
      } else {
        // Make sure the discovered file is a sales.json file
        if (item.name === "sales.json") {
          // store the file path in the salesFiles array
          salesFiles.push(`${folderName}/${item.name}`);
        }
      }
    }
  }
  await findFiles(folderName);
  return salesFiles;
}
