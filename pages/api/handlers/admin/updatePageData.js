import dbConnect from "@/utils/dbConnect";
import { updatePageData } from "@/pages/api/controllers/mainAPIs";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "PUT") {
    try {
      const updates = req.body;
      const updatedPageData = await updatePageData(updates);
      res.status(200).json(updatedPageData);
    } catch (error) {
      console.error("Error updating page data:", error);
      res.status(500).json({ message: error.message || "Failed to update page data." });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
