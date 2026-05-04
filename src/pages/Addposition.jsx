import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Layout from "../component/layout";
import Button from "../component/Button";
import LoadingSpinner from "../component/LoadingSpinner";
import DeletePosition from "../component/delete/DeletePosition";
import EditPosition from "../component/delete/EditPosition";

import { useAddPositionMutation, useGetPositionsQuery } from "../apis/postion";
import Pagination from "../component/Pagination";

const validationSchema = Yup.object().shape({
  positions: Yup.string()
    .required("Please add at least one Position")
    .test(
      "not-empty-after-trim",
      "Position cannot be empty or only whitespace",
      (value) => value && value.trim().length > 0
    )
    .test(
      "valid-positions",
      "Please enter valid position(s). Each position should be at least 2 characters long.",
      (value) => {
        if (!value || !value.trim()) return false;
        
        // Split by comma and validate each position
        const positions = value
          .split(",")
          .map((pos) => pos.trim())
          .filter((pos) => pos.length > 0);
        
        // Check if at least one valid position exists
        if (positions.length === 0) return false;
        
        // Check each position has minimum length
        const invalidPositions = positions.filter((pos) => pos.length < 2);
        if (invalidPositions.length > 0) return false;
        
        // Check maximum length for each position (e.g., 100 characters)
        const tooLongPositions = positions.filter((pos) => pos.length > 100);
        if (tooLongPositions.length > 0) return false;
        
        return true;
      }
    )
    .test(
      "no-consecutive-commas",
      "Invalid format: Multiple consecutive commas are not allowed",
      (value) => {
        if (!value) return true;
        return !/,,+/.test(value);
      }
    )
    .test(
      "max-total-length",
      "Total input length cannot exceed 500 characters",
      (value) => {
        if (!value) return true;
        return value.length <= 500;
      }
    ),
});

const AddPosition = () => {
   const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [position, setPosition] = useState("paginate");
  const {
    data,
    isLoading: getLoading,
    refetch,
  } = useGetPositionsQuery({ 
    page: currentPage,
    searchText,
    position
  });
  const [addPosition, { isLoading: isAddLoading }] = useAddPositionMutation();

  const handleSubmit = async (values, { resetForm, setFieldError }) => {
    try {
      // Clean and validate the input data
      const cleanedPositions = values.positions
        .split(",")
        .map((pos) => pos.trim())
        .filter((pos) => pos.length >= 2 && pos.length <= 100); // Filter valid positions

      // Check if we have at least one valid position after cleaning
      if (cleanedPositions.length === 0) {
        setFieldError("positions", "Please enter at least one valid position (minimum 2 characters)");
        return;
      }

      // Prepare clean data for API
      const cleanedData = {
        positions: cleanedPositions.join(", "), // Join with comma and space for better readability
      };

      // Send cleaned data to API
      const res = await addPosition(cleanedData).unwrap();
      if (res?.status === "error") {
        toast.error(res?.message || "Failed to add position");
      } else if (res?.message && res?.status) {
        toast.success(res?.message);
        resetForm(); // clear input
        setCurrentPage(1); // Reset to first page to see newly added position
        await refetch(); // refresh table
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message || "An error occurred";
      toast.error(errorMessage);
      console.error("Add position error:", error);
    }
  };
  const totalPages = data?.positions?.last_page || 1;
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };
  return (
    <Layout>
      <div className="container-fluid addposition">
        <div className="row">
          <div className="col-lg-12">
            <h3>Add Positions</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2 pd-4"></div>

          <div className="col-lg-8 col-md-12 col-sm-12 pd-4">
            <Formik
              initialValues={{ positions: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="pb-4" style={{ margin: "auto" }}>
                  <h5>
                    Add single or multiple positions, using a comma to separate them
                  </h5>
                  <Field
                    type="text"
                    name="positions"
                    className="form-control"
                    placeholder="(eg:- Backend Developer, Frontend Developer)"
                    maxLength={500}
                  />
                  <small className="text-muted d-block mt-1">
                    Each position must be 2-100 characters. Maximum 500 characters total.
                  </small>
                  <ErrorMessage
                    name="positions"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="col-lg-12 col-sm-12 pb-4" style={{ textAlign: "center" }}>
                  <Button
                    className="btn positionSubmit"
                    text="Add"
                    loading={isAddLoading}
                  />
                </div>
              </Form>
            </Formik>
          </div>

          <div className="col-lg-2"></div>
        </div>

        {/* POSITION TABLE */}
        <div className="table-responsive-sm mt-4 table_width">
          {getLoading ? (
            <LoadingSpinner />
          ) : (
            <table className="table positiontable">
              <thead style={{ textAlign: "center" }}>
                <tr className="table_h">
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Position</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {!data?.positions?.data?.length ? (
                  <tr>
                    <td colSpan={3}>No Data Found</td>
                  </tr>
                ) : (
                  data?.positions?.data?.map((position, index) =>{
                    const serialNumber = 10 * (currentPage-1) + index + 1
                    return      <tr className="table_data_background" key={position.id}>
                    <td>{serialNumber || '-'}</td>
                    <td>{position.position}</td>
                    <td>
                      <EditPosition
                        positionId={position.id}
                        oldPosition={position.position}
                      />
                      &nbsp;&nbsp;
                      <DeletePosition
                        position={position.position}
                        id={position.id}
                      />
                    </td>
                  </tr>
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
          {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                />
              )}
      </div>
    </Layout>
  );
};

export default AddPosition;
