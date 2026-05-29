import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';
import { useDeleteEmployeeByIdMutation } from '../../apis/employee';
import { useDeleteUserHRMutation } from '../../apis/userHR';

const DeleteUser = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const popupRef = React.createRef();
  const [deleteUserHR, {isSuccess }] =
    useDeleteUserHRMutation();
  const handleClosePopup = () => {
    popupRef.current?.close();
  };

  const handleDelete = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await deleteUserHR(id).unwrap();
      if (response?.status === "error") {
        toast.error(response?.message || "Failed to delete employee");
      } else {
        toast.success("Successfully Deleted");
        handleClosePopup();
        // window.location.reload(); // Optional: better to use state management instead
      }
    } catch (err) {
      const errorMessage = err?.data?.message || err?.message || "Failed to delete employee.";
      toast.error(errorMessage);
      console.error("Delete employee failed:", err);
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

export default DeleteUser;
