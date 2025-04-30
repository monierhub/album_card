import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Album, AlbumInput } from "@/lib/models/Album";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("album_db");

  if (req.method === "GET") {
    try {
      const albums = await db.collection<Album>("albums").find({}).toArray();
      return res.status(200).json(albums);
    } catch (error) {
      console.error("Error fetching albums:", error);
      return res.status(500).json({ error: "Failed to fetch albums" });
    }
  } else if (req.method === "POST") {
    try {
      const albumData: AlbumInput = req.body;

      // Validate required fields
      if (
        !albumData.userId ||
        !albumData.id ||
        !albumData.title ||
        !albumData.image
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await db.collection<Album>("albums").insertOne({
        ...albumData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).json({
        message: "Album created successfully",
        albumId: result.insertedId,
      });
    } catch (error) {
      console.error("Error creating album:", error);
      return res.status(500).json({ error: "Failed to create album" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
