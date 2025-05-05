import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEmployeeById } from "../../api/employee";
import { toast } from "react-toastify";
import Button from "../../component/Button"; 
import { useDeleteEmployeeByIdMutation } from "../../apis/employee";
import { useNavigate } from "react-router-dom";

const DeleteEmployee = ({ id }) => {
  const [DeletePopup, setDeletePopup] = useState(false);
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const handleClosePopup = () => {
    setDeletePopup(false);
  };
  const [deleteEmployeeById,{isSuccess,isLoading:loading}] = useDeleteEmployeeByIdMutation();

  // const handleDelete = () => {
  //   // setLoading(true);
  //   if (id) {
  //     dispatch(deleteEmployeeById(id))
  //       .then((res) => {
  //         setDeletePopup(false);
  //         window.location.href = "/dashboard";
  //         toast.success("Deleted Successfully");
  //       })
  //       .catch((err) => {
  //         handleClosePopup();
  //       });
  //   }
  // };
 const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteEmployeeById(id).unwrap();
      toast.success("Successfully deleted");
      handleClosePopup();
      navigate('/dashboard')
      // window.location.reload(); // Optional: better to use state management instead
    } catch (err) {
      toast.error("Failed to delete employee.");
      console.error(err);
    } finally {
    }
  };
useEffect(()=>{
  handleClosePopup();

},[isSuccess])
  return (
    <>
      <p
        type="button"
        href="#myModal"
        data-toggle="modal"
        className="btn deltepopup1"
        onClick={() => setDeletePopup(true)}
      >
        {" "}
        Delete Employee{" "}
      </p>

      {DeletePopup && (
        <div id="myModal" className="modal fade">
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-header flex-column">
                <h4 className="modal-title w-100">Are you sure?</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Do you really want to delete this record? </p>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                {/* <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button> */}
                <Button
                  text="Delete"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEmployee;
