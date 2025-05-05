import React from 'react' 
import { Link } from 'react-router-dom'
import EmployeeLayout from '../../component/layout/Employelayout'

const TotalReview = () => {
    return (
        <>
            <EmployeeLayout>
<section id="employeedashboard" >
                     <div className="container">
                         <div className="row">
                  <div className="col-lg-12">
                  <h3>Review List</h3>
                  </div>             
                  </div>
                  <div className="row mt-4">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div id="table-scroll" className="table-scroll">
            <table id="main-table" className="main-table table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky-column-1 column-1"
                    style={{ background: "#e1e9ed" }}
                  >
                    Sr. No.
                  </th>
                  <th
                    scope="col"
                    className="sticky-column-2"
                    style={{ background: "#e1e9ed" }}
                  >
                  Company  Name{" "}
                  </th>
                  <th
                    scope="col"
                    className="sticky-column-3"
                    style={{ background: "#e1e9ed" }}
                  >
                   Company Email
                  </th>
                  <th scope="col" style={{ background: "#e1e9ed" }}>
                    Phone Number
                  </th>
                  <th scope="col" style={{ background: "#e1e9ed" }}>
                    Domain Name
                  </th>
                  <th scope="col" style={{ background: "#e1e9ed" }}>
                   Review
                  </th> 
                  <th
                    scope="col"
                    className="sticky-column-last"
                    style={{ background: "#e1e9ed" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody> 
                    <tr   className="table_data_background">
                      {/* <td className="sticky-column-1">{index + 1}</td> */}
                      <td className="sticky-column-1 column-1"> 1</td>
                      <td className="sticky-column-2 ">ABC Technology </td>
                      <td className="sticky-column-3"> himanshu@spartanbots.com</td>
                      <td> 7896541230</td>
                      <td> spartanbots.com</td>
                      <td>
                        <span className="commpanysec">  <span className="star-rating">
                      <span className="star filled"><i className="fas fa-star" style={{ color: "#f6a21e" }} ></i>
                      </span><span className="star filled"><i className="fas fa-star" style={{ color: "#f6a21e" }}  ></i>
                      </span><span className="star filled"><i className="fas fa-star" style={{ color: "#f6a21e" }} ></i>
                      </span><span className="star "><i className="fas fa-star-half-alt" style={{ color: "#f6a21e" }} ></i>
                      </span><span className="star "><i className="far fa-star" ></i></span></span></span>
                         </td>
                      <td className="sticky-column-last">
                      <div className="align-self-center">
                          <div className="dropdown">
                            <button   className="btn"    type="button"      id="tabledropdown"    data-toggle="dropdown"  aria-expanded="false"  >
                            <i className="fa fa-ellipsis-h"></i>
                            </button>
                            <ul className="dropdown-menu downnav1" aria-labelledby="tabledropdown">
                              <li><Link className="dropdown-item dropdwoncolor" to="/company-detail" ><i className="fas fa-pencil-alt text-brand  "></i> &nbsp;View</Link></li>
                             
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr   className="table_data_background">
                      {/* <td className="sticky-column-1">{index + 1}</td> */}
                      <td className="sticky-column-1 column-1"> 2</td>
                      <td className="sticky-column-2 ">ABC Technology </td>
                      <td className="sticky-column-3"> himanshu@spartanbots.com</td>
                      <td> 7896541230</td>
                      <td> spartanbots.com</td>
                      <td>
                        <span className="commpanysec">  <span className="star-rating">
                      <span className="star filled"><i className="fas fa-star" style={{ color: "#f6a21e" }} ></i>
                      </span><span className="star filled"><i className="fas fa-star" style={{ color: "#f6a21e" }}  ></i>
                      </span><span className="star filled"><i className="fas fa-star" style={{ color: "#f6a21e" }} ></i>
                      </span><span className="star "><i className="fas fa-star-half-alt" style={{ color: "#f6a21e" }} ></i>
                      </span><span className="star "><i className="far fa-star" ></i></span></span></span>
                         </td>
                      <td className="sticky-column-last">
                      <div className="align-self-center">
                          <div className="dropdown">
                            <button   className="btn"    type="button"      id="tabledropdown"    data-toggle="dropdown"  aria-expanded="false"  >
                            <i className="fa fa-ellipsis-h"></i>
                            </button>
                            <ul className="dropdown-menu downnav1" aria-labelledby="tabledropdown">
                              <li><Link className="dropdown-item dropdwoncolor" to="/company-detail"  ><i className="fas fa-pencil-alt text-brand  "></i> &nbsp;View</Link></li>
                             
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr   className="table_data_background">
                      {/* <td className="sticky-column-1">{index + 1}</td> */}
                      <td className="sticky-column-1 column-1"> 3</td>
                      <td className="sticky-column-2 ">ABC Technology </td>
                      <td className="sticky-column-3"> himanshu@spartanbots.com</td>
                      <td> 7896541230</td>
                      <td> spartanbots.com</td>
                      <td>
                        <span className="commpanysec">  <span className="star-rating">
                      <span className="star filled"><i className="fas fa-star" style={{ color: "#f6a21e" }} ></i>
                      </span><span className="star filled"><i className="fas fa-star" style={{ color: "#f6a21e" }}  ></i>
                      </span><span className="star filled"><i className="fas fa-star" style={{ color: "#f6a21e" }} ></i>
                      </span><span className="star "><i className="fas fa-star-half-alt" style={{ color: "#f6a21e" }} ></i>
                      </span><span className="star "><i className="far fa-star" ></i></span></span></span>
                         </td>
                      <td className="sticky-column-last">
                      <div className="align-self-center">
                          <div className="dropdown">
                            <button   className="btn" type="button" id="tabledropdown"  data-toggle="dropdown"  aria-expanded="false"  >
                            <i className="fa fa-ellipsis-h"></i>
                            </button>
                            <ul className="dropdown-menu downnav1" aria-labelledby="tabledropdown">
                              <li><Link className="dropdown-item dropdwoncolor" to="/company-detail"  ><i className="fas fa-pencil-alt text-brand  "></i> &nbsp;View</Link></li>
                             
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                 
              </tbody>
            </table>
          </div>
        </div>
      </div>
          
        </div>
        </section>

            </EmployeeLayout>
        </>


    )
}

export default TotalReview