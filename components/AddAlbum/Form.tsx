import React from "react";
import { useEffect } from "react";

//imported css for the Form.
import style from "./Form.module.css";
import { Album } from "@/types";

interface FormProps {
  name: string;
  setName: (name: string) => void;
  handleCreate: () => void;
  handleClear: () => void;
  update: Album | null;
  updateAlbum: () => void;
}

function Form(props: FormProps) {
  const { name, setName, handleCreate, handleClear, update, updateAlbum } =
    props;

  useEffect(() => {
    if (update) setName(update.title);
  }, [update, setName]);

  return (
    <div className={style.box}>
      <div className={style.top}>
        <span>Create an Album</span>
      </div>
      <div className={style.bottom}>
        <div className={style.left}>
          <input
            type="text"
            placeholder="Album Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={style.right}>
          <button className={style.clearbtn} onClick={handleClear}>
            Clear
          </button>
          <button
            className={style.createbtn}
            onClick={update ? updateAlbum : handleCreate}
          >
            {update ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
