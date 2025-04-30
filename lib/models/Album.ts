import { ObjectId } from "mongodb";

export interface Album {
  _id?: ObjectId;
  userId: string;
  id: string;
  title: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AlbumInput {
  userId: string;
  id: string;
  title: string;
  image: string;
}
