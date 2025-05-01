import React, { useState, useRef } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { Album } from "@/types";
//imported css for the Form.
import style from "./Form.module.css";

interface FormProps {
  name: string;
  setName: (name: string) => void;
  setImage: (image: string) => void;
  handleCreate: () => void;
  handleClear: () => void;
  update: Album | null;
  updateAlbum: () => void;
}

function Form(props: FormProps) {
  const {
    name,
    setName,
    setImage,
    handleCreate,
    handleClear,
    update,
    updateAlbum,
  } = props;
  const [previewImage, setPreviewImage] = useState<string>(update?.image || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (update) {
      setName(update.title);
      setPreviewImage(update.image);
    }
  }, [update, setName]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);

      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // Create FormData for the upload
      const formData = new FormData();
      formData.append("image", file);

      // Upload to ImgBB
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      if (data.success) {
        setPreviewImage(data.data.url);
        setImage(data.data.url as string);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
      setPreviewImage("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormClear = () => {
    setName("");
    setPreviewImage("");
    handleClear();
  };

  return (
    <div className={style.box}>
      <div className={style.top}>
        <span>{update ? "Update Album" : "Create an Album"}</span>
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
          <div className={style.imageUpload}>
            {previewImage && (
              <div className={style.imagePreview}>
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  className={style.previewImage}
                />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className={style.fileInput}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={style.uploadButton}
              disabled={isUploading}
            >
              {isUploading
                ? "Uploading..."
                : previewImage
                ? "Change Image"
                : "Upload Image"}
            </button>
          </div>
        </div>
        <div className={style.right}>
          <button className={style.clearbtn} onClick={handleFormClear}>
            Clear
          </button>
          <button
            className={style.createbtn}
            onClick={update ? updateAlbum : handleCreate}
            disabled={isUploading}
          >
            {update ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
