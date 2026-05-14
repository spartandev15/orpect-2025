import React, { useCallback, useEffect, useState } from "react";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "../../../helper";
import axios from "axios";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import Button from "../../Button";
import "../../../asset/css/cropImage.css";
import { uploadProfile } from "../../../asset";
import { BASE_URL, IMAGE_BASE_URL_WITH_SLASH } from "../../../api/baseUrl";
import { useDeleteUserProfileImageMutation, useUpdateUserImageMutation } from "../../../apis/employee";
const UserImageUpdate = ({ oldImage, empId, name, deleteLoading }) => {
    const [deleteUserProfileImage] = useDeleteUserProfileImageMutation()
    const existImage = `${IMAGE_BASE_URL_WITH_SLASH}${oldImage}`
    const [image, setImage] = useState(oldImage ? existImage : null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cropedImage, setCropedImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const bearerToken = getFromLocalStorage("token");
    const [updateUserImage] = useUpdateUserImageMutation()
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
        formData.append("status", "profile_imageupdate");
        formData.append("id", empId);




        try {
            // await updateAdminImage({id:empId,formData})
            const response = await updateUserImage(formData).unwrap();
            //  removeFromLocalStorage("user");
            //     setToLocalStorage("user", response?.superadmin_data);
            // await axios.post(
            //   `${BASE_URL}/updateEmployeeImage/${empId}`,
            //   formData,
            //   {
            //     headers: {
            //       Authorization: `Bearer ${bearerToken}`,
            //     },
            //   }
            // );
            setImage(null)
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
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCropedImage(null);

        if (oldImage) {
            setImage(`${IMAGE_BASE_URL_WITH_SLASH}${oldImage}`);
        } else {
            setImage(null);
        }

        setModalOpen(false);
    };
    const handleDeleteProfileImage = async () => {
        try {
            await deleteUserProfileImage(empId)

            handleReset()
            handleCloseModal();
        } catch (error) {

        }
    }
    useEffect(() => {
        if (oldImage) {

            setImage(existImage)
        }
    }, [oldImage])
    console.log(existImage, oldImage, image)

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
                {/* <img
          className="pic"
          src={
            oldImage?
            `${IMAGE_BASE_URL_WITH_SLASH}${oldImage}`
            :uploadProfile
          }
          alt="profile" 
        /> */}
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
                                    {image && <div
                                        className="d-flex justify-content-end p-2"


                                    >
                                        <i className="far fa-trash-alt"
                                            style={{ cursor: 'pointer' }}
                                            onClick={handleDeleteProfileImage}
                                        ></i>
                                    </div>}

                                    {image && (
                                        <>
                                            <div className="crop-container" >

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
                                    {/* Buttons */}
                                   {image && <div className="d-flex flex-wrap gap-2 mt-4">
                                        <Button
                                            loading={loading}
                                            text="Save"
                                            onClick={handleSaveImage}

                                            className="btn btn-primary px-4"
                                        />


                                        <button
                                            className="btn btn-outline-secondary px-4"
                                            onClick={handleReset}
                                        >
                                            Cancel
                                        </button>
                                    </div>}

                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserImageUpdate;
