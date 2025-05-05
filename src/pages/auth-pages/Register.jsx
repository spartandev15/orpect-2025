import React, { createContext, useState } from "react";
import Step from "../../component/SignupProcess/Step";
import { Link } from "react-router-dom";
import LayoutOrpect from "../LandingPage/Index";

export const FormContext = createContext();

const RegisterWrapper = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState({});

  return (
    <>
      <FormContext.Provider
        value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
      >
        <LayoutOrpect>
          <section className="signuppage">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 contact_form11 ">
                  <div className="signupform2">
                    <h5>Welcome to ORPECT!</h5>
                    <p>If you already have an account. </p>
                    <Link to="/login">
                      <button
                        className="btn signupbtn"
                        style={{ width: "100%" }}
                      >
                        Sign In
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-8 contact_form12 ">
                  <Step />
                </div>
              </div>
            </div>
          </section>
        </LayoutOrpect>
      </FormContext.Provider>
    </>
  );
};

export default RegisterWrapper;
