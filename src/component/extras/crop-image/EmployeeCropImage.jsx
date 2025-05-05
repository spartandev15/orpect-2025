import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import Cropper from "react-easy-crop";
import "../../../asset/css/cropImage.css";
import { uploadProfile } from "../../../asset";
import Button from "../../Button";

const EmployeeCropImage = ({ getImageValue, setFieldValue }) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropedImage, setCropedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .test("fileSize", "Image size must not exceed 2MB", (value) => {
        if (!value) return true; // Skip validation if no image is provided
        return value.size <= 2048 * 1024; // 2048 kilobytes = 2 megabytes
      })
      .test("fileType", "Only image files are allowed", (value) => {
        if (!value) return true; // Skip validation if no image is provided
        return /^image\//.test(value.type); // Check if the file type starts with "image/"
      }),
  });
  

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
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
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveImage = () => {
    const isValid = validationSchema.isValidSync({ image: cropedImage });
    if (isValid) {
      setFieldValue("image", cropedImage);
      handleCloseModal();
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
        {cropedImage ? (
          <img
            src={URL.createObjectURL(cropedImage.blob)}
            alt="Cropped"
            className="pic"
          />
        ) : (
          <img src={uploadProfile} alt="Cropped" className="pic" />
        )}

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
                          cropShape="round"
                          showGrid={false}
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
                          onChange={(e) => setZoom(e.target.value)}
                          className="zoom-range"
                        />
                      </div>
                    </>
                  )}
                  {image && (
                    <div
                      className="col-md-12 mb-4"
                      style={{ display: "flex", gap: "1rem" }}
                    >
                      <Button
                        text="Save"
                        onClick={handleSaveImage}
                        className="btn mybtn"
                        disabled={!cropedImage || validationSchema}
                      />
                      <button className="btn mybtn" onClick={handleReset}>
                        Cancel
                      </button>
                    </div>
                  )}
                  {cropedImage && !validationSchema.isValidSync({ image: cropedImage }) && (
                    <div className="error-message" style={{color:'red'}}>
                     Please select a file of type jpg, jpeg or png. Max size 2MB
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

export default EmployeeCropImage;
