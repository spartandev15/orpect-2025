import React from "react"; 
import "../../asset/css/notFound.css"
import { Link } from "react-router-dom";
import { error } from "../../asset";

const ErrorPage404 = () => {



  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="errorpage">
                <img src={error} alt="" className="img-fluid" height={400} width={700} />
                <div className="errorpagetext">
                  <h3>Sorry! Page can't be found</h3>
                  <p>The page you are looking for was moved, removed, renamed, or never existed.</p>
                  <div>
                    <Link to="/">
                      <button className="btn mybtn">Back to Home</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage404;
