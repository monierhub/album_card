// imported useState, useEffect, and Suspense component from react
import { Suspense, useEffect, useState } from "react";
//import toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AlbumGallery from "@/components/AlbumGallery";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { Album } from "@/types";

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [search, setSearch] = useState<Album[]>([]);

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
    <Suspense fallback={<Loader />}>
      <Navbar
        length={albums.length}
        handleSearch={handleSearch}
        search={search}
        handleSearchDisplay={handleSearchDisplay}
      />
      <section className="w-7/10 m-auto">
        <AlbumGallery
          albums={albums}
          handleDelete={() => {}}
          handleUpdate={() => {}}
          search={search}
        />
        <ToastContainer />
      </section>
    </Suspense>
  );
}
