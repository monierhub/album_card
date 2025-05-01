import Image from "next/image";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

import { Album } from "@/types";
import Loader from "@/components/Loader";
//imported css for the Album Gallery.
import style from "./AlbumGallery.module.css";

interface AlbumGalleryProps {
  albums: Album[];
  handleDelete: (item: Album) => void;
  handleUpdate: (item: Album) => void;
  search: Album[];
}

function AlbumGallery(props: AlbumGalleryProps) {
  const { albums, handleDelete, handleUpdate, search } = props;
  const [page, setPage] = useState(1);
  const [displayedAlbums, setDisplayedAlbums] = useState<Album[]>([]);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    const itemsPerPage = 24;
    const start = 0;
    const end = page * itemsPerPage;
    setDisplayedAlbums(albums.slice(start, end));
  }, [page, albums]);

  let data: Album[] = [];
  if (search.length > 0) {
    data = search;
  } else {
    data = displayedAlbums;
  }

  return (
    <section className={style.AlbumList}>
      {data.map((item) => (
        <div className={style.container} key={item.id}>
          <div className={style.edit} onClick={() => handleUpdate(item)}>
            <MdOutlineModeEditOutline color="white" fontSize={20} />
          </div>
          <div className={style.delete} onClick={() => handleDelete(item)}>
            <RiDeleteBin6Line color="white" fontSize={20} />
          </div>
          <div className={style.card}>
            <div className={style.image}>
              <Image
                className={style.imageView}
                src={item.image}
                alt="Album Image"
                width={180}
                height={180}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkJCAkJCQgLDAsMCwsMDx8nKDUsLDxw9LTWnN/xzH4zjUHLvvkUlgEql24yznrJ3xCyk72ykgY8CKNBYxx7+hL9M1S+ptHg54l4UMmnzHl98g8J6bZ1jc0waUb5NVGnifT5gdy7K5cLftYBRq6VpbTpxJ3TbzJTxKP06z2VTXyzmrY0iQif7uAERFeH8CvqVn2A3u8y68DhmbgmO4fTXV9h0USc/q53WGngG9dpr2WkdOclDa4ehhmcWZc9d0cgfpTh4Q+YKaIz7o+/v0fFnFfI6Bh3KH1F5ZTtAZ4r9usEgd5DZb/qVm8Ud8s8cP4AkgH2gFOKqzVbu51t5//9k="
              />
              <div>{item.title}</div>
            </div>
          </div>
        </div>
      ))}
      {!search.length && albums.length > displayedAlbums.length && (
        <div ref={ref} className={style.loadMore}>
          <Loader />
        </div>
      )}
    </section>
  );
}

export default AlbumGallery;
