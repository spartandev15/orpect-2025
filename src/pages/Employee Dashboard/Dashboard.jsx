import React from "react";
import { useState } from "react";
import { user } from "../../asset";
import EmployeeLayout from "../../component/layout/Employelayout";

const EmployeeDashboard = () => {
  const [currentDateTime] = useState(
    new Date().toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );
  return (
    <>
      <EmployeeLayout>
        <section id="employeedashboard">
          <div className="container">
            <div className="row mt-4">
              <div className="col-lg-4 col-md-4 mb-2">
                <div className="user-card shadow-sm flex-fill grow">
                  <div className="user-info ">
                    <div className="user-avatar mb-2">
                      <img
                        src={user}
                        alt="User Avatar"
                        className="img-fluid rounded-circle"
                        width="100"
                      />
                    </div>
                    <div className="user-details">
                      <h4 className="mb-2"> Welcome Maria</h4>
                      <p>{currentDateTime}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 mb-2">
                <div className=" user-card shadow-sm flex-fill grow">
                  <div className="card-info  mb-3">
                    <h4 className="card-title d-inline-block mb-2">
                      Total Review
                    </h4>
                  </div>
                  <div>
                    <p>
                      Overall Reviews :{" "}
                      <span className="commpanysec">
                        {" "}
                        <span className="star-rating">
                          <span className="star filled">
                            <i
                              className="fas fa-star"
                              style={{ color: "#f6a21e" }}
                            ></i>
                          </span>
                          <span className="star filled">
                            <i
                              className="fas fa-star"
                              style={{ color: "#f6a21e" }}
                            ></i>
                          </span>
                          <span className="star filled">
                            <i
                              className="fas fa-star"
                              style={{ color: "#f6a21e" }}
                            ></i>
                          </span>
                          <span className="star ">
                            <i
                              className="fas fa-star-half-alt"
                              style={{ color: "#f6a21e" }}
                            ></i>
                          </span>
                          <span className="star ">
                            <i className="far fa-star"></i>
                          </span>
                        </span>
                      </span>
                    </p>
                    <p>
                      Total Review : <span className="commpanysec"> 20</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 mb-2">
                <div className="user-card shadow-sm flex-fill grow">
                  <div className="card-info  mb-3">
                    <h4 className="card-title  d-inline-block mb-2">
                      Latest Review
                    </h4>
                  </div>
                  <div>
                    <p>
                      This was freelance work :{" "}
                      <div className="commpanysec">
                        <p className="reviewfont">
                          {" "}
                          This was freelance work. I cannot give this a fair
                          rating because I did not work for anyone else. I
                          worked for myself from home. This needs to be better
                          filtered.
                        </p>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6 d-flex">
                <div className="user-card ctm-border-radius shadow-sm grow flex-fill">
                  <div className="card-header">
                    <h4 className="card-title mb-0">
                      Current Company
                      <a className="float-right text-primary1">
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </h4>
                  </div>
                  <div className="bodycard">
                    <div className="row">
                      <div className="col-md-12">
                        <p>
                          Company Nane :{" "}
                          <span className="commpanysec">
                            {" "}
                            ABC Technology Pvt Ltd
                          </span>
                        </p>
                        <p>
                          Registration Number :{" "}
                          <span className="commpanysec">FTGH450070 </span>
                        </p>
                        <p>
                          Company Domain Name :{" "}
                          <span className="commpanysec">
                          https://orpect.com/
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex">
                <div className="user-card ctm-border-radius shadow-sm grow flex-fill">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Company Contact Detail</h4>
                  </div>
                  <div className="bodycard">
                    <div className="row">
                      <div className="col-md-12">
                        <p>
                          Company Phone Number :{" "}
                          <span className="commpanysec"> +91 1236547890</span>
                        </p>
                        <p>
                          Company Email :{" "}
                          <span className="commpanysec">
                            himanshus4210@gmail.com{" "}
                          </span>
                        </p>
                        <p>
                          WebMaster E-Mail :{" "}
                          <span className="commpanysec">
                            himanshus4210@gmail.com{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="company-doc">
                  <div className="user-card  grow">
                    <div className="card-header">
                      <h4 className="card-title d-inline-block mb-0">
                        Documents
                      </h4>
                    </div>
                    <div className="bodycard">
                      <div className="employee-office-table">
                        <div className="table-responsive">
                          <table className="table custom-table">
                            <thead>
                              <tr>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Size</th>
                                <th className="text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-primary">
                                  <i
                                    className="fa fa-file-pdf text-danger"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    aria-hidden="true"
                                    data-original-title="PDF"
                                  ></i>
                                </td>
                                <td>
                                  <a className="text-primary">Offer Latter</a>
                                </td>
                                <td>05 Jan 2023</td>
                                <td>5 MB</td>
                                <td className="text-right text-danger">
                                  <div className="table-action">
                                    <a
                                      className="btn btn-sm btn-outline-danger"
                                      data-toggle="modal"
                                      data-target="#delete"
                                    >
                                      <span className="lnr lnr-trash"></span>{" "}
                                      Delete
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-primary">
                                  <i
                                    className="fa fa-file-pdf text-danger"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    aria-hidden="true"
                                    data-original-title="PDF"
                                  ></i>
                                </td>
                                <td>
                                  <a className="text-primary">
                                    Experience Letter
                                  </a>
                                </td>
                                <td>10 May 2023</td>
                                <td>2 MB</td>
                                <td className="text-right text-danger">
                                  <div className="table-action">
                                    <a
                                      className="btn btn-sm btn-outline-danger"
                                      data-toggle="modal"
                                      data-target="#delete"
                                    >
                                      <span className="lnr lnr-trash"></span>{" "}
                                      Delete
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="user-card shadow-sm flex-fill grow">
                  <div className="card-info  mb-3">
                    <h4 className="card-title  d-inline-block mb-2">
                      Company Employee Review
                    </h4>
                  </div>
                  <div className="bodycard">
                    <p>
                      Total Employee : <span className="commpanysec"> 120</span>
                    </p>
                    <p>
                      Total Reviews : <span className="commpanysec"> 50</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </EmployeeLayout>
    </>
  );
};

export default EmployeeDashboard;
