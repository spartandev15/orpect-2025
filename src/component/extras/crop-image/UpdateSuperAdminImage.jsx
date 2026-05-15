import React, { useCallback, useState } from "react";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../../helper";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import Button from "../../Button";
import "../../../asset/css/cropImage.css";
import {
  IMAGE_BASE_URL_WITH_SLASH,
} from "../../../api/baseUrl";
import { useUpdateAdminImageMutation } from "../../../apis/SuperAdmin/profile";

const UpdateSuperAdminImage = ({
  oldImage,
  empId,
  handleDeleteProfileImage,
  name,
  deleteLoading,
}) => {
  const existImage = oldImage
    ? `${IMAGE_BASE_URL_WITH_SLASH}${oldImage}`
    : null;

  const [image, setImage] = useState(existImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [updateAdminImage] = useUpdateAdminImageMutation();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // ✅ SAFE IMAGE LOADER (FIX TAINTED CANVAS)
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;

      img.onload = () => resolve(img);
      img.onerror = reject;
    });

  // ✅ SAFE CROP FUNCTION
  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas empty"));
          return;
        }

        const file = new File([blob], "cropped.png", {
          type: "image/png",
        });

        resolve(file);
      }, "image/png");
    });
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSaveImage = async () => {
    try {
      setLoading(true);

      if (!croppedAreaPixels) {
        toast.error("Please crop image first");
        setLoading(false);
        return;
      }

      const croppedFile = await getCroppedImg(
        image,
        croppedAreaPixels
      );

      const formData = new FormData();
      formData.append("image", croppedFile);
      formData.append("oldImageName", oldImage);
      formData.append("status", "profile_imageupdate");
      formData.append("id", empId);

      const response = await updateAdminImage({
        id: empId,
        formData,
      }).unwrap();

      removeFromLocalStorage("user");
      setToLocalStorage("user", response?.superadmin_data);

      toast.success("Successfully updated");

      setLoading(false);
      handleCloseModal();
      setImage(existImage);

      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.data?.message || "Upload failed");
    }
  };

  const handleReset = () => {
    setImage(existImage);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <>
      {/* PROFILE IMAGE */}
      <div className="pic-holder" onClick={handleOpenModal}>
        {oldImage ? (
          <img
            className="pic"
            src={existImage}
            alt="profile"
            // crossOrigin="anonymous"
          />
        ) : (
          <div className="firstLetterPic">
            {name?.charAt(0)?.toUpperCase()}
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="modal show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              {/* HEADER */}
              <div className="modal-header">
                <h5>Upload Image</h5>
              
                                <button
                                    type="button"
                                    className="close closebtn"
                                    onClick={() => {
                                        handleCloseModal();
                                        handleReset();
                                    }}
                                >
                                    <span aria-hidden="true">
                                        &#10006;
                                    </span>
                                </button>
              </div>

              {/* BODY */}
              <div className="modal-body">

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
 {image && (
                                        <div className="d-flex justify-content-end p-2">
                                            <i
                                                className="far fa-trash-alt"
                                                style={{
                                                    cursor:
                                                        "pointer",
                                                    fontSize:
                                                        "20px",
                                                }}
                                                onClick={
                                                    handleDeleteProfileImage
                                                }
                                            ></i>
                                        </div>
                                    )}
                {image && (
                  <>
                    <div className="crop-container">
                      <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>

                    <div className="mt-4">
                                                <input
                                                    type="range"
                                                    min={1}
                                                    max={3}
                                                    step={0.1}
                                                    value={zoom}
                                                    className="zoom-range"
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        setZoom(
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                />
                                            </div>
  {image && (
                                        <div
                                   className="col-md-12 mb-4 pb-2 mt-4"
                                            style={{
                                                display: "flex",
                                                gap: "1rem",
                                            }}
                                        >
                                            <Button
                                                loading={loading}
                                                text="Save"
                                                onClick={
                                                    handleSaveImage
                                                }
                                                className="btn mybtn"
                                            />

                                            <button
                                                className="btn mybtn"
                                                onClick={
                                                    handleReset
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                    {/* <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "15px",
                      }}
                    >
                      <Button
                        loading={loading}
                        text="Save"
                        onClick={handleSaveImage}
                      />

                      {oldImage && (
                        <Button
                          loading={deleteLoading}
                          text="Delete"
                          onClick={handleDeleteProfileImage}
                        />
                      )}

                      <button
                        className="btn"
                        onClick={handleReset}
                      >
                        Cancel
                      </button>
                    </div> */}
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateSuperAdminImage;