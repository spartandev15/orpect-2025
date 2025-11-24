import React, { useEffect, useState } from "react";
import Layout from "../../component/layout";
import { useParams, useNavigate } from "react-router";
import LoadingSpinner from "../../component/LoadingSpinner";
import { useGetEmployeeByIdQuery } from "../../apis/employee";
import { formatDate } from "../../helper/hooks/formatedDate";
import { linkedin, uploadProfile } from "../../asset";
import { IMAGE_BASE_URL_WITH_SLASH } from "../../api/baseUrl";
import { SingleField } from "../../component/SingleField";

const ViewCurrentEmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useGetEmployeeByIdQuery(id);

  useEffect(() => {
    if (isSuccess) {
      setEmployee(data?.employee);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!employee) {
    return (
      <Layout>
        <div className="container-fluid">
          <div className="text-center mt-4">
            <h3>Employee not found</h3>
          </div>
        </div>
      </Layout>
    );
  }

  const renderValue = (value, fallback = "---") => (value ? value : fallback);

  return (
    <>
      <Layout>
        <section className="viewsinglem">
          <div className="container-fluid">
            <div className="row pd-4">
              <div className="col-lg-12 d-flex align-items-center gap-3">
                <span onClick={() => navigate(-1)} className="py-2">
                  <i className="fa fa-arrow-left" style={{ marginRight: "0.5rem",color:"#134d75" }}></i>
                </span>
                <h3 style={{ margin: 0 }}>Employee Details</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-12 pd-4">
                <div className="viewem">
                  <div className="employebox">
                    <div className="profile-pic-wrapper">
                      <div className="product-thumbnail">
                        <img
                          className="pic"
                          src={
                            employee?.profile_image
                              ? `${IMAGE_BASE_URL_WITH_SLASH}${employee.profile_image}`
                              : uploadProfile
                          }
                          alt="profile"
                        />
                      </div>
                    </div>
                    <div className="profileimgboxdetail">
                      <h5 style={{ textTransform: "capitalize" }}>
                        {employee?.emp_name}
                      </h5>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <h6 className="profileimgboxcompanydetail1">
                          {employee?.emp_id}
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <h6 className="profileimgboxcompanydetail1 text-capitalize">
                          {employee?.position}
                        </h6>
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <p
                          className="profileimgboxcompanydetail1"
                          style={{ color: "rgb(95, 125, 149)" }}
                        >
                          Date of Joining
                        </p>
                        <h6 className="profileimgboxcompanydetail1">
                          {formatDate(employee.date_of_joining)}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="viewem pd-4">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <h5 className="infoedit">
                        <i
                          className="fa fa-address-card"
                          style={{ color: "#134d75" }}
                        ></i>{" "}
                        &nbsp; Information
                      </h5>
                    </div>
                    <div className="readonly-form1">
                      <div className="row">
                        <SingleField
                          title="Full Name"
                          answer={employee?.emp_name}
                          style={{ textTransform: "capitalize" }}
                        />
                        <SingleField title="E-Mail" answer={employee?.email} />
                      </div>
                      <div className="row">
                        <SingleField
                          title="Employee ID"
                          answer={employee?.emp_id}
                        />
                        <SingleField
                          title="Date of Joining"
                          answer={formatDate(employee?.date_of_joining)}
                        />
                      </div>
                      <div className="row">
                        <SingleField
                          title="Tax Number"
                          answer={employee?.tax_number || "---"}
                        />
                        <SingleField
                          title="Date of Birth"
                          answer={
                            employee?.date_of_birth
                              ? formatDate(employee?.date_of_birth)
                              : "---"
                          }
                        />
                      </div>
                      <div className="row">
                        <SingleField
                          title="Phone Number"
                          answer={employee?.phone}
                        />
                        <SingleField
                          title="Position"
                          answer={employee?.position}
                        />
                      </div>
                      <div className="row">
                        <SingleField
                          title="Current Salary"
                          answer={employee?.current_salaray || "---"}
                        />
                        <SingleField
                          title="Increment Date"
                          answer={
                            employee?.increment_date
                              ? formatDate(employee?.increment_date)
                              : "---"
                          }
                        />
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <p className="addlabelcard2">LinkedIn</p>
                          <h6 className="profileimgboxcompanydetail2">
                            {employee?.linked_in ? (
                              <a
                                className="socialbtn"
                                href={renderValue(employee?.linked_in)}
                                target="blank"
                                rel="noopener noreferrer"
                              >
                                <img src={linkedin} alt="linkedin" />
                              </a>
                            ) : (
                              "---"
                            )}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="viewem mt-4">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <h5 className="infoedit">
                        <svg height="1em" viewBox="0 0 384 512">
                          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                        </svg>{" "}
                        &nbsp; Address
                      </h5>
                    </div>
                  </div>
                  <div className="readonly-form2">
                    <div className="row">
                      <SingleField
                        title="Address"
                        style={{ textAlign: "right" }}
                        answer={renderValue(employee?.permanent_address)}
                      />
                    </div>
                    <div className="row">
                      <SingleField
                        title="Country"
                        style={{ textTransform: "capitalize" }}
                        answer={renderValue(employee?.country)}
                      />
                      <SingleField
                        title="State"
                        style={{ textTransform: "capitalize" }}
                        answer={renderValue(employee?.state)}
                      />
                    </div>
                    <div className="row">
                      <SingleField
                        title="City"
                        style={{ textTransform: "capitalize" }}
                        answer={renderValue(employee.city)}
                      />
                      <SingleField
                        title="Postal Code"
                        answer={renderValue(employee?.postal_code)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ViewCurrentEmployeeDetails;

