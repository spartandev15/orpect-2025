import React, { useEffect, useState } from "react";
import { logoutUserapi } from "../../api/auth";
import {
  fabicon,
  o2,
  uploadProfile,
} from "../../asset/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../helper";
import { setEmpType, setSearchValue } from "../../store/DashboardSlice";
import { toast } from "react-toastify";
import { logout } from "../../api/logout";
import { IMAGE_BASE_URL_WITH_SLASH } from "../../api/baseUrl";

// Routes configuration array for company sidebar


const Layout = ({ children }) => {
  const [search, setSearch] = useState("");
  const [openSubmenus, setOpenSubmenus] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchValue = useSelector((state) => state?.dashboardData?.searchValue);
  const user = getFromLocalStorage("user");
  console.log(user?.is_company_user)
  const isUser = user?.is_company_user === "user" ? false : true
const sidebarRoutes = [
  {
    id: "submenu1",
    type: "submenu",
    label: "Employees",
    icon: "fas fa-users",
    submenu: [
      {
        path: "/employee",
        label: "Current Employees",
        icon: "fa fa-users",
        useSvg: true,
        svgPath: "M211.2 96a64 64 0 1 0 -128 0...",
      },
      {
        path: "/ex-employee",
        label: "Ex Employees",
        icon: "fa fa-users-slash",
        className: "logouticon curentemploye2",
      },
    ],
  },

  // Show only when is_company_user is false
  isUser && {
    id: "submenu2",
    type: "submenu",
    label: "User",
    icon: "fas fa-users",
    submenu: [
      {
        path: "/add-user-hr",
        label: "Add User",
        icon: "fa fa-plus-circle",
        className: "logouticon curentemploye2",
      },
      {
        path: "/list-user-hr",
        label: "List User",
        icon: "fa fa-users",
        className: "logouticon curentemploye2",
      },
    ],
  },

  {
    type: "link",
    path: "/add-position",
    label: "Add Position",
    icon: "fa fa-plus-circle",
    // useSvg: true,
    // svgPath: "M256 512A256 256 0 1 0 256 0...",
  },
  {
    type: "link",
    path: "/add-employee",
    label: "Add Employee",
    icon: "fa fa-user-plus",
  },
  {
    type: "link",
    path: "/non-joiner",
    label: "Non Joiners",
    icon: "fa fa-user-slash",
  },
  {
    type: "link",
    path: "/add-review",
    label: "Add Review",
    icon: "fa fa-edit",
  },
  {
    type: "link",
    path: "/previous-review",
    label: "Previous Reviews",
    icon: "fa fa-star",
  },
  {
    type: "link",
    path: "/search-employee",
    label: "Search Employees",
    icon: "fa fa-search",
  },
  {
    type: "link",
    path: "/upload-csv",
    label: "Upload CSV",
    icon: "fa fa-upload",
  },
  {
    type: "link",
    path: "/profile",
    label: "Profile",
    icon: "fa fa-circle-user",
  },
  {
    type: "link",
    path: "/log-list",
    label: "Log List",
    icon: "fa fa-user",
  },
  {
    type: "link",
    path: "/hrms",
    label: "HRMS",
    icon: "fa fa-user",
  },
].filter(Boolean);
  const profileImage = getFromLocalStorage("profileImage");
const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const logoutUser = () => {
    dispatch(logoutUserapi())
      .then((res) => {
        logout(false); // Pass false to indicate regular user logout
        // toast.success("Logged out successfully");
      })
      .catch((err) => {
        // Even if API call fails, still logout locally
        logout(false);
        toast.success("Logged out successfully");
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
                      {subItem.useSvg ? (
                        <svg height="1em" viewBox={subItem.path === "/employee" ? "0 0 640 512" : "0 0 512 512"}>
                          <path d={subItem.svgPath} />
                        </svg>
                      ) : (
                        <i className={subItem.icon}></i>
                      )} &nbsp;
                      <span className="iconmenu">{subItem.label}</span>
                    </NavLink>
                  </span>
                ) : (
                  <NavLink activeClassName="active" to={subItem.path}>
                    {subItem.useSvg ? (
                      <svg height="1em" viewBox={subItem.path === "/employee" ? "0 0 640 512" : "0 0 512 512"}>
                        <path d={subItem.svgPath} />
                      </svg>
                    ) : (
                      <i className={subItem.icon}></i>
                    )} &nbsp;
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
                {route.useSvg ? (
                  <svg height="1em" viewBox="0 0 512 512">
                    <path d={route.svgPath} />
                  </svg>
                ) : (
                  <i className={route.icon}></i>
                )} &nbsp;
                <span className="iconmenu">{route.label}</span>
              </NavLink>
            </span>
          ) : (
            <NavLink activeClassName="active" to={route.path}>
              {route.useSvg ? (
                <svg height="1em" viewBox="0 0 512 512">
                  <path d={route.svgPath} />
                </svg>
              ) : (
                <i className={route.icon}></i>
              )} &nbsp;
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

console.log(profileImage,user)
  return (
    <>
      <div className="d-flex" id="wrapper">
        <div
          className="border-end bg-white mobilesidebar1"
          id="sidebar-wrapper"
        >
          <div className="sidebar-heading border-bottom">
            <Link to="/dashboard">
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
                <Link to="/dashboard">
                  {" "}
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
  {user?.company_name?.charAt(0)?.toUpperCase()}
</div>}

                  <p>{user?.company_name}</p>
                </Link>
              </div>
            </div>
            <nav className="sb-sidenav-menu-nested nav  ">
              <ul className="list-unstyled">
                {sidebarRoutes.map((route) => renderMenuItem(route, false))}
                <li className="logouticon">
                  <a onClick={logoutUser}>
                    <svg height="1em" viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                    </svg>
                    &nbsp; <span className="iconmenu">Logout</span>{" "}
                  </a>
                </li>
              </ul>
            </nav>{" "}
          </div>
        </div>

{/* Mobile View Sidebar */}
        <div className="border-end bg-white mobilesidebar" id="sidebar-wrapper">
          <div className="sidebar-heading border-bottom">
            <spna  onClick={handleSidebarToggle}
            >

        
            <Link to="/dashboard">
              <img
                src={o2}
                className="logoclass"
                alt="Logo_image"
                height="40"
                width="150"
              />
            </Link>    </spna>
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
              <Link to="/dashboard">
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
                <li className="logouticon">
                  <a onClick={logoutUser}>
                    <svg height="1em" viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                    </svg>
                    &nbsp; <span className="iconmenu">Logout</span>{" "}
                  </a>
                </li>
              </ul>
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
              <span className="navibar responsiveSearch navibarmobile1">
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
              </span>
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
  {user?.company_name?.charAt(0)?.toUpperCase()}
  
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
                      <Link className="dropdown-item" to="/profile">
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
          </nav>

          {children}

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

export default Layout;
