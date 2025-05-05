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
import { useApi } from "@/hooks/useApi";

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

  const { request: fetchAlbums, loading: loadingAlbums } = useApi<Album[]>();
  const { request: createAlbum } = useApi<Album>();
  const { request: updateAlbum } = useApi<Album>();
  const { request: deleteAlbum } = useApi<void>();

  useEffect(() => {
    const loadAlbums = async () => {
      const data = await fetchAlbums("/api/albums");
      setAlbums(data);
    };
    loadAlbums();
  }, [fetchAlbums]);

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
    };

    await createAlbum("/api/albums", {
      method: "POST",
      body: albumData,
    });
    setAlbums([albumData, ...albums]);
    setName("");
    setImage("");
    setIsbtn(false);
  };

  const handleUpdate = async () => {
    if (!update?.id) return;

    await updateAlbum(`/api/albums/${update.id}`, {
      method: "PUT",
      body: { title: name, image },
    });

    const updatedAlbums = albums.map((album) =>
      album.id === update.id ? { ...album, title: name, image } : album
    );
    setAlbums(updatedAlbums);
    setName("");
    setImage("");
    setIsbtn(false);
    setUpdate(null);
  };

  const handleDelete = async (item: Album) => {
    await deleteAlbum(`/api/albums/${item.id}`, {
      method: "DELETE",
    });
    setAlbums(albums.filter((album) => album.id !== item.id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredAlbums = albums.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );
    setSearch(filteredAlbums);
  };

  const handleSearchDisplay = (item: Album) => {
    setSearch([item]);
  };

  return (
    <>
      0x5ddbaca4ae2117a79fc98cafb09c5d57739e1908
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
            handleClear={() => {
              setName("");
              setImage("");
            }}
            handleCreate={handleCreate}
            update={update}
            updateAlbum={handleUpdate}
          />
        )}
        <AddAlbum setIsbtn={setIsbtn} isbtn={isbtn} />
        <Suspense fallback={<Loader />}>
          {loadingAlbums ? (
            <Loader />
          ) : (
            <AlbumGallery
              albums={albums}
              handleDelete={handleDelete}
              handleUpdate={(item) => {
                setIsbtn(true);
                setUpdate(item);
                setName(item.title);
                setImage(item.image);
              }}
              search={search}
            />
          )}
        </Suspense>
        <ToastContainer />
      </section>
    </>
  );
}
