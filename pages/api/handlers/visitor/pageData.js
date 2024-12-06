import dbConnect from "@/utils/dbConnect";
import { fetchAllPageData } from "@/pages/api/controllers/mainAPIs";

export default async function handler(req, res) {
  await dbConnect(); // Ensure DB connection

  if (req.method === "GET") {
    try {
      const pageDataArray = await fetchAllPageData();
      res.status(200).json(pageDataArray);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
