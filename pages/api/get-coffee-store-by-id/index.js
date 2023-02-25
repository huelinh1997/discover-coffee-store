import { findRecordById } from "../air-table";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = await findRecordById(id);
      if (records.length !== 0) {
        res.json(records);
        return;
      }
      return res.json({ message: "Id could not found!" });
    }
    res.status(400);
    res.json({ message: "Missing id" });
  } catch (error) {
    res.status(500);
    res.json({ message: "Some thing error", error });
  }
};

export default getCoffeeStoreById;
