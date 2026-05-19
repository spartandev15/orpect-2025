import React, { useCallback, useEffect, useState } from "react";
import { getFromLocalStorage } from "../../../helper";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import Button from "../../Button";
import "../../../asset/css/cropImage.css";
import { IMAGE_BASE_URL_WITH_SLASH } from "../../../api/baseUrl";
import { useDeleteCompanyProfileImageMutation, useUpdateCompanyImageMutation } from "../../../apis/SuperAdmin/companies";

const UpdateCompanyImage = ({
  oldImage,
  empId,
  name,
  deleteLoading,
  setTrue = () => {}
  // setTrue
}) => {
  const existImage = oldImage
    ? `${IMAGE_BASE_URL_WITH_SLASH}${oldImage}`
    : null;

  const [image, setImage] = useState(existImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [croppedFile, setCroppedFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [updateCompanyImage] = useUpdateCompanyImageMutation();
   const [deleteCompanyProfileImage]=useDeleteCompanyProfileImageMutation()

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // ✅ SAFE IMAGE LOADER (fixes tainted canvas)
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // IMPORTANT

      img.onload = () => resolve(img);
      img.onerror = reject;

      img.src = url;
    });

  // ✅ CROPPING FUNCTION (FIXED)
  const getCroppedFile = async (imageSrc, croppedAreaPixels) => {
    const image = await createImage(imageSrc);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is tainted or empty"));
          return;
        }

        const file = new File([blob], "cropped-image.png", {
          type: "image/png",
        });

        resolve(file);
      }, "image/png");
    });
  };

  // ✅ CROPPED AREA HANDLER
  const onCropComplete = useCallback(
    async (_, croppedAreaPixels) => {
      try {
        if (!image) return;

        const file = await getCroppedFile(image, croppedAreaPixels);

        setCroppedFile({
          blob: file,
          name: file.name,
          size: file.size,
          type: file.type,
        });
      } catch (err) {
        console.error(err);
        // toast.error("Image crop failed (CORS issue)");
      }
    },
    [image]
  );

  // ✅ IMAGE UPLOAD
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must not exceed 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ✅ SAVE IMAGE
  const handleSaveImage = async () => {
    if (!croppedFile?.blob) {
      toast.error("Please crop image first");
      return;
    }
        setTrue(false)

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", croppedFile.blob);
      formData.append("oldImageName", oldImage);
      formData.append("status", "profile_imageupdate");
      formData.append("id", empId);

      await updateCompanyImage(formData).unwrap();

      toast.success("Image updated successfully");
      setTrue(true)
      handleReset();
      handleCloseModal();
    } catch (error) {
      toast.error(error?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ RESET
  const handleReset = () => {
    setImage(existImage);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedFile(null);
    setModalOpen(false)
  };
    const handleDeleteProfileImage =
        async () => {
            try {
                await deleteCompanyProfileImage(empId).unwrap();

                toast.success(
                    "Profile image deleted"
                );

                setImage(null);

                handleCloseModal();
            } catch (error) {
                console.log(error);

                toast.error(
                    "Delete failed"
                );
            }
        };
           useEffect(() => {
                if (existImage) {
                    setImage(existImage);
                }
            }, [existImage]);
  return (
    <>
      {/* PROFILE IMAGE */}
      <div className="pic-holder" onClick={handleOpenModal}>
        {oldImage ? (
          <img
            className="pic"
            src={existImage}
            alt="profile"
          />
        ) : (
          <div className="firstLetterPic">
            {name?.charAt(0)?.toUpperCase()}
          </div>
        )}

        <label className="upload-file-block">
          <div className="text-center">
            <i className="fa fa-camera fa-2x"></i>
            <div>
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
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

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

              <div className="modal-body">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="form-control"
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
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
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
                    {/* <div style={{ display: "flex", gap: "10px" }}>
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
                          className="btn btn-warning"
                        />
                      )}

                      <button onClick={handleReset}>
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

export default UpdateCompanyImage;