import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';
import { useDeleteNotificationByIdMutation } from '../../apis/SuperAdmin/notification';

const NotificationDelete= ({ id }) => {
  const [loading, setLoading] = useState(false);
  const popupRef = React.createRef();
  const [deleteNotificationById,{isSuccess}] = useDeleteNotificationByIdMutation();

  const handleClosePopup = () => {
    popupRef.current?.close();
  };

  const handleDelete = async () => {
    if (!id) return;

    setLoading(true);
    try {
      await deleteNotificationById(id).unwrap();
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

export default NotificationDelete
