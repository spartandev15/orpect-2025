import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import { getFromLocalStorage } from "../helper";
import Layout from "../component/layout";
import Button from "../component/Button";
import DownloadCsvExel from "../component/downLoadCsvExel";
import { BASE_URL } from "../api/baseUrl";

const initialValues = {
  csv_file: null,
  image_zip_folder: "",
};

const CsvvalidationSchema = yup.object().shape({
  csv_file: yup.string().required("CSV File is required"),
  // image_zip_folder: yup.string().required("Zip file is required"),
});

const UploadCsv = () => {
  const [loading, setLoading] = useState(false);
  const [csvErrors, setCsvErrors] = useState();

  const bearerToken = getFromLocalStorage("token");
  const { errors, touched, handleSubmit, setFieldValue, values } = useFormik({
    initialValues: initialValues,
    validationSchema: CsvvalidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("csv_file", values.csv_file);
        formData.append("image_zip_folder", values.image_zip_folder);

        const apiUrl = `${BASE_URL}/uploadCSV`;

        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "text/csv",
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        setLoading(false);
        toast.success("Successfully added");
        setCsvErrors(null)
      } catch (error) {
        setLoading(false);
        if (error.response) {
          console.error(
            "Request failed with status code",
            error.response.status
          );

          if (error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
            setCsvErrors(error.response.data.errorList);
          } else {
            toast.error("Some fields are missing. Please check.");
          }
        }
      }
    },
  });


  return (
    <>
      <Layout>
        <div className="container-fluid  csvfile">
          <form noValidate="noValidate" onSubmit={handleSubmit}>
            <div className="row add-employe_csv ">
              <div className="col-lg-12 pb-4">
                <h3>Upload CSV File</h3>
              </div>
              <div className="col-lg-2"></div>
              <div className="col-lg-8 col-sm-12  pb-4">
                <label className="addlabel"> Choose CSV file</label>

                <input
                  type="file"
                  accept=".csv"
                  className="form-control"
                  data-toggle="tooltip"
                  data-bs-placement="top"
                  title="Upload CSV File"
                  name="csv_file"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFieldValue("csv_file", file);
                  }}
                />
                {errors.csv_file && touched.csv_file && (
                  <span className="text-danger msg">{errors.csv_file}</span>
                )}
              </div>
              <div className="col-lg-2"></div>
              <div className="col-lg-2"></div>
              <div className="col-lg-8">
                <label className="addlabel">Choose Zip file for Image</label>
                <input
                  type="file"
                  accept=".zip,.rar"
                  className="form-control"
                  data-toggle="tooltip"
                  data-bs-placement="top"
                  title="Upload CSV File"
                  name="image_zip_folder"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFieldValue("image_zip_folder", file);
                  }}
                />
              </div>
              <div className="col-lg-2"></div>
              <div className="col-lg-2"></div>
              <div
                className="col-lg-8 col-sm-12  pb-4 mt-4"
                style={{ textAlign: "center" }}
              >
                <Button loading={loading} className="btn mybtn" text="Upload" />
                &nbsp; &nbsp;&nbsp;
                <DownloadCsvExel />

              </div>
              <div className="col-lg-2"></div>
            </div>
          </form>

          {csvErrors?.length && (
            <>
              <h1>Error List</h1>
              <table className="table">
                <thead style={{ textAlign: "center" }}>
                  <tr className=" table_h">
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Email</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Error Message</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  {csvErrors?.map((i, index) => (
                    <tr className="clickable-row" key={i?.emp_id}>
                      <td>{index + 1}</td>
                      <td>{i?.email} </td>
                      <td>{i?.emp_name} </td>
                      <td className="text-danger">{i?.message} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          <section className="how_it_work_ul">
            <ul className="csvcheckmobile">
              <h4>Instructions :</h4>
              <li className="csvcheck">
                Order of fields in the CSV file: Please arrange all the fields
                in the following order when creating the CSV file: S.No, Emp Id,
                Emp Name, Email, Phone, Position, Date Of Birth, Tax Number,
                Permanent Address, City, Country, State, Postal Code, Date Of Joining, Date
                Of Leaving, Ex Employee, Non Joiner, Performance Rating,
                Professional Skills Rating, Teamwork Communication Rating,
                Attitude Behaviour Rating, Review, LinkedIn, Last CTC, Image Name.
              </li>
              <li className="csvcheck1">
                {" "}
                Maintaining field order in the CSV file: When creating the CSV
                file, make sure that the above fields, separated by commas
                (","), should be arranged in the exact given order. This order
                is crucial as it ensures consistency and accurate mapping of
                data during the processing stage.
              </li>
              <li className="csvcheck1">
                {" "}
                Some fields are mandatory to have at least some values in the
                CSV file based on the record type:
                <ul>
                  <li>
                    For Current employees: <br />
                    <ul>
                      <li>
                        Mandatory fields: Emp ID, Emp Name, Email, Phone,
                        Position, Date Of Birth, Date Of Joining, Tax Number.
                      </li>
                      <li>Conditions: Ex Employee = 0, Non Joiner = 0.</li>
                    </ul>
                  </li>
                  <li>
                    For Ex employees: <br />
                    <ul>
                      <li>
                        Mandatory fields: Emp ID, Emp Name, Email, Phone,
                        Position, Date Of Birth, Date Of Joining, Tax Number,
                        Performance Rating, Professional Skills Rating, Teamwork
                        Communication Rating, Attitude Behaviour Rating, Review.
                      </li>
                      <li>Conditions: Ex Employee = 1, Non Joiner = 0.</li>
                    </ul>
                  </li>
                  <li>
                    For Non Joiners: <br />
                    <ul>
                      <li>Mandatory fields: Emp Name, Email, Phone, Review.</li>
                      <li>Conditions: Ex Employee = 0, Non Joiner = 1.</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="csvcheck1">
                {" "}
                Ensure column consistency: If a field does not have a value, do
                not remove the corresponding column from the CSV file. Instead,
                include the column with a blank value. This practice maintains
                the consistent structure of the CSV file, even when certain
                fields are empty.
              </li>
              <li className="csvcheck1">
                Image zip file requirement: When selecting the zip file in the
                "Image zip file" input field, ensure it contains a folder with
                all the employee images. Each image within the folder should
                have a unique name. Additionally, make sure that the same image
                name is mentioned in the CSV file for the respective employee.
              </li>
            </ul>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default UploadCsv;
