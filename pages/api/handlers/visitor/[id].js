import dbConnect from "@/utils/dbConnect";
import { getProductById } from "@/pages/api/controllers/mainAPIs";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  try {
    const item = await getProductById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
