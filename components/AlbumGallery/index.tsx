import { Album } from "@/types";
import Image from "next/image";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    <section className="w-11/12 relative top-10 flex justify-between items-center flex-wrap m-auto">
      {data.map((item) => (
        <div
          className="h-48 w-48 
          border border-solid border-black rounded-md 
          relative 
          my-7 mr-0 ml-4 
          p-0 
          bg-album-container 
          transition-album-transform 
          hover:scale-110 
          hover:shadow-album-hover"
          key={item.id}
        >
          <div
            className="absolute left-17/20 bottom-9/10 
            h-7 w-7 
            bg-black 
            flex justify-center items-center 
            rounded-1/2 
            hidden 
            transition-album-transform 
            z-1 
            hover:scale-110"
            onClick={() => handleUpdate(item)}
          >
            <MdOutlineModeEditOutline color="white" fontSize={20} />
          </div>
          <div
            className="absolute left-13/20 bottom-9/10 
            bg-black 
            flex justify-center items-center 
            rounded-1/2 
            hidden 
            transition-album-transform 
            z-1 
            hover:scale-110"
            onClick={() => handleDelete(item)}
          >
            <RiDeleteBin6Line color="white" fontSize={20} />
          </div>
          <div className="h-full w-19/20 m-auto">
            <Image
              className=""
              src={item.image}
              alt="Album Image"
              width={240}
              height={240}
            />
            <div className="w-full h-4/5 text-center mt-2.5 m-auto flex justify-center items-center">
              <div className="text-album-title text-base text-semibold font-album-title">
                {item.title}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default AlbumGallery;
