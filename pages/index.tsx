import dynamic from "next/dynamic";
// imported useState, useEffect, and Suspense component from react
import { Suspense, useEffect, useState } from "react";
//import toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from "uuid";

import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Form from "@/components/AddAlbum/Form";
import AddAlbum from "@/components/AddAlbum";
import { Album } from "@/types";

const AlbumGallery = dynamic(() => import("@/components/AlbumGallery"), {
  ssr: false,
});

export default function Home() {
  const [isbtn, setIsbtn] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [albums, setAlbums] = useState<Album[]>([]);
  const [search, setSearch] = useState<Album[]>([]);
  const [update, setUpdate] = useState<Album | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("/api/albums", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch albums");
        }
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums:", error);
        toast.error("Failed to load albums. Please try again later.");
      }
    };
    fetchAlbums();
  }, []);

  const updateAlbum = async () => {
    if (!name) return;

    try {
      const response = await fetch(`/api/albums/${update?.id}`, {
        method: "PUT",
        body: JSON.stringify({ title: name, image }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (!response.ok) throw new Error("Failed to update album");

      const albumData = albums.map((album) => {
        if (album.id === update?.id) return { ...album, title: name, image };
        else return album;
      });

      setAlbums(albumData);
      toast("Album Updated succesfully!");
    } catch (error) {
      console.error("Error updating album:", error);
      toast.error("Failed to update album. Please try again later.");
    }

    setName("");
    setImage("");
    setIsbtn(false);
    setUpdate(null);
  };

  const handleCreate = async () => {
    if (!name || !image) {
      toast.error("Please provide both title and image");
      return;
    }

    const albumData = {
      id: uuidv4(),
      userId: uuidv4(),
      title: name,
      image: image,
    } as Album;

    try {
      const response = await fetch("/api/albums/", {
        method: "POST",
        body: JSON.stringify(albumData),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (!response.ok) throw new Error("Failed to create album");

      const createResult = await response.json();
      if (createResult.message === "Album created successfully") {
        setAlbums([albumData, ...albums]);
        toast.success("Album Created successfully!");
      }
    } catch (error) {
      console.error("Error creating album: ", error);
      toast.error("Something went wrong. Please try again later!");
    }

    setName("");
    setImage("");
    setIsbtn(false);
  };

  const handleClear = async () => {
    setName("");
    setImage("");
  };

  const handleUpdate = async (item: Album) => {
    setIsbtn(true);
    setUpdate(item);
    setName(item.title);
    setImage(item.image);
  };

  const handleDelete = async (item: Album) => {
    try {
      const response = await fetch(`/api/albums/${item?.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete album");

      const albumData = albums.filter((album) => album.id !== item.id);
      setAlbums(albumData);
      toast.success("Album Deleted successfully!");
    } catch (error) {
      console.error("Error deleting album:", error);
      toast.error("Something went wrong. Please try again later!");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchalbum = e.target.value.toLowerCase();
    const filterSearch = albums.filter((item) =>
      item.title.toLocaleLowerCase().includes(searchalbum)
    );
    setSearch(filterSearch);
  };

  const handleSearchDisplay = (item: Album) => {
    setSearch([item]);
  };

  return (
    <>
      <Navbar
        length={albums.length}
        handleSearch={handleSearch}
        search={search}
        handleSearchDisplay={handleSearchDisplay}
      />
      <section style={{ width: "70%", margin: "auto" }}>
        {isbtn && (
          <Form
            name={name}
            setName={setName}
            setImage={setImage}
            handleClear={handleClear}
            handleCreate={handleCreate}
            update={update}
            updateAlbum={updateAlbum}
          />
        )}
        <AddAlbum setIsbtn={setIsbtn} isbtn={isbtn} />
        <Suspense fallback={<Loader />}>
          <AlbumGallery
            albums={albums}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            search={search}
          />
        </Suspense>
        <ToastContainer />
      </section>
    </>
  );
}
