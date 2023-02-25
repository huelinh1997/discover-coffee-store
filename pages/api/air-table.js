var Airtable = require("airtable");
var base = new Airtable({
  apiKey: process.env.AIR_TABLE_API_KEY,
}).base(process.env.AIR_TABLE_BASE_CODE);
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
