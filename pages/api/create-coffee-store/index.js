import { table, getMinifiedRecords, findRecordById } from "../air-table";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, address, region, upvote, imgUrl } = req.body;
    try {
      if (id) {
        const record = await findRecordById(id);
        if (record.length !== 0) {
          res.status(400);
          res.json({ message: "Record already exist!", record });
          return;
        }
        if (name) {
          const createRecord = await table.create([
            {
              fields: {
                id,
                name,
                address,
                region,
                upvote,
                imgUrl,
              },
            },
          ]);
          const record = getMinifiedRecords(createRecord);
          res.json({ message: "create a new record", record });
          return;
        }
        res.status(400);
        res.json({ message: "Missing name" });
        return;
      }
      res.status(400);
      res.json({ message: "Missing id" });
    } catch (error) {
      res.status(500);
      res.json({ message: "Something wrong when create:", error });
    }
  }
};

export default createCoffeeStore;
