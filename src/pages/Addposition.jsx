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
  positions: Yup.string().required("Please add at least one Position"),
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

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await addPosition(values).unwrap();
      if (res.message === "Successfully added") {
        toast.success("Successfully added");
        resetForm(); // clear input
        refetch(); // refresh table
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
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
                  />
                  <ErrorMessage
                    name="positions"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-lg-12 col-sm-12 pb-4" style={{ textAlign: "center" }}>
                  <Button
                    className="btn positionSubmit"
                    text="Submit"
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
                />
              )}
      </div>
    </Layout>
  );
};

export default AddPosition;
