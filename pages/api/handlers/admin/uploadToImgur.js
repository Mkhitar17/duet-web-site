import { IncomingForm } from "formidable";
import axios from "axios";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Parse incoming form data
      const form = new IncomingForm({ keepExtensions: true });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form data:", err);
          return res.status(400).json({ error: "Invalid form data" });
        }

        if (!files || !files.image) {
          console.error("No image file found in the request.");
          return res.status(400).json({ error: "No image file provided" });
        }

        const filePath = files.image[0].filepath; // Path to the uploaded file
        if (!filePath) {
          console.error("File path is undefined.");
          return res.status(400).json({ error: "File path is undefined." });
        }

        try {
          // Read the file as binary and convert to Base64
          const fileBuffer = await fs.readFile(filePath);
          const base64Image = fileBuffer.toString("base64");

          const response = await axios.post(
            "https://api.imgur.com/3/image",
            {
              image: base64Image, // Base64 image string
              type: "base64",    // Specify the type
            },
            {
              headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
              },
            }
          );

          const uploadedImageUrl = response.data.data.link;
          console.log("Uploaded Image URL:", uploadedImageUrl);

          // Clean up temporary file
          await fs.unlink(filePath);

          // Respond with the uploaded image URL
          res.status(200).json({ url: uploadedImageUrl });
        } catch (error) {
          console.error("Error uploading image to Imgur:", error);
          res.status(500).json({ error: "Failed to upload image to Imgur." });
        }
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Unexpected error occurred." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


