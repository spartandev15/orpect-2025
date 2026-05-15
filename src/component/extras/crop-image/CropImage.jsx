import React, { useCallback, useEffect, useState } from "react";
import { getFromLocalStorage, setToLocalStorage } from "../../../helper";
import axios from "axios";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import Button from "../../Button";
import "../../../asset/css/cropImage.css";
import { BASE_URL, IMAGE_BASE_URL_WITH_SLASH } from "../../../api/baseUrl";

const CropImage = ({
  oldImage,
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
  const [cropedImage, setCropedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const bearerToken = getFromLocalStorage("token");

  useEffect(() => {
    if (existImage) {
      setImage(existImage);
    }
  }, [existImage]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // FIX TAINTED CANVAS ISSUE
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();

      // IMPORTANT
      image.setAttribute("crossOrigin", "anonymous");

      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);

      image.src = url;
    });

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
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }

          const file = new File([blob], "cropped-image.png", {
            type: "image/png",
          });

          resolve({
            blob: file,
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
          });
        },
        "image/png",
        1
      );
    });
  };

  const onCropComplete = useCallback((croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > 2048 * 1024) {
      toast.error("Image size must not exceed 2MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSaveImage = async () => {
    try {
      setLoading(true);

      if (!croppedAreaPixels) {
        toast.error("Please crop image");
        setLoading(false);
        return;
      }

      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels
      );

      setCropedImage(croppedImage);

      const formData = new FormData();

      formData.append("logoImage", croppedImage?.blob);

      if (oldImage) {
        formData.append("oldLogoImage", oldImage);
      }

      const response = await axios.post(
        `${BASE_URL}/updateUserImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setToLocalStorage(
        "profileImage",
        response?.data?.newImage
      );

      toast.success("Successfully Updated");

      setLoading(false);

      window.location.reload();
    } catch (error) {
      console.log(error);

      setLoading(false);

      toast.error(
        error?.response?.data?.message ||
          "Failed to upload image"
      );
    }
  };

  const handleReset = () => {
    setImage(existImage || null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCropedImage(null);
  };

  return (
    <>
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

        <label
          htmlFor="newProfilePhoto"
          className="upload-file-block"
        >
          <div className="text-center">
            <div className="mb-2">
              <i className="fa fa-camera fa-2x"></i>
            </div>

            <div className="text-uppercase">
              Update <br /> Profile Photo
            </div>
          </div>
        </label>
      </div>

      {/* Modal */}
      {modalOpen && (
        <>
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 9999,
            }}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-md"
              role="document"
            >
              <div
                className="modal-content border-0 shadow-lg"
                style={{ borderRadius: "16px" }}
              >
                {/* Header */}
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold">
                    Upload Profile Image
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      handleCloseModal();
                      handleReset();
                    }}
                  ></button>
                </div>

                {/* Body */}
                <div className="modal-body pt-3">
                  <div className="mb-3">
                    {/* <label className="form-label fw-semibold">
                      Select Image
                    </label> */}

                    <input
                      className="form-control"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {image && (
                    <div className="d-flex justify-content-end p-2">
                      <i
                        className="far fa-trash-alt"
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                        onClick={handleDeleteProfileImage}
                      ></i>
                    </div>
                  )}

                  {image && (
                    <>
                      {/* Cropper */}
                      <div
                        className="position-relative overflow-hidden rounded"
                        style={{
                          height: "320px",
                          width: "100%",
                          background: "#f8f9fa",
                        }}
                      >
                        <Cropper
                          image={image}
                          crop={crop}
                          zoom={zoom}
                          aspect={1}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                          cropShape="round"
                          showGrid={false}
                        />
                      </div>

                      {/* Zoom */}
                      <div className="mt-4">
                        {/* <label className="form-label fw-semibold">
                          Zoom Image
                        </label> */}

                        <input
                          type="range"
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          onChange={(e) =>
                            setZoom(Number(e.target.value))
                          }
                          className="zoom-range"
                        />
                      </div>

                      {/* Buttons */}
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
                          onClick={handleSaveImage}
                          className="btn mybtn"
                        />

                      

                        <button
                          className="btn mybtn"
                          onClick={handleReset}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CropImage;