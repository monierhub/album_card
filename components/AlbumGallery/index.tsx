import Image from "next/image";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Album } from "@/types";
import style from "./AlbumGallery.module.css";

interface AlbumGalleryProps {
  albums: Album[];
  handleDelete: (item: Album) => void;
  handleUpdate: (item: Album) => void;
  search: Album[];
}

function AlbumGallery(props: AlbumGalleryProps) {
  const { albums, handleDelete, handleUpdate, search } = props;

  let data: Album[] = [];
  if (search.length > 0) {
    data = search || albums;
  } else {
    data = albums;
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
              />
              <div>{item.title}</div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default AlbumGallery;
