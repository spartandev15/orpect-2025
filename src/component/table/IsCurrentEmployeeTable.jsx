 import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getFromLocalStorage } from "../../helper";
import axios from "axios";
import { Link } from "react-router-dom";
import { linkedin, uploadProfile } from "../../asset";
import { BASE_URL } from "../../api/baseUrl";

const IsCurrentEmployeeTable = () => {
  const [Currentemployees, setCurrentEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = getFromLocalStorage("token"); // Replace with your actual authorization token
 
  const userDetal = getFromLocalStorage("user");

  const searchValue = useSelector((state) => state?.dashboardData?.searchValue);
  useEffect(() => {
    const fetchCurrentEmployee = async () => {
      setLoading(true);
      if (searchValue) {
        try {
          const headers = { Authorization: `Bearer ${token}` };

          const response = await axios.get(
            `${BASE_URL}/getCurrentEmployees?searchText=${searchValue}`,
            {
              headers: headers,
            }
          );
          const data = response.data;
          setCurrentEmployees(data?.currentEmployees?.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    };
    fetchCurrentEmployee();
  }, [searchValue]);

  const formatDate = (dateString) => {
    const dateParts = dateString.split("T")[0].split("-");
    if (dateParts.length === 3) {
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];
      return `${day}-${month}-${year}`;
    }
    return "Invalid Date";
  };

  return (
    <>
      {!Currentemployees.length ? null : (
        <div className="row" style={{ marginBottom: "1.5rem" }}>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="table-responsive">
              <h6>
                {" "}
                {Currentemployees?.length < 2 ? (
                  <>
                    {Currentemployees?.length} employee is working as your{" "}
                    <span
                      style={{fontSize:"20px", color:"#f6a21e" }}
                    >
                      Current Employee
                    </span>
                  </>
                ) : (
                  <>
                    {Currentemployees?.length} employees are working as your{" "}
                    <span
                      style={{ textDecoration: "underline", fontWeight: "700" }}
                    >
                      Current Employees
                    </span>
                  </>
                )}
              </h6>

              {Currentemployees?.map((i, index) => (
                <div className="searchemployesection mt-4 pb-3" key={index}>
                  <div className="row companylogosreachtop">
                    <div className="col-lg-6 col-md-12">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="product-thumbnail">
                            <img
                              className="pic"
                              src={
                                i?.profile_image
                                  ? `https://spartanbots.xyz/opt_lv/${i.profile_image}`
                                  : uploadProfile
                              }
                              alt="profile"
                            />
                          </div>
                          <div className="currentemployename"
                        
                      >
                          <div className="seller_name text-capitalize">
                            <span > <p>{i?.emp_name} </p></span>
                          </div>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div
                            className="companyreview "
                            style={{ fontSize: "18px" }}
                          >
                            <span>
                              <b>Employee Information</b>
                            </span>
                            <div className="search_mail">{i?.email}</div>
                            <div className="search_mail">{i?.phone}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-8 col-sm-12  currentemployereview">
                   
                      <div
                        className="companyreview"
                        style={{ fontSize: "18px" }}
                      >
                        <span>
                          <b>Profile Added by - </b>
                        </span>
                        <span>
                          {userDetal.company_name}
                        </span>
                      </div>
                      <div className="search_mail">
                        Added on - {formatDate(i?.created_at)}
                        {/* {i?.created_at} */}
                        {/* {formatDate(i?.created_at)} */}
                      </div>
                      {i?.linked_in && (
                        <div
                          className="linkedinicon"
                          style={{ width: "70%", marginTop: "0.5rem" }}
                        >
                          <img src={linkedin} alt="linkedin" />
                        </div>
                      )}
                    </div>
                        <div className="mt-4" style={{ textAlign: "center" }}>
                      <Link to={`/view-employee/${i?.sid}`}>
                        <button className="btn mybtn"> View Employee</button>
                      </Link>
                   
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IsCurrentEmployeeTable;
