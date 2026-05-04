import React, { useState, useEffect } from "react";

const SaveRatingPopup = ({ isValid, onSubmit, validateForm, setTouched, values }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSaveClick = async (e) => {
    e.preventDefault();
    
    // Validate the form first
    if (validateForm) {
      const validationErrors = await validateForm();
      
      // If there are validation errors, touch all fields to show errors
      if (validationErrors && Object.keys(validationErrors).length > 0) {
        // Touch all fields to display validation errors
        if (setTouched && values) {
          const touchedFields = {};
          Object.keys(values).forEach(key => {
            touchedFields[key] = true;
          });
          setTouched(touchedFields);
        }
        return; // Don't open modal if validation fails
      }
      
      // If there are no validation errors, open the modal
      setModalOpen(true);
    } else if (isValid) {
      // Fallback to isValid check if validateForm is not provided
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
      setModalOpen(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("modal")) {
        handleCloseModal();
      }
    };

    if (modalOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [modalOpen]);

  return (
    <>
      <button
        type="button"
        onClick={handleSaveClick}
        id="saveButton3"
        className="btn infoedit3"
      >
        Save
      </button>

      {modalOpen && (
        <div
          id="myreview"
          className="modal show"
          tabIndex="-1"
          role="dialog"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-header flex-column">
                <h4 className="modal-title w-100">Are you sure?</h4>
                <button
                  type="button"
                  className="close closebtn"
                  onClick={handleCloseModal}
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
                  className="btn" 
                  style={{ backgroundColor: "#134d75", color: "#fff" }}
                  onClick={handleModalSubmit}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveRatingPopup;
