import React, { useCallback, useState } from "react";
import { getFromLocalStorage } from "../../../helper";
import axios from "axios";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import Button from "../../Button";
import "../../../asset/css/cropImage.css";
import { uploadProfile } from "../../../asset";
import { BASE_URL } from "../../../api/baseUrl";
import { useUpdateEmployeeImageMutation } from "../../../apis/employee";
const UpdateEmployeeCropImage = ({ oldImage,empId }) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cropedImage, setCropedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const bearerToken = getFromLocalStorage("token");
const [updateEmployeeImage]=useUpdateEmployeeImageMutation()
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
    formData.append("image", cropedImage?.blob);
    formData.append("oldImageName", oldImage);

    try {
      await updateEmployeeImage({id:empId,formData})
      // await axios.post(
      //   `${BASE_URL}/updateEmployeeImage/${empId}`,
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${bearerToken}`,
      //     },
      //   }
      // );
      setLoading(false);
      toast.success("Successfully updated");
      handleReset()
      handleCloseModal();
      // window.location.reload();
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

  return (
    <>
      <div className="pic-holder" onClick={handleOpenModal}>
        <img
          className="pic"
          src={
            oldImage?
            `https://spartanbots.xyz/borpact/public/${oldImage}`
            :uploadProfile
          }
          alt="profile"
        />
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
        <div
          className="modal show"
          tabIndex="-1"
          role="dialog"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Upload Image
                </h5>
                <button
                  type="button"
                  className="close closebtn"
                  onClick={() => {
                    handleCloseModal();
                    handleReset();
                  }}
                >
                  <span aria-hidden="true">&#10006;</span>
                </button>
              </div>

              <div className="modal-body">
                <section>
                  <input
                  className="form-control"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {image && (
                    <>
                    <div className="crop-container">
                      <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        cropShape="round" // Set cropSha e to 'round'
                        showGrid={false} // Optionally hide the grid lines
                      />
                    </div>
                 
                  <div className="controls">
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e) => {
                        setZoom(e.target.value);
                      }}
                      className="zoom-range"
                    />
                  </div>
                  </>

)}
                  {image && (
                    <div
                      className="col-md-12 mb-4 pb-2"
                      style={{ display: "flex", gap:"1rem"}}

                    >
                      <Button
                        loading={loading}
                        text="Save"
                        onClick={handleSaveImage}
                        className="btn mybtn"
                      />
                      <button className="btn mybtn" onClick={handleReset} >
                        Cancel
                      </button>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateEmployeeCropImage;
