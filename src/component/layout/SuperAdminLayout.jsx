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
import { Navigate } from "react-router-dom";
import { ADMIN_ROUTES, COMPANY_ROUTES } from "../../config/routes.config";
import { IMAGE_BASE_URL_WITH_SLASH } from "../../api/baseUrl";

// Routes configuration array
const sidebarRoutes = [
  {
    id: "submenu1",
    type: "submenu",
    label: "SuperAdmin User",
    icon: "fas fa-users",
    submenu: [
      {
        path: "/super-admin/user",
        label: "User",
        icon: "fa fa-edit",
      },
      {
        path: "/super-admin/adduser",
        label: "Add User",
        icon: "fa fa-user-plus",
        className: "logouticon curentemploye2",
      },
    ],
  },
  {
    id: "submenu2",
    type: "submenu",
    label: "Company",
    icon: "fa fa-building",
    submenu: [

      {
        path: "/super-admin/addcompany",
        label: "Add Company",
        icon: "fa fa-plus",
        className: "logouticon curentemploye2",
      },
      {
        path: "/super-admin/companies",
        label: "Company List",
        icon: "fa fa-list",
      },
      
    ],
  },
 
  {
    type: "link",
    path: "/super-admin/notification-list",
    label: "Notification List",
    icon: "fa fa-bell",
  },
  {
    type: "link",
    path: "/super-admin/data-request",
    label: "Data Request",
    icon: "fa fa-book",
  },
  {
    type: "link",
    path: "/super-admin/profile",
    label: "Profile",
    icon: "fa fa-user",
  },
];

const SuperAdminLayout = ({ children }) => {
  const [search, setSearch] = useState("");
  const [openSubmenus, setOpenSubmenus] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notification.list);
console.log(notifications)
  const searchValue = useSelector((state) => state?.dashboardData?.searchValue);
  const user = getFromLocalStorage("user");
  const profileImage = getFromLocalStorage("profileImage");
  const location = useLocation();

  // Check for super admin authentication - additional layer of protection
  const superAdminToken = getFromLocalStorage("superAdmintoken");
  const regularToken = getFromLocalStorage("token");
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  

  // Check if current route matches submenu items and open submenu accordingly
  useEffect(() => {
    const path = location.pathname;
    sidebarRoutes.forEach((route) => {
      if (route.type === "submenu" && route.submenu) {
        const hasActiveChild = route.submenu.some(
          (subItem) => subItem.path === path
        );
        if (hasActiveChild) {
          setOpenSubmenus((prev) => ({ ...prev, [route.id]: true }));
        }
      }
    });
  }, [location.pathname]);

  
  const logoutUser = () => {
    dispatch(logoutUserapi())
      .then((res) => {
        logout(true); // Pass true to indicate admin logout
        // toast.success("Logged out successfully");
      })
      .catch((err) => {
        // Even if API call fails, still logout locally
        logout(true);
        // toast.success("Logged out successfully");
      });
  };

function handleSidebarToggle(event) {
  event.preventDefault();

  const toggled = !isSidebarCollapsed;

  setIsSidebarCollapsed(toggled);

  document.body.classList.toggle(
    "sb-sidenav-toggled",
    toggled
  );

  localStorage.setItem(
    "sb|sidebar-toggle",
    toggled
  );
}

useEffect(() => {
  const savedSidebarState =
    localStorage.getItem("sb|sidebar-toggle") === "true";

  setIsSidebarCollapsed(savedSidebarState);

  if (savedSidebarState) {
    document.body.classList.add("sb-sidenav-toggled");
  } else {
    document.body.classList.remove("sb-sidenav-toggled");
  }

  const sidebarToggle =
    document.body.querySelector("#sidebarToggle");

  if (sidebarToggle) {
    sidebarToggle.addEventListener(
      "click",
      handleSidebarToggle
    );

    return () => {
      sidebarToggle.removeEventListener(
        "click",
        handleSidebarToggle
      );
    };
  }
}, [isSidebarCollapsed]);
  useEffect(()=>{

  },[])
  const handleSearchInputChange = () => {
    dispatch(setEmpType(""));
    navigate("/search-employee");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchInputChange();
    }
  };

  const toggleSubmenu = (submenuId, e) => {
    e.preventDefault();
    setOpenSubmenus(prev => ({
      ...prev,
      [submenuId]: !prev[submenuId]
    }));
  };

  // Helper function to check if a submenu has active child
  const isSubmenuActive = (route) => {
    if (route.type === "submenu" && route.submenu) {
      return route.submenu.some((subItem) => subItem.path === location.pathname);
    }
    return false;
  };

  // Render menu items
  const renderMenuItem = (route, isMobile = false) => {
    if (route.type === "submenu") {
      const isActive = isSubmenuActive(route);
      const isOpen = openSubmenus[route.id] || false;
      
      return (
        <li key={route.id}>
          <a
            href="#"
            onClick={(e) => toggleSubmenu(route.id, e)}
            className={isActive ? "active" : ""}
          >
            <i className={route.icon}></i> &nbsp;
            <span className="iconmenu">
              {route.label} &nbsp;
              <i
                className="fa fa-caret-down"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  display: "inline-block",
                }}
              ></i>
            </span>
          </a>
          <ul
            className={`navi nav-list curentemploye1 ${isOpen ? "show" : "collapse"}`}
            id={route.id}
            style={{
              display: isOpen ? "block" : "none",
            }}
          >
            {route.submenu.map((subItem, index) => (
              <li
                key={index}
                className={`dropdown-item curentemployepadding curentemploye1 ${
                  subItem.className || ""
                }`}
              >
                {isMobile ? (
                  <span onClick={handleSidebarToggle}>
                    <NavLink activeClassName="active" to={subItem.path}>
                      <i className={subItem.icon}></i> &nbsp;
                      <span className="iconmenu">{subItem.label}</span>
                    </NavLink>
                  </span>
                ) : (
                  <NavLink activeClassName="active" to={subItem.path}>
                    <i className={subItem.icon}></i> &nbsp;
                    <span className="iconmenu">{subItem.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </li>
      );
    } else {
      return (
        <li key={route.path}>
          {isMobile ? (
            <span onClick={handleSidebarToggle}>
              <NavLink activeClassName="active" to={route.path}>
                <i className={route.icon}></i> &nbsp;
                <span className="iconmenu">{route.label}</span>
              </NavLink>
            </span>
          ) : (
            <NavLink activeClassName="active" to={route.path}>
              <i className={route.icon}></i> &nbsp;
              <span className="iconmenu">{route.label}</span>
            </NavLink>
          )}
        </li>
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

// If user only has regular token (not admin), redirect to dashboard
if (regularToken && !superAdminToken) {
  return <Navigate to={COMPANY_ROUTES.DASHBOARD} replace />;
}

// If no admin token at all, redirect to admin login
if (!superAdminToken) {
  return <Navigate to={ADMIN_ROUTES.LOGIN} replace />;
}
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
                  {/* <img
                    src={
                      profileImage
                        ? `${IMAGE_BASE_URL_WITH_SLASH}${profileImage}`
                        : user && user.image
                          ? `${IMAGE_BASE_URL_WITH_SLASH}${user.image}`
                          : uploadProfile
                    }
                    alt=""
                  /> */}
                   {profileImage ||  user?.image ?<img
                                      src={
                                        profileImage
                                          ? `${IMAGE_BASE_URL_WITH_SLASH}${profileImage}`
                                          : user && user?.image
                                          ? `${IMAGE_BASE_URL_WITH_SLASH}${user?.image}`
                                          : uploadProfile
                                      }
                                      alt=""
                                    />:
                     <div className={isSidebarCollapsed ? "firstLetterPicSmall":"firstLetterPic"}>
                    {user?.fullname?.charAt(0)?.toUpperCase()}
                  </div>}
                  <p>{user?.fullname}</p>
                </Link>
              </div>
            </div>
            <nav className="sb-sidenav-menu-nested nav  ">
              <ul className="list-unstyled">
                {sidebarRoutes.map((route) => renderMenuItem(route, false))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile View Sidebar */}
        <div className="border-end bg-white mobilesidebar" id="sidebar-wrapper">
          <div className="sidebar-heading border-bottom">
          <span  onClick={handleSidebarToggle}>

          <Link to="/super-admin/dashboard">
              <img
                src={o2}
                className="logoclass"
                alt="Logo_image"
                height="40"
                width="150"
              />
            </Link></span>
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
              <span  onClick={handleSidebarToggle}>

              <Link to="/super-admin/dashboard">
                  {" "}
                  <img
                    src={
                      profileImage
                        ? `${IMAGE_BASE_URL_WITH_SLASH}${profileImage}`
                        : user && user.image
                          ? `${IMAGE_BASE_URL_WITH_SLASH}${user.image}`
                          : uploadProfile
                    }
                    alt=""




                  />
                  <p>{user?.company_name}</p>
                </Link></span>
              </div>
            </div>
            <nav className="sb-sidenav-menu-nested nav  ">
              <ul className="list-unstyled">
                {sidebarRoutes.map((route) => renderMenuItem(route, true))}
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
                        {
                                                   profileImage ||  user?.image ? <img
                                                   src={
                                                     profileImage
                                                       ? `${IMAGE_BASE_URL_WITH_SLASH}${profileImage}`
                                                       : user && user.image
                                                       ? `${IMAGE_BASE_URL_WITH_SLASH}${user.image}`
                                                       : uploadProfile
                                                   }
                                                   alt="profile"
                                                 />:
                                                                <div className="firstLetterPicSmall">
                         {user?.fullname?.charAt(0)?.toUpperCase()}
                         
                       </div>
                                                 }
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
                    © COPYRIGHT 2026 <a href="/dashboard">ORPECT LLC.</a> All
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
