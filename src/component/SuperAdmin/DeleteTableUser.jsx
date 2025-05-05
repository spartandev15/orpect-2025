
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteEmployeeById } from '../../api/employee';
// import Button from '../Button';
// import Popup from 'reactjs-popup';
// import { toast } from 'react-toastify';
// import { useDeleteEmployeeByIdMutation } from '../../apis/employee';

// const DeleteTableEmployee = ({ id }) => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const popupRef = React.createRef();
//  const [deleteEmployeeById]=useDeleteEmployeeByIdMutation()
//   const handleClosePopup = () => {
//     popupRef.current.close();
//   };

//   const handleDelete = () => {
//     setLoading(true);

//     if (id) {
//       dispatch(deleteEmployeeById(id))
//         .then((res) => {
//           setLoading(false);
//           toast.success("Successfully deleted")
//           window.location.reload();
//         })
//         .catch((err) => {
//           setLoading(false);
//           handleClosePopup();
//         });
//     }
//   };

//   return (
//     <>
//       <Popup ref={popupRef} trigger={
//         <p
//           type="button"
//           href="#myModal"
//           className="btn act_btn_v popupdelete"
//           data-toggle="modal"
//           onClick={() => popupRef.current.open()}
//         >
//           <i className="far fa-trash-alt"></i>
//         </p>
//       } position="left">
//         <div>
//           <h4 className="modal-title w-100">Are you sure?</h4>
//         </div>
//         <div className="modal-body">
//           <p>Do you really want to delete this record?</p>
//         </div>
//         <div className="modal-footer justify-content-center">
//           <Button
//             text="Delete"
//             className="btn btn-danger deletebtn"
//             onClick={handleDelete}
//             loading={loading}
//           />
//           <button type="button" onClick={handleClosePopup} className="btn btn-secondary cancelbtn" data-dismiss="modal" style={{ margin: "5px" }}>Cancel</button>
//         </div>
//       </Popup>
//     </>
//   );
// };

// export default DeleteTableEmployee;
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';
import { useDeleteUserByIdMutation } from '../../apis/SuperAdmin/user';

const DeleteTableUser= ({ id }) => {
  const [loading, setLoading] = useState(false);
  const popupRef = React.createRef();
  const [deleteUserById,{isSuccess}] = useDeleteUserByIdMutation();

  const handleClosePopup = () => {
    popupRef.current?.close();
  };

  const handleDelete = async () => {
    if (!id) return;

    setLoading(true);
    try {
      await deleteUserById(id).unwrap();
      toast.success("Successfully Deleted");
      handleClosePopup();
      // window.location.reload(); // Optional: better to use state management instead
    } catch (err) {
      toast.error("Failed to delete employee.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
useEffect(()=>{
  handleClosePopup();

},[isSuccess])
  return (
    <>
      <Popup
        ref={popupRef}
        trigger={
          <p
            type="button"
            className="btn act_btn_v popupdelete"
            onClick={() => popupRef.current?.open()}
          >
            <i className="far fa-trash-alt"></i>
          </p>
        }
        position="left"
      >
        <div>
          <h4 className="modal-title w-100">Are you sure?</h4>
        </div>
        <div className="modal-body">
          <p>Do you really want to delete this record?</p>
        </div>
        <div className="modal-footer justify-content-center">
          <Button
            text="Delete"
            className="btn btn-danger deletebtn"
            onClick={handleDelete}
            loading={loading}
          />
          <button
            type="button"
            onClick={handleClosePopup}
            className="btn btn-secondary cancelbtn"
            style={{ margin: "5px" }}
          >
            Cancel
          </button>
        </div>
      </Popup>
    </>
  );
};

export default DeleteTableUser
