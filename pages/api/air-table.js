var Airtable = require("airtable");
var base = new Airtable({
  apiKey: "keyCrzTlXewxrQDSD",
}).base("appqCrD4n9xtbY4Ql");
const tableName = "coffee-stores";
const table = base(tableName);

const getMinifiedRecords = (records) => {
  return records.map((record) => ({
    ...record.fields,
    recordId: record.id,
  }));
};

const findRecordById = async (id) => {
  const findCoffeeStore = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();
  return getMinifiedRecords(findCoffeeStore);
};

export { table, getMinifiedRecords, findRecordById };
