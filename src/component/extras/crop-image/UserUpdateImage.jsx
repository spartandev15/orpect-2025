import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";

import Button from "../../Button";
import "../../../asset/css/cropImage.css";

import { IMAGE_BASE_URL_WITH_SLASH } from "../../../api/baseUrl";
import { useUpdateUserImageMutation } from "../../../apis/SuperAdmin/user";

const UserUpdateImage = ({ oldImage, empId, name }) => {
  const [updateUserImage] = useUpdateUserImageMutation();

  // =========================
  // FIX IMAGE URL
  // =========================
  const existImage = oldImage
    ? `${IMAGE_BASE_URL_WITH_SLASH}/${oldImage}`.replace(/([^:]\/)\/+/g, "$1")
    : null;

  // =========================
  // STATES
  // =========================
  const [image, setImage] = useState(existImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // =========================
  // SYNC OLD IMAGE
  // =========================
  useEffect(() => {
    setImage(existImage);
  }, [existImage]);

  // =========================
  // MODAL
  // =========================
  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => setModalOpen(false);

  // =========================
  // FILE UPLOAD
  // =========================
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must not exceed 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  // =========================
  // CROPPER COMPLETE
  // =========================
  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // =========================
  // CREATE CROPPED IMAGE
  // =========================
  const createCroppedImage = async () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = image;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) return resolve(null);

          const file = new File([blob], "cropped-image.png", {
            type: "image/png",
          });

          resolve(file);
        }, "image/png");
      });
    } catch (err) {
      console.log(err);
      toast.error("Image crop failed");
      return null;
    }
  };

  // =========================
  // SAVE IMAGE
  // =========================
  const handleSaveImage = async () => {
    try {
      setLoading(true);

      const croppedFile = await createCroppedImage();
      if (!croppedFile) {
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", croppedFile);
      formData.append("oldImageName", oldImage || "");
      formData.append("status", "profile_imageupdate");
      formData.append("id", empId);

      await updateUserImage(formData).unwrap();

      toast.success("Successfully updated");

      handleReset();
      handleCloseModal();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESET
  // =========================
  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setImage(existImage);
    setModalOpen(false);
  };

  // =========================
  // UI
  // =========================
  return (
    <>
      {/* PROFILE IMAGE */}
      <div className="pic-holder" onClick={handleOpenModal}>
        {image ? (
          <img className="pic" src={image} alt="profile" />
        ) : (
          <div className="firstLetterPic">
            {name?.charAt(0)?.toUpperCase()}
          </div>
        )}

        <label className="upload-file-block">
          <div className="text-center">
            <i className="fa fa-camera fa-2x mb-2"></i>
            <div className="text-uppercase">
              Update <br /> Profile Photo
            </div>
          </div>
        </label>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="modal show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 9999,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">

              {/* HEADER */}
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Upload Image</h5>

                <button
                  className="close closebtn"
                  onClick={() => {
                    handleCloseModal();
                    handleReset();
                  }}
                >
                  &#10006;
                </button>
              </div>

              {/* BODY */}
              <div className="modal-body">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageUpload}
                />
  {/* DELETE ICON */}
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
                                                // onClick={
                                                //     handleDeleteProfileImage
                                                // }
                                            ></i>
                                        </div>
                                    )}
                {image && (
                  <>
                    <div
                      style={{
                        height: 320,
                        width: "100%",
                        background: "#f8f9fa",
                        position: "relative",
                        marginTop: 15,
                      }}
                    >
                      <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    </div>

                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(e.target.value)}
                      className="zoom-range mt-3"
                    />
                  </>
                )}

                {/* BUTTONS */}
                {image && (
                  <div className="d-flex gap-3 mt-4">
                    <Button
                      loading={loading}
                      text="Save"
                      onClick={handleSaveImage}
                      className="btn mybtn"
                    />

                    <button className="btn mybtn" onClick={handleReset}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserUpdateImage;