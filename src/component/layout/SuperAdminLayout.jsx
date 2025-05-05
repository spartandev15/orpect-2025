import React, { useEffect, useState } from "react";
import { logoutUserapi } from "../../api/auth";
import {
  fabicon,
  o2,
  uploadProfile,
} from "../../asset/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../helper";
import { setEmpType, setSearchValue } from "../../store/DashboardSlice";
import { toast } from "react-toastify";
import { logout } from "../../api/logout";
import NotificationDropdown from "../extras/Notification/NotificationBell";

const SuperAdminLayout = ({ children }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notification.list);
console.log(notifications)
  const searchValue = useSelector((state) => state?.dashboardData?.searchValue);
  const user = getFromLocalStorage("user");
  const profileImage = getFromLocalStorage("profileImage");
 useEffect(()=>{

 },[user])
  const logoutUser = () => {
    dispatch(logoutUserapi())
      .then((res) => {
        logout();
        toast.success("Logged out successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleSidebarToggle(event) {
    event.preventDefault();

    document.body.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      document.body.classList.contains("sb-sidenav-toggled")
    );
  }
  useEffect(() => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");

    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", handleSidebarToggle);

      return () => {
        sidebarToggle.removeEventListener("click", handleSidebarToggle);
      };
    }
  }, []);

  const handleSearchInputChange = () => {
    dispatch(setEmpType(""));
    navigate("/search-employee");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchInputChange();
    }
  };
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <div className="d-flex" id="wrapper">
        <div z
          className="border-end bg-white mobilesidebar1"
          id="sidebar-wrapper"
        >
          <div className="sidebar-heading border-bottom">
            <Link to="/super-admin/dashboard">
              <img
                src={o2}
                className="logoclass"
                alt="Logo_image"
                height="40"
                width="150"
              />
              <img
                src={fabicon}
                className="logoclass1"
                alt="Logo_image"
                height="40"
                width="40"
              />
            </Link>
          </div>

          <div className="list-group list-group-flush">
            <div className="profile-sec">
              <div className="profile-dtl">
                <Link to="/super-admin/dashboard">
                  {" "}
                  <img
                    src={
                      profileImage
                        ? `https://spartanbots.xyz/borpact/public/${profileImage}`
                        : user && user.image
                          ? `https://spartanbots.xyz/borpact/public/${user.image}`
                          : uploadProfile
                    }
                    alt=""




                  />
                  <p>{user?.company_name}</p>
                </Link>
              </div>
            </div>
            <nav className="sb-sidenav-menu-nested nav  ">
              <ul className="list-unstyled">
                <li>
                  <NavLink
                    exact
                    activeClassName="active"
                    to="/super-admin/user"
                    data-toggle="collapse"
                    data-target="#submenu1"
                  >
                    {" "}
                    <i className="fas fa-users"></i> &nbsp;
                    <span className="iconmenu">
                      {" "}
                      SuperAdmin User &nbsp;
                      <i className="fa fa-caret-down"></i>
                    </span>
                  </NavLink>
                  <ul
                    className="navi nav-list collapse curentemploye1"
                    id="submenu1"
                  >
                    <li className="dropdown-item curentemployepadding curentemploye1">
                      <NavLink
                        activeClassName="active"
                        // className="reviewmenu"
                        to="/super-admin/user"
                      >
                        <i className="fa fa-edit"></i> &nbsp;{" "}
                        <span className="iconmenu">User</span>
                      </NavLink>
                    </li>



                    <li className="dropdown-item logouticon curentemployepadding curentemploye1 curentemploye2">
                      <NavLink
                        activeClassName="active"
                        // className="reviewmenu"
                        to="/super-admin/adduser"
                      >
                        <i className="fa fa-user-plus"></i> &nbsp;{" "}
                        <span className="iconmenu">Add User</span>
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/companies"
                  >
                    <i className="fa fa-list"></i> &nbsp;{" "}
                    <span className="iconmenu">Companies</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/addcompany"
                  >
                    <i className="fa fa-building"></i> &nbsp;{" "}
                    <span className="iconmenu">Add Company</span>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/user"
                  >
                    <i className="fa fa-edit"></i> &nbsp;{" "}
                    <span className="iconmenu">User</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/adduser"
                  >
                    <i className="fa fa-user-plus"></i> &nbsp;{" "}
                    <span className="iconmenu">Add User</span>
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/profile"
                  >
                    <i className="fa fa-user"></i> &nbsp;{" "}
                    <span className="iconmenu">Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/notification-list"
                  >

                    <i className="fa fa-bell"></i> &nbsp;{" "}
                    <span className="iconmenu"> Notification List</span>
                  </NavLink>
                </li>
               
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile View Sidebar */}
        <div className="border-end bg-white mobilesidebar" id="sidebar-wrapper">
          <div className="sidebar-heading border-bottom">
          <Link to="/super-admin/dashboard">
              <img
                src={o2}
                className="logoclass"
                alt="Logo_image"
                height="40"
                width="150"
              />
            </Link>
            <button
              className="btn togglebtn"
              style={{ marginLeft: "2rem", position: "absolute" }}
              onClick={handleSidebarToggle}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "#134d75" }}
              >
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="list-group list-group-flush">
            <div className="profile-sec">
              <div className="profile-dtl">
              <Link to="/super-admin/dashboard">
                  {" "}
                  <img
                    src={
                      profileImage
                        ? `https://spartanbots.xyz/borpact/public/${profileImage}`
                        : user && user.image
                          ? `https://spartanbots.xyz/borpact/public/${user.image}`
                          : uploadProfile
                    }
                    alt=""




                  />
                  <p>{user?.company_name}</p>
                </Link>
              </div>
            </div>
            <nav className="sb-sidenav-menu-nested nav  ">
            <ul className="list-unstyled">
                <li>
                  <NavLink
                    exact
                    activeClassName="active"
                    to="/super-admin/user"
                    data-toggle="collapse"
                    data-target="#submenu1"
                  >
                    {" "}
                    <i className="fas fa-users"></i> &nbsp;
                    <span className="iconmenu">
                      {" "}
                      SuperAdmin User &nbsp;
                      <i className="fa fa-caret-down"></i>
                    </span>
                  </NavLink>
                  <ul
                    className="navi nav-list collapse curentemploye1"
                    id="submenu1"
                  >
                    <li className="dropdown-item curentemployepadding curentemploye1">
                      <NavLink
                        activeClassName="active"
                        // className="reviewmenu"
                        to="/super-admin/user"
                      >
                        <i className="fa fa-edit"></i> &nbsp;{" "}
                        <span className="iconmenu">User</span>
                      </NavLink>
                    </li>



                    <li className="dropdown-item logouticon curentemployepadding curentemploye1 curentemploye2">
                      <NavLink
                        activeClassName="active"
                        // className="reviewmenu"
                        to="/super-admin/adduser"
                      >
                        <i className="fa fa-user-plus"></i> &nbsp;{" "}
                        <span className="iconmenu">Add User</span>
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/companies"
                  >
                    <i className="fa fa-list"></i> &nbsp;{" "}
                    <span className="iconmenu">Companies</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/addcompany"
                  >
                    <i className="fa fa-building"></i> &nbsp;{" "}
                    <span className="iconmenu">Add Company</span>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/user"
                  >
                    <i className="fa fa-edit"></i> &nbsp;{" "}
                    <span className="iconmenu">User</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/adduser"
                  >
                    <i className="fa fa-user-plus"></i> &nbsp;{" "}
                    <span className="iconmenu">Add User</span>
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/profile"
                  >
                    <i className="fa fa-user"></i> &nbsp;{" "}
                    <span className="iconmenu">Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    // className="reviewmenu"
                    to="/super-admin/notification-list"
                  >

                    <i className="fa fa-bell"></i> &nbsp;{" "}
                    <span className="iconmenu"> Notification List</span>
                  </NavLink>
                </li>
              </ul>
              {/* <ul className="list-unstyled">
                <li>
                  <a
                    exact
                    activeClassName="active"
                    href=" "
                    data-toggle="collapse"
                    data-target="#submenu1"
                  >
                    {" "}
                    <i className="fas fa-users"></i> &nbsp;
                    <span className="iconmenu">
                      {" "}
                      Employees &nbsp;
                      <i className="fa fa-caret-down"></i>
                    </span>
                  </a>
                  <ul
                    className="navi nav-list collapse curentemploye1"
                    id="submenu1"
                  >
                    <li className="dropdown-item curentemployepadding curentemploye1">
                      <a href="/employee">
                        <svg height="1em" viewBox="0 0 640 512">
                          <path d="M211.2 96a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM32 256c0 17.7 14.3 32 32 32h85.6c10.1-39.4 38.6-71.5 75.8-86.6c-9.7-6-21.2-9.4-33.4-9.4H96c-35.3 0-64 28.7-64 64zm461.6 32H576c17.7 0 32-14.3 32-32c0-35.3-28.7-64-64-64H448c-11.7 0-22.7 3.1-32.1 8.6c38.1 14.8 67.4 47.3 77.7 87.4zM391.2 226.4c-6.9-1.6-14.2-2.4-21.6-2.4h-96c-8.5 0-16.7 1.1-24.5 3.1c-30.8 8.1-55.6 31.1-66.1 60.9c-3.5 10-5.5 20.8-5.5 32c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32c0-11.2-1.9-22-5.5-32c-10.8-30.7-36.8-54.2-68.9-61.6zM563.2 96a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM321.6 192a80 80 0 1 0 0-160 80 80 0 1 0 0 160zM32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z" /></svg>
                        <span className="iconmenu"> Current Employees</span>
                      </a>
                    </li>
                    <li className="dropdown-item logouticon curentemployepadding curentemploye1 curentemploye2">
                      <a href="/ex-employee">
                        <i className="fa  fa-users-slash"></i>
                        <span className="iconmenu"> Ex Employees</span>
                      </a>{" "}
                    </li>
                  </ul>
                </li>
                <li className="position">
                  <a activeClassName="active" href="/add-position">
                    <svg height="1em" viewBox="0 0 512 512">
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                    </svg>
                    <span className="iconmenu"> &nbsp; Add Position</span>
                  </a>
                </li>
                <li>
                  <a activeClassName="active" href="/add-employee">
                    <i className="fa fa-user-plus"></i> &nbsp;
                    <span className="iconmenu"> Add Employee</span>
                  </a>
                </li>
                <li>
                  <a activeClassName="active" href="/non-joiner">
                    <i className="fa fa-user-slash "></i>&nbsp;
                    <span className="iconmenu">Non Joiners</span>
                  </a>{" "}
                </li>
                <li>
                  <a
                    activeClassName="active"
                    className="reviewmenu"
                    href="/add-review"
                  >
                    <i className="fa fa-edit"></i> &nbsp;{" "}
                    <span className="iconmenu">Add Review</span>
                  </a>
                </li>
                <li>
                  <a activeClassName="active" href="/previous-review">
                    <i className="fa fa-star"></i> &nbsp;
                    <span className="iconmenu"> Previous Reviews</span>
                  </a>
                </li>
                <li>
                  <a activeClassName="active" href="/search-employee">
                    <i className="fa fa-search"></i> &nbsp;
                    <span className="iconmenu"> Search Employees</span>
                  </a>
                </li>

                <li>
                  <a activeClassName="active" href="/upload-csv">
                    <i className="fa fa-upload"></i> &nbsp;{" "}
                    <span className="iconmenu">Upload CSV</span>
                  </a>
                </li>
                <li>
                  <a activeClassName="active" href="/profile">
                    <i className="fa fa-user"></i> &nbsp;{" "}
                    <span className="iconmenu">Profile</span>{" "}
                  </a>
                </li>
                <li className="logouticon">
                  <a onClick={logoutUser}>
                    <svg height="1em" viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                    </svg>
                    &nbsp; <span className="iconmenu">Logout</span>{" "}
                  </a>
                </li>
              </ul> */}
            </nav>{" "}
          </div>
        </div>
        {/* TO here */}

        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light  border-bottom header">
            <div className="container-fluid">
              <button className="btn togglebtn " id="sidebarToggle">
                <i className="fa fa-bars"></i>
              </button>
              {/* <span className="navibar responsiveSearch navibarmobile1">
                <input
                  className="form-control "
                  type="text"
                  aria-label="Search"
                  data-text="Search"
                  placeholder="Search by Employee Name, Phone Number, or Tax Number"
                  value={searchValue}
                  onChange={(e) => dispatch(setSearchValue(e.target.value))}
                  onKeyDown={handleKeyPress}
                />
                <i
                  className="fa fa-search navi-search"
                  style={{ paddingLeft: "2px" }}
                  onClick={handleSearchInputChange}
                ></i>
              </span>*/}
              <span className="navibar  navibarmobile">
                <input
                  className="form-control "
                  type="text"
                  aria-label="Search"
                  data-text="Search"
                  placeholder="Search Employee"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <i
                  className="fa fa-search navi-search"
                  style={{ paddingLeft: "2px" }}
                  onClick={handleSearchInputChange}
                ></i>
              </span>
              <div className="d-flex justify-content-center align-items-center gap-3">

           
              {/* <i class="fa fa-bell" aria-hidden="true"></i> */}
              <NotificationDropdown/>
              <ul className="navbar-nav  user-profile d-md-inline-block">
                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    to="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    style={{ margin: "0" }}
                  >
                    <div className="profile-user">
                      <div className="profile-user-h">
                        <Link>
                          {" "}
                          <img
                            src={
                              profileImage
                                ? `https://spartanbots.xyz/borpact/public/${profileImage}`
                                : user && user.image
                                  ? `https://spartanbots.xyz/borpact/public/${user.image}`
                                  : uploadProfile
                            }
                            alt="profile"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/super-admin/profile">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" onClick={logoutUser}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              </div>
            </div>
          </nav>

          <Outlet />

          <div className=" mt-auto fixed-bottom1">
            <div className="container-fluid bg-white foter">
              <div className="d-flex align-items-center justify-content-between small text-center">
                <div className="text-muted">
                  {" "}
                  <span className="copyright quick-links footer_height">
                    © COPYRIGHT 2023 <a href="/dashboard">ORPECT LLC.</a> All
                    Rights Reserved.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminLayout;
