import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import Cropper from "react-easy-crop";
import { toast } from "react-toastify";

import Button from "../../Button";

import "../../../asset/css/cropImage.css";

import {
    IMAGE_BASE_URL_WITH_SLASH,
} from "../../../api/baseUrl";

import {
    useDeleteUserProfileImageMutation,
    useUpdateUserImageMutation,
} from "../../../apis/employee";

const UserImageUpdate = ({
    oldImage,
    empId,
    name,
}) => {
    const [deleteUserProfileImage] =
        useDeleteUserProfileImageMutation();

    const [updateUserImage] =
        useUpdateUserImageMutation();

    // =========================
    // IMAGE URL FIX
    // =========================
    const existImage = oldImage
        ? `${IMAGE_BASE_URL_WITH_SLASH}/${oldImage}`.replace(
            /([^:]\/)\/+/g,
            "$1"
        )
        : null;

    // =========================
    // STATES
    // =========================
    const [image, setImage] =
        useState(existImage);

    const [crop, setCrop] =
        useState({
            x: 0,
            y: 0,
        });

    const [zoom, setZoom] =
        useState(1);

    const [loading, setLoading] =
        useState(false);

    const [modalOpen, setModalOpen] =
        useState(false);

    const [
        croppedAreaPixels,
        setCroppedAreaPixels,
    ] = useState(null);

    // =========================
    // OPEN MODAL
    // =========================
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    // =========================
    // CLOSE MODAL
    // =========================
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // =========================
    // CROP COMPLETE
    // =========================
    const onCropComplete =
        useCallback(
            (
                croppedArea,
                croppedPixels
            ) => {
                setCroppedAreaPixels(
                    croppedPixels
                );
            },
            []
        );

    // =========================
    // IMAGE UPLOAD
    // =========================
    const handleImageUpload = (
        event
    ) => {
        const file =
            event.target.files[0];

        if (!file) return;

        // SIZE VALIDATION
        if (file.size > 2048 * 1024) {
            toast.error(
                "Image size must not exceed 2MB"
            );
            return;
        }

        const reader =
            new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    // =========================
    // CREATE CROPPED IMAGE
    // =========================
    const createCroppedImage =
        async () => {
            try {
                const canvas =
                    document.createElement(
                        "canvas"
                    );

                const ctx =
                    canvas.getContext("2d");

                const img = new Image();

                // IMPORTANT FOR CORS
                img.crossOrigin =
                    "anonymous";

                img.src = image;

                await new Promise(
                    (resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    }
                );

                canvas.width =
                    croppedAreaPixels.width;

                canvas.height =
                    croppedAreaPixels.height;

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

                return new Promise(
                    (resolve) => {
                        canvas.toBlob(
                            (blob) => {
                                if (!blob) {
                                    resolve(null);
                                    return;
                                }

                                const file =
                                    new File(
                                        [blob],
                                        "cropped-image.png",
                                        {
                                            type:
                                                "image/png",
                                        }
                                    );

                                resolve(file);
                            },
                            "image/png",
                            1
                        );
                    }
                );
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to crop image"
                );

                return null;
            }
        };

    // =========================
    // SAVE IMAGE
    // =========================
    const handleSaveImage =
        async () => {
            try {
                setLoading(true);

                const croppedFile =
                    await createCroppedImage();

                if (!croppedFile) {
                    setLoading(false);
                    return;
                }

                const formData =
                    new FormData();

                formData.append(
                    "image",
                    croppedFile
                );

                formData.append(
                    "oldImageName",
                    oldImage || ""
                );

                formData.append(
                    "status",
                    "profile_imageupdate"
                );

                formData.append(
                    "id",
                    empId
                );

                await updateUserImage(
                    formData
                ).unwrap();

                toast.success(
                    "Successfully updated"
                );

                setLoading(false);

                handleReset();

                handleCloseModal();
            } catch (error) {
                console.log(error);

                setLoading(false);

                toast.error(
                    error?.data?.message ||
                    "Image update failed"
                );
            }
        };

    // =========================
    // RESET
    // =========================
    const handleReset = () => {
        setCrop({
            x: 0,
            y: 0,
        });

        setZoom(1);

        setCroppedAreaPixels(
            null
        );

        if (existImage) {
            setImage(existImage);
        } else {
            setImage(null);
        }

        setModalOpen(false);
    };

    // =========================
    // DELETE IMAGE
    // =========================
    const handleDeleteProfileImage =
        async () => {
            try {
                await deleteUserProfileImage(
                    empId
                ).unwrap();

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

    // =========================
    // UPDATE IMAGE
    // =========================
    useEffect(() => {
        if (existImage) {
            setImage(existImage);
        }
    }, [existImage]);

    console.log(
        "OLD IMAGE =>",
        oldImage
    );

    console.log(
        "EXIST IMAGE =>",
        existImage
    );

    return (
        <>
            {/* PROFILE IMAGE */}
            <div
                className="pic-holder"
                onClick={handleOpenModal}
            >
                {image ? (
                    <img
                        className="pic"
                        src={image}
                        alt="profile"
                        // crossOrigin="anonymous"
                        onError={() => {
                            console.log(
                                "IMAGE LOAD FAILED =>",
                                image
                            );
                        }}
                    />
                ) : (
                    <div className="firstLetterPic">
                        {name
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </div>
                )}

                <label className="upload-file-block">
                    <div className="text-center">
                        <div className="mb-2">
                            <i className="fa fa-camera fa-2x"></i>
                        </div>

                        <div className="text-uppercase">
                            Update
                            <br />
                            Profile Photo
                        </div>
                    </div>
                </label>
            </div>

            {/* MODAL */}
            {modalOpen && (
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
                        <div className="modal-content border-0 shadow-lg"
                            style={{ borderRadius: "16px" }}>
                            {/* HEADER */}
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">
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
                                    <span aria-hidden="true">
                                        &#10006;
                                    </span>
                                </button>
                            </div>

                            {/* BODY */}
                            <div className="modal-body">
                                <section>
                                    {/* FILE INPUT */}
                                    <input
                                        className="form-control"
                                        type="file"
                                        accept="image/*"
                                        onChange={
                                            handleImageUpload
                                        }
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
                                                onClick={
                                                    handleDeleteProfileImage
                                                }
                                            ></i>
                                        </div>
                                    )}

                                    {/* CROPPER */}
                                    {image && (
                                        <>
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
                                                    cropShape="round"
                                                    showGrid={false}
                                                    onCropChange={
                                                        setCrop
                                                    }
                                                    onZoomChange={
                                                        setZoom
                                                    }
                                                    onCropComplete={
                                                        onCropComplete
                                                    }
                                                />
                                            </div>

                                            {/* ZOOM */}
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
                                        </>
                                    )}

                                    {/* BUTTONS */}
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