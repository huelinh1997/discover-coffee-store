import { getListCoffee } from "../../../service/coffee-store";
const getListStoreByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await getListCoffee(latLong, limit);
    res.status(200);
    res.json(response);
  } catch (error) {
    res.status(500);
    res.json({ message: `some thing wrong: ${error}` });
  }
};

export default getListStoreByLocation;
