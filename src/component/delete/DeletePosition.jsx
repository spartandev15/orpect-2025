// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { checkPositionDelete, deletePositionById } from "../../api/postion";
// import Button from "../Button";
// import { toast } from "react-toastify";

// const DeletePosition = ({ id, position }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [positionUse,setPositionUse] = useState();
//   const dispatch = useDispatch();

//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   useEffect(() => {
//     if (position) {
//       const checkPosition = () => {
//         dispatch(checkPositionDelete(position))
//           .then((res) => {
//             setPositionUse(res.positionInUse)
//           })
//           .catch((err) => {
//           });
//       };
//       checkPosition();
//     }
//   }, [modalOpen]);

//   const handleDelete = () => {
//     setLoading(true);
//     if (id) {
//       dispatch(deletePositionById(id))
//         .then((res) => {
//           setLoading(false);
//           toast.success("Successfully deleted");
//           window.location.reload();
//         })
//         .catch((err) => {
//           setLoading(false);
//           handleCloseModal();
//         });
//     }
//   };
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
//         <i className="far fa-trash-alt"></i>
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
//                   {positionUse===0?"Delete Position":"Warning"}
//                 </h5>
//                 <button
//                   type="button"
//                   className="close closebtn"
//                   onClick={handleCloseModal}
//                 >
//                   <span aria-hidden="true">&#10006;</span>
//                 </button>
//               </div>
//               <div className="modal-body" style={{ color: "black" }}>
//                 {positionUse===0?
            
//             <p>
//              Are you sure you want to delete this Position?
//             </p>
//             :
//             <>
//             <p style={{fontWeight:'bold'}}>
//             Unable to delete this position!
//             </p>
//             <span>
//             It is currently occupied by {positionUse} employees. Please reassign the position to employees before deleting the position.
//             </span>
//             </>
//               }
//               </div>
//               {positionUse===0?
//               <div className="modal-footer">
//                 <Button
//                 text="Delete"
//                 className="btn btn-danger deletebtn"
//                 onClick={handleDelete}
//                 loading={loading}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-secondary cancelbtn"
//                   onClick={handleCloseModal}
//                 >
//                   Cancel
//                 </button>
                
//               </div>
//               :
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary cancelbtn"
//                   onClick={handleCloseModal}
//                 >
//                   Ok
//                 </button>
//               </div>
//               }
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DeletePosition;
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { toast } from "react-toastify";
import { useDeletePositionByIdMutation, useLazyCheckPositionDeleteQuery } from "../../apis/postion";


const DeletePosition = ({ id, position }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [positionUse, setPositionUse] = useState(0);

  const [deletePosition, { isLoading }] = useDeletePositionByIdMutation();
  const [triggerCheckPosition] = useLazyCheckPositionDeleteQuery();

  const handleOpenModal = async () => {
    setModalOpen(true);
    try {
      const res = await triggerCheckPosition(position).unwrap();
      setPositionUse(res?.positionInUse || 0);
    } catch (err) {
      toast.error("Failed to check position usage.");
      console.error(err);
    }
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleDelete = async () => {
    try {
      await deletePosition(id).unwrap();
      toast.success("Successfully deleted");
      setModalOpen(false);
    } catch (error) {
      toast.error("Deletion failed");
      console.error("Delete error:", error);
    }
  };

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
        <i className="far fa-trash-alt"></i>
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
                <h5 className="modal-title">
                  {positionUse === 0 ? "Delete Position" : "Warning"}
                </h5>
                <button
                  type="button"
                  className="close closebtn"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true">&#10006;</span>
                </button>
              </div>
              <div className="modal-body" style={{ color: "black" }}>
                {positionUse === 0 ? (
                  <p>Are you sure you want to delete this Position?</p>
                ) : (
                  <>
                    <p style={{ fontWeight: "bold" }}>
                      Unable to delete this position!
                    </p>
                    <span>
                      It is currently occupied by {positionUse} employees.
                      Please reassign them before deleting the position.
                    </span>
                  </>
                )}
              </div>
              <div className="modal-footer">
                {positionUse === 0 ? (
                  <>
                    <Button
                      text="Delete"
                      className="btn btn-danger deletebtn"
                      onClick={handleDelete}
                      loading={isLoading}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary cancelbtn"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-secondary cancelbtn"
                    onClick={handleCloseModal}
                  >
                    Ok
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePosition;
