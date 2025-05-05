import React from 'react' 
import { Link } from 'react-router-dom'
import { o2, user1 } from '../../asset'
import "../../asset/css/EmployeeDashboard.css"
const EmployeeLayout = ({children}) => {
    
  return (
    <>
  
  <header className="navheader">
        <nav className="navbar navbar-expand-lg sticky-top navbar-light navbar-fixed-top">
        <div className="container">
        <button className="navbar-toggler  navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar1" style={{ boxShadow: "none" }}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link className="navbar-brand" to="/dashboard"><img src={o2} alt="logo" width={150} /></Link>

        <div className="collapse navbar-collapse" id="navbar1">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                     
              <li className="nav-item">
              <Link className="nav-link" to="/total-reviews">Reviews</Link>
            </li>
           
            <li className="nav-link navsearch">
              <span className="navbar-nav ml-auto">
                <input className="form-control navsearch1" placeholder=" Search" type="text" />
                <i className="fa fa-search searchicon"></i>
               
              </span>
            </li>
          </ul>

         
        </div>
        <span className="d-flex align-items-center mobileresponsivetab1">  
          <ul className="navbar-nav ms-auto user-profile d-md-inline-block">
            <li className="nav-item dropdown">
              <div className="nav-link" id="navbarDropdown" to="#" role="button" data-toggle="dropdown" aria-expanded="false" style={{ margin: "0" }}>
                <div className="profile-user profile-user-d">
                  <div className="profile-user-h">
                    <a to="">
                      <img src={user1}
                        alt="profile" />
                    </a>
                  </div>
                </div>
              </div>

               <ul className="dropdown-menu dropdown-menu-end profiledropdown" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item mydropdown" to="/profile">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item mydropdown"  >
                    Logout
                  </Link>
                </li>
              </ul>    

            </li>
          </ul>
        </span>
      </div>
        </nav>
      </header>

{children}


     
<footer className=" bg-footer">
        <div className='row'>
        <div className='col-lg-6'>
</div>
<div className='col-lg-6'>
<div className="footer_right">
<span className="copyright quick-links footer_height">© COPYRIGHT 2023 <Link to="/dashboard" style={{color: "rgb(36, 77, 117)", fontWeight: "600"}}>ORPECT LLC.</Link> All Rights Reserved.</span>
</div>
</div>
        </div>


</footer>
    </>
  )
 
}

export default EmployeeLayout