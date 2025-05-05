// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import Button from "../Button";
// import axios from "axios";
// import { getFromLocalStorage } from "../../helper";
// import { toast } from "react-toastify";
// import { BASE_URL } from "../../api/baseUrl";

// const EditPosition = ({ positionId, oldPosition }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const bearerToken = getFromLocalStorage("token");

//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const headers = { Authorization: `Bearer ${bearerToken}` };
//   const { values, handleSubmit, handleChange } = useFormik({
//     initialValues: { position: oldPosition },
//     // validationSchema: validationSchema,

//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         await axios.post(
//           `${BASE_URL}/updatePosition/${positionId}`,
//           {
//             position: values.position,
//           },
//           { headers }
//         );
//         toast.success("Position updated successfully");
//         window.location.reload();
//       } catch (error) {
//         toast.error(error?.response?.data?.message);
//       } finally {
//         setLoading(false);
//         setModalOpen(false);
//       }
//     },
//   });
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (event.target.classList.contains("modal")) {
//         handleCloseModal();
//       }
//     };

//     document.addEventListener("click", handleOutsideClick);

//     return () => {
//       document.removeEventListener("click", handleOutsideClick);
//     };
//   }, []);

//   return (
//     <>
//       {/* Button trigger modal */}
//       <p
//         type="button"
//         className="btn act_btn_v popupdelete"
//         onClick={handleOpenModal}
//       >
//         <i className="fa fa-edit"></i>
//       </p>

//       {/* Modal */}
//       {modalOpen && (
//         <div
//           className="modal show"
//           tabIndex="-1"
//           role="dialog"
//           style={{
//             display: "block",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             zIndex: 9999,
//           }}
//         >
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLabel">
//                   Position
//                 </h5>
//                 <button
//                   type="button"
//                   className="close closebtn"
//                   onClick={handleCloseModal}
//                 >
//                   <span aria-hidden="true">&#10006;</span>
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="col-lg-8 col-md-12 col-sm-12 pb-4 addpositionfld">
//                   <input
//                     type="text"
//                     name="position"
//                     placeholder=""
//                     className="form-control "
//                     defaultValue={values.position}
//                     value={values.position}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-lg-2"></div>
//                 <div className="col-lg-2"></div>

//                 <div className="modal-footer">
//                   <div
//                     className="col-lg-12 col-sm-12 "
//                     style={{ textAlign: "center" }}
//                   >
//                     {" "}
//                     <Button
//                       className="btn mybtn bntresponsive"
//                       loading={loading}
//                       text="Submit"
//                     />{" "}
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditPosition;
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "../Button";
import { toast } from "react-toastify";
import { useUpdatePositionByIdMutation } from "../../apis/postion";

const EditPosition = ({ positionId, oldPosition }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [updatePosition, { isLoading }] = useUpdatePositionByIdMutation();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const formik = useFormik({
    initialValues: { position: oldPosition },
    enableReinitialize: true,

    onSubmit: async (values) => {
      try {
        await updatePosition({ id: positionId, data: values }).unwrap();
        toast.success("Position updated successfully");
        setModalOpen(false);
      } catch (error) {
        toast.error(error?.data?.message || "Update failed");
        console.error("Update error:", error);
      }
    },
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("modal")) {
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      <p
        type="button"
        className="btn act_btn_v popupdelete"
        onClick={handleOpenModal}
      >
        <i className="fa fa-edit"></i>
      </p>

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
                <h5 className="modal-title">Edit Position</h5>
                <button
                  type="button"
                  className="close closebtn"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true">&#10006;</span>
                </button>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="col-lg-8 col-md-12 col-sm-12 pb-4 addpositionfld">
                  <input
                    type="text"
                    name="position"
                    className="form-control"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="modal-footer">
                  <div className="col-lg-12 col-sm-12" style={{ textAlign: "center" }}>
                    <Button
                      className="btn mybtn bntresponsive"
                      loading={isLoading}
                      text="Submit"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPosition;
