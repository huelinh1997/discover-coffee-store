import { table, findRecordById } from "../air-table";

const updateCoffeeStore = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      if (id) {
        const records = await findRecordById(id);

        if (records.length > 0) {
          const record = records[0];
          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                upvote: parseInt(record.upvote) + 1,
              },
            },
          ]);
          res.json({
            message: "updateRecord success",
            record: updateRecord[0].fields,
          });
          return;
        }
        res.status(400);
        res.json({ message: "Record not exist" });
        return;
      }
      res.status(400);
      res.json({ message: "Missing id" });
    } catch (error) {
      res.status(500);
      res.json({ message: "Some thing err when update coffee store", error });
    }
  }
};

export default updateCoffeeStore;
