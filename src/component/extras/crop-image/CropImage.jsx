import React, { useCallback, useState } from "react";
import { getFromLocalStorage, setToLocalStorage } from "../../../helper";
import axios from "axios";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import Button from "../../Button";
import "../../../asset/css/cropImage.css";
import { uploadProfile } from "../../../asset";
import { BASE_URL, IMAGE_BASE_URL_WITH_SLASH } from "../../../api/baseUrl";

const CropImage = ({ oldImage, handleDeleteProfileImage ,name,deleteLoading}) => {
  const existImage = `${IMAGE_BASE_URL_WITH_SLASH}${oldImage}`
  const [image, setImage] = useState(oldImage ? existImage :null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cropedImage, setCropedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const bearerToken = getFromLocalStorage("token");

  
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      // Generate cropped image file
      const canvas = document.createElement("canvas");
      const img = document.createElement("img");
      img.src = image;
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext("2d");
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
      canvas.toBlob((blob) => {
        const modifiedBlob = new File([blob], "cropped-image.png", {
          type: blob.type,
        });

        // Create an object with blob and properties
        const blobWithInfo = {
          blob: modifiedBlob,
          name: modifiedBlob.name,
          size: modifiedBlob.size,
          type: modifiedBlob.type,
          lastModifiedDate: modifiedBlob.lastModifiedDate,
          lastModified: modifiedBlob.lastModified,
        };
        setCropedImage(blobWithInfo);
      }, "image/png");
    },
    [image]
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file.size > 2048 * 1024) {
      // File size exceeds 2048 kilobytes (2 megabytes)
      toast.error("Image size must not exceed 2MB");
      return;
    }

    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleSaveImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("logoImage", cropedImage?.blob);
    formData.append("oldLogoImage", oldImage);

    try {
      const data = await axios.post(
        `${BASE_URL}/updateUserImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      setLoading(false);
      toast.success("Successfully Upadated");
      window.location.reload();


      setToLocalStorage("profileImage", data?.data?.newImage)
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.message);
    }
  };

  const handleReset = () => {
    setImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCropedImage(null);
  };
  console.log(deleteLoading, "oldige")
  return (
    <>
      <div className="pic-holder" onClick={handleOpenModal}>
        {oldImage ?
      
          <img
            className="pic"
            src={`${IMAGE_BASE_URL_WITH_SLASH}${oldImage}`}
            alt="profile"
          /> 
          :
            <div className="firstLetterPic">
  {name?.charAt(0)?.toUpperCase()}
</div>
        }



        <label htmlFor="newProfilePhoto" className="upload-file-block">
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
    {/* Backdrop */}
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
              <label className="form-label fw-semibold">
                Select Image
              </label>

              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

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
                  <label className="form-label fw-semibold">
                    Zoom Image
                  </label>

                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(e.target.value)}
                    className="form-range"
                  />
                </div>

                {/* Buttons */}
                <div className="d-flex flex-wrap gap-2 mt-4">
                  <Button
                    loading={loading}
                    text="Save"
                    onClick={handleSaveImage}
                    className="btn btn-primary px-4"
                  />

                 { oldImage&&
                 <Button
                    loading={deleteLoading}
                    text="Delete Image"
                    onClick={handleDeleteProfileImage}
                    className="btn btn-warning text-white px-4"
                  />
                }

                  <button
                    className="btn btn-outline-secondary px-4"
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
