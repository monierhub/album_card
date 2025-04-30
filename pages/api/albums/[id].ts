import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { Album, AlbumInput } from "@/lib/models/Album";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid album ID" });
  }

  const client = await clientPromise;
  const db = client.db("album_db");

  try {
    if (req.method === "GET") {
      const album = await db.collection<Album>("albums").findOne({
        $or: [{ _id: new ObjectId(id) }, { id: id }],
      });

      if (!album) {
        return res.status(404).json({ error: "Album not found" });
      }

      return res.status(200).json(album);
    } else if (req.method === "PUT") {
      const albumData: AlbumInput = req.body;

      // Validate required fields
      if (!albumData.title || !albumData.image) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await db.collection<Album>("albums").updateOne(
        { id: id },
        {
          $set: {
            ...albumData,
            updatedAt: new Date(),
          },
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Album not found" });
      }

      return res.status(200).json({ message: "Album updated successfully" });
    } else if (req.method === "DELETE") {
      const result = await db.collection<Album>("albums").deleteOne({ id: id });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Album not found" });
      }

      return res.status(200).json({ message: "Album deleted successfully" });
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .end(`Method ${req.method || "unknown"} Not Allowed`);
    }
  } catch (error) {
    console.error(
      `Error handling ${req.method || "unknown"} request for album:`,
      error
    );
    return res.status(500).json({
      error: `Failed to ${req.method?.toLowerCase() || "process"} album`,
    });
  }
}
