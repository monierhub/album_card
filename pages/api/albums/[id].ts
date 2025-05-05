import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { Album } from "@/lib/models/Album";
import { handleError } from "@/lib/utils/error";
import { validateAlbumUpdate } from "@/lib/utils/validation";
import { NotFoundError } from "@/lib/utils/error";

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
        throw new NotFoundError("Album not found");
      }

      return res.status(200).json(album);
    } else if (req.method === "PUT") {
      const albumData = req.body;

      // Validate the update data
      validateAlbumUpdate.parse(albumData);

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
        throw new NotFoundError("Album not found");
      }

      return res.status(200).json({ message: "Album updated successfully" });
    } else if (req.method === "DELETE") {
      const result = await db.collection<Album>("albums").deleteOne({ id: id });

      if (result.deletedCount === 0) {
        throw new NotFoundError("Album not found");
      }

      return res.status(200).json({ message: "Album deleted successfully" });
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    const { statusCode, message } = handleError(error);
    return res.status(statusCode).json({ error: message });
  }
}
