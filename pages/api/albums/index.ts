import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Album, AlbumInput } from "@/lib/models/Album";
import { handleError } from "@/lib/utils/error";
import { validateAlbum } from "@/lib/utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("album_db");

  try {
    if (req.method === "GET") {
      const albums = await db
        .collection<Album>("albums")
        .find({})
        .sort({ updatedAt: -1 })
        .toArray();
      return res.status(200).json(albums);
    } else if (req.method === "POST") {
      const albumData: AlbumInput = req.body;

      // Validate the album data
      validateAlbum(albumData);

      const result = await db.collection<Album>("albums").insertOne({
        ...albumData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).json({
        message: "Album created successfully",
        albumId: result.insertedId,
      });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    const { statusCode, message } = handleError(error);
    return res.status(statusCode).json({ error: message });
  }
}
