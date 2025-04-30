import React from "react";
import style from "./AddAlbum.module.css";

interface AddAlbumProps {
  setIsbtn: (isbtn: boolean) => void;
  isbtn: boolean;
}

function AddAlbum(props: AddAlbumProps) {
  const { setIsbtn, isbtn } = props;

  return (
    <section className={style.albumsection}>
      <div className={style.addalbm}>
        <span className={style.imageHeading}>Your albums</span>
      </div>
      <div className={isbtn ? style.cancelbtn : style.addbtn}>
        <button onClick={() => setIsbtn(!isbtn)}>
          {isbtn ? "Cancel" : "Add btn"}
        </button>
      </div>
    </section>
  );
}

export default AddAlbum;
