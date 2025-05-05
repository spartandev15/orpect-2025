import React from "react";

const SaveRatingPopup = () => {
  return (
    <>
      <button
        type="button"
        href="#myreview"
        data-toggle="modal"
        id="saveButton3"
        className="btn infoedit3"
      >
        Save
      </button>
                                                                                    
      <div id="myreview" className="modal fade">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header flex-column">
              <h4 className="modal-title w-100">Are you sure?</h4>
              <button
                type="button"
                className="close closebtn"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &#10006;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Saving the changes will convert your current employee to
                ex-employee.
              </p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-danger">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveRatingPopup;
