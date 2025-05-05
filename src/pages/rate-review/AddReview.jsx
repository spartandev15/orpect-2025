import React from "react";
import { exemploye, nonjoin } from "../../asset";

import Layout from "../../component/layout";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../../helper";

const AddReview = () => {
  const user = getFromLocalStorage("user");

  return (
    <>
      <Layout>
        <section className="addreview">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 c_name reviewpagefont">
                <h3>Hi {user?.company_name} </h3>
                <h4 className="mt-3">What would you like to do today?</h4>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-lg-2 col-md-2"></div>
              <div className="col-lg-4 col-md-4 col-sm-12 pd-4">
                <div className="card  addcard">
                  <Link to="/add-exemployee-review" className="reviewtxt">
                    <img
                      src={exemploye}
                      className="card1 img-fluid"
                      alt=""
                      height="250px"
                    />
                    <div className="os-inner-col">
                      <h4 className="blue-violet">Review Ex Employee </h4>
                      <p className="addcardright" style={{ margin: "0" }}>
                        <i
                          className="fa fa-arrow-right"
                          style={{ color: "#134d75" }}
                        ></i>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 pd-4 addcardright">
                <Link to="/add-nonjoiner-review" className="reviewtxt">
                  <div className="card  addcard">
                    <img
                      src={nonjoin}
                      className="card1 img-fluid"
                      alt=""
                      height="250px"
                    />
                    <div className="os-inner-col">
                      <h4 className="blue-violet"> Review Non Joiner</h4>
                      <p className="addcardright" style={{ margin: "0" }}>
                        <i
                          className="fa fa-arrow-right"
                          style={{ color: "#134d75" }}
                        ></i>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-2 col-md-2"></div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AddReview;
