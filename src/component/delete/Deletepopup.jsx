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
  const navigate = useNavigate()
  const handleClosePopup = () => {
    setDeletePopup(false);
    // Remove Bootstrap modal backdrop if it exists
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    // Remove modal-open class from body
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };
  const [deleteEmployeeById, { isSuccess, isLoading: loading }] = useDeleteEmployeeByIdMutation();

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
      handleClosePopup()
    }
  };
  useEffect(() => {
    if (isSuccess) {
      handleClosePopup();
    }
  }, [isSuccess])

  // Cleanup backdrop when modal closes
  useEffect(() => {
    if (!DeletePopup) {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [DeletePopup]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);
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
                {/* <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={handleClosePopup}
                  aria-hidden="true"
                  style={{ cursor: "pointer" ,background:"none",border:"none"}}
                >
                  <i className="fa fa-times" style={{ color: "#000" }}></i>
                </button> */}
              </div>
              <div className="modal-body">
                <p>Do you really want to delete this record? </p>
              </div>
              <div className="modal-footer justify-content-center">
                <Button
                  text="Delete"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  loading={loading}
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
                {/* <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button> */}

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEmployee;
