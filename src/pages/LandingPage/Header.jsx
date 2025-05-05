import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { o2, user1 } from '../../asset'
 

const Header = () => {
  return (
    <>
    
    <header className="navheader">
        <nav className="navbar navbar-expand-lg sticky-top navbar-light navbar-fixed-top">
          <div className="container">

            <Link className="navbar-brand logobar" to="/"  > <img src={o2} alt="" width={150} /></Link>

            {/* For Mobile Responisve User login icon */}
            <ul className="navbar-nav navlink navlinkmobile" id="navmenu">
              <li className="nav-item dropdown userdropdown">
                <div className="nav-link dropdownicon" id="navbarDropdown" to="#" role="button" data-toggle="dropdown" aria-expanded="false"  >
              
                 
                 <img src={user1} className="droplogin" height={30} width={30} />
             
                </div>
                <ul className="dropdown-menu dropdown-menu-end droplogin1" aria-labelledby="navbarDropdown">
                    <li>   <Link className="dropdown-item droplogin1a" to="/signup"><svg height="1em" viewBox="0 0 512 512" className="signupsvg">
<path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg> &nbsp;&nbsp;Sign Up </Link></li>
                    <li>   <Link className="dropdown-item droplogin1a" to="/login"> <svg height="1em" viewBox="0 0 512 512" className="signupsvg">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>&nbsp;&nbsp;Login </Link></li>
                  </ul></li></ul>

                    {/* to here*/}
            <button className="navbar-toggler navbar-toggler-right  " type="button" data-toggle="collapse" data-target="#navbar1" style={{ padding: "15px", marginTop: "10px", boxShadow: "none" }}>
              <span></span>
              <span></span>
              <span></span>

            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbar1" style={{ backgroundColor: "white" }}>
              <ul className="navbar-nav navlink" id="navmenu">
                <li className="nav-item  ">
                  <NavLink className="nav-link" activeclassname="active" to="/">Home</NavLink>
                </li>
                {/* <li className="nav-item">
                <NavLink className="nav-link" to="/about-us">About Us</NavLink>
                </li> */}
                {/* <li className="nav-item">
                <NavLink className="nav-link" to="/faqs">FAQs</NavLink>
                </li> */}
                <li className="nav-item">
                <NavLink className="nav-link" to="/contact-us">Contact Us</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/blog">Blog</NavLink>
                </li>
                <li className="jorpectbtn">
                <NavLink to="/join-orpect-plus"><button className="btn menbtn">Join ORPECT +</button></NavLink>
                </li>

                <li className="nav-item dropdown userdropdown navlinkmobile1">
  <div className="nav-link dropdownicon" id="navbarDropdown" to="#" role="button" data-toggle="dropdown" aria-expanded="false">
    <img src={user1} className="droplogin" height={30} width={30} />
  </div>
  <ul className="dropdown-menu dropdown-menu-end droplogin1" aria-labelledby="navbarDropdown">
    <li>
      <Link className="dropdown-item droplogin1a"  to="/signup">
        <svg height="1em" viewBox="0 0 512 512" className="signupsvg">
          <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
        </svg>&nbsp;&nbsp;Sign Up
      </Link>
      {/* <ul className="submenu">
        <li>
          <Link className="dropdown-item droplogin1a" to="/signup">
            Sign Up Company
          </Link>
        </li>
        <li>
          <Link className="dropdown-item droplogin1a">
            Sign Up Employee
          </Link>
        </li>
      </ul> */}
    </li>
    <li>
      <Link className="dropdown-item droplogin1a" to="/login">
        <svg height="1em" viewBox="0 0 512 512" className="signupsvg">
          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
        </svg>&nbsp;&nbsp;Login
      </Link>
    </li>
  </ul>
</li>

              </ul>
            </div>

          </div>
        </nav>
      </header>
    </>

  )
}

export default Header