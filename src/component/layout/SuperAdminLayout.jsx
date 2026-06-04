// import React, { useEffect, useState } from "react";
// import { logoutUserapi } from "../../api/auth";
// import {
//   fabicon,
//   o2,
//   uploadProfile,
// } from "../../asset/index";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { getFromLocalStorage } from "../../helper";
// import { setEmpType, setSearchValue } from "../../store/DashboardSlice";
// import { toast } from "react-toastify";
// import { logout } from "../../api/logout";
// import NotificationDropdown from "../extras/Notification/NotificationBell";
// import { Navigate } from "react-router-dom";
// import { ADMIN_ROUTES, COMPANY_ROUTES } from "../../config/routes.config";
// import { IMAGE_BASE_URL_WITH_SLASH } from "../../api/baseUrl";

// // Routes configuration array
// const sidebarRoutes = [
//   {
//     id: "submenu1",
//     type: "submenu",
//     label: "SuperAdmin User",
//     icon: "fas fa-users",
//     submenu: [
//       {
//         path: "/super-admin/user",
//         label: "User",
//         icon: "fa fa-edit",
//       },
//       {
//         path: "/super-admin/adduser",
//         label: "Add User",
//         icon: "fa fa-user-plus",
//         className: "logouticon curentemploye2",
//       },
//     ],
//   },
//   {
//     id: "submenu2",
//     type: "submenu",
//     label: "Company",
//     icon: "fa fa-building",
//     submenu: [

//       {
//         path: "/super-admin/addcompany",
//         label: "Add Company",
//         icon: "fa fa-plus",
//         className: "logouticon curentemploye2",
//       },
//       {
//         path: "/super-admin/companies",
//         label: "Company List",
//         icon: "fa fa-list",
//       },

//     ],
//   },

//   {
//     type: "link",
//     path: "/super-admin/notification-list",
//     label: "Notification List",
//     icon: "fa fa-bell",
//   },
//   {
//     type: "link",
//     path: "/super-admin/data-request",
//     label: "Data Request",
//     icon: "fa fa-book",
//   },
//   {
//     type: "link",
//     path: "/super-admin/profile",
//     label: "Profile",
//     icon: "fa fa-user",
//   },
// ];

// const SuperAdminLayout = ({ children }) => {
//   const [search, setSearch] = useState("");
//   const [openSubmenus, setOpenSubmenus] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const notifications = useSelector(state => state.notification.list);
//   console.log(notifications)
//   const searchValue = useSelector((state) => state?.dashboardData?.searchValue);
//   const user = getFromLocalStorage("user");
//   const profileImage = getFromLocalStorage("profileImage");
//   const location = useLocation();

//   // Check for super admin authentication - additional layer of protection
//   const superAdminToken = getFromLocalStorage("superAdmintoken");
//   const regularToken = getFromLocalStorage("token");

//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


//   // Check if current route matches submenu items and open submenu accordingly
//   useEffect(() => {
//     const path = location.pathname;
//     sidebarRoutes.forEach((route) => {
//       if (route.type === "submenu" && route.submenu) {
//         const hasActiveChild = route.submenu.some(
//           (subItem) => subItem.path === path
//         );
//         if (hasActiveChild) {
//           setOpenSubmenus((prev) => ({ ...prev, [route.id]: true }));
//         }
//       }
//     });
//   }, [location.pathname]);


//   const logoutUser = () => {
//     dispatch(logoutUserapi())
//       .then((res) => {
//         logout(true); // Pass true to indicate admin logout
//         // toast.success("Logged out successfully");
//       })
//       .catch((err) => {
//         // Even if API call fails, still logout locally
//         logout(true);
//         // toast.success("Logged out successfully");
//       });
//   };

//   function handleSidebarToggle(event) {
//     event.preventDefault();

//     const toggled = !isSidebarCollapsed;

//     setIsSidebarCollapsed(toggled);

//     document.body.classList.toggle(
//       "sb-sidenav-toggled",
//       toggled
//     );

//     localStorage.setItem(
//       "sb|sidebar-toggle",
//       toggled
//     );
//   }

//   useEffect(() => {
//     const savedSidebarState =
//       localStorage.getItem("sb|sidebar-toggle") === "true";

//     setIsSidebarCollapsed(savedSidebarState);

//     if (savedSidebarState) {
//       document.body.classList.add("sb-sidenav-toggled");
//     } else {
//       document.body.classList.remove("sb-sidenav-toggled");
//     }

//     const sidebarToggle =
//       document.body.querySelector("#sidebarToggle");

//     if (sidebarToggle) {
//       sidebarToggle.addEventListener(
//         "click",
//         handleSidebarToggle
//       );

//       return () => {
//         sidebarToggle.removeEventListener(
//           "click",
//           handleSidebarToggle
//         );
//       };
//     }
//   }, [isSidebarCollapsed]);
//   useEffect(() => {

//   }, [])
//   const handleSearchInputChange = () => {
//     dispatch(setEmpType(""));
//     navigate("/search-employee");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearchInputChange();
//     }
//   };

//   const toggleSubmenu = (submenuId, e) => {
//     e.preventDefault();
//     setOpenSubmenus(prev => ({
//       ...prev,
//       [submenuId]: !prev[submenuId]
//     }));
//   };

//   // Helper function to check if a submenu has active child
//   const isSubmenuActive = (route) => {
//     if (route.type === "submenu" && route.submenu) {
//       return route.submenu.some((subItem) => subItem.path === location.pathname);
//     }
//     return false;
//   };

//   // Render menu items
//   const renderMenuItem = (route, isMobile = false) => {
//     if (route.type === "submenu") {
//       const isActive = isSubmenuActive(route);
//       const isOpen = openSubmenus[route.id] || false;

//       return (
//         <li key={route.id}>
//           <a
//             href="#"
//             onClick={(e) => toggleSubmenu(route.id, e)}
//             className={isActive ? "active" : ""}
//           >
//             <i className={route.icon}></i> &nbsp;
//             <span className="iconmenu">
//               {route.label} &nbsp;
//               <i
//                 className="fa fa-caret-down"
//                 style={{
//                   transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
//                   transition: "transform 0.3s ease",
//                   display: "inline-block",
//                 }}
//               ></i>
//             </span>
//           </a>
//           <ul
//             className={`navi nav-list curentemploye1 ${isOpen ? "show" : "collapse"}`}
//             id={route.id}
//             style={{
//               display: isOpen ? "block" : "none",
//             }}
//           >
//             {route.submenu.map((subItem, index) => (
//               <li
//                 key={index}
//                 className={`dropdown-item curentemployepadding curentemploye1 ${subItem.className || ""
//                   }`}
//               >
//                 {isMobile ? (
//                   <span onClick={handleSidebarToggle}>
//                     <NavLink activeClassName="active" to={subItem.path}>
//                       <i className={subItem.icon}></i> &nbsp;
//                       <span className="iconmenu">{subItem.label}</span>
//                     </NavLink>
//                   </span>
//                 ) : (
//                   <NavLink activeClassName="active" to={subItem.path}>
//                     <i className={subItem.icon}></i> &nbsp;
//                     <span className="iconmenu">{subItem.label}</span>
//                   </NavLink>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </li>
//       );
//     } else {
//       return (
//         <li key={route.path}>
//           {isMobile ? (
//             <span onClick={handleSidebarToggle}>
//               <NavLink activeClassName="active" to={route.path}>
//                 <i className={route.icon}></i> &nbsp;
//                 <span className="iconmenu">{route.label}</span>
//               </NavLink>
//             </span>
//           ) : (
//             <NavLink activeClassName="active" to={route.path}>
//               <i className={route.icon}></i> &nbsp;
//               <span className="iconmenu">{route.label}</span>
//             </NavLink>
//           )}
//         </li>
//       );
//     }
//   };
//  console.log(user?.is_master , "is_master")
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // If user only has regular token (not admin), redirect to dashboard
//   if (regularToken && !superAdminToken) {
//     return <Navigate to={COMPANY_ROUTES.DASHBOARD} replace />;
//   }

//   // If no admin token at all, redirect to admin login
//   if (!superAdminToken) {
//     return <Navigate to={ADMIN_ROUTES.LOGIN} replace />;
//   }
//   return (
//     <>
//       <div className="d-flex" id="wrapper">
//         <div
//           className="border-end bg-white mobilesidebar1"
//           id="sidebar-wrapper"
//         >
//           <div className="sidebar-heading border-bottom">
//             <Link to="/super-admin/dashboard">
//               <img
//                 src={o2}
//                 className="logoclass"
//                 alt="Logo_image"
//                 height="40"
//                 width="150"
//               />
//               <img
//                 src={fabicon}
//                 className="logoclass1"
//                 alt="Logo_image"
//                 height="40"
//                 width="40"
//               />
//             </Link>
//           </div>

//           <div className="list-group list-group-flush">
//             <div className="profile-sec">
//               <div className="profile-dtl">
//                 <Link to="/super-admin/dashboard">
//                   {" "}
//                   {/* <img
//                     src={
//                       profileImage
//                         ? `${IMAGE_BASE_URL_WITH_SLASH}${profileImage}`
//                         : user && user.image
//                           ? `${IMAGE_BASE_URL_WITH_SLASH}${user.image}`
//                           : uploadProfile
//                     }
//                     alt=""
//                   /> */}
//                   {profileImage || user?.image ? <img
//                     src={
//                       profileImage
//                         ? `${IMAGE_BASE_URL_WITH_SLASH}${profileImage}`
//                         : user && user?.image
//                           ? `${IMAGE_BASE_URL_WITH_SLASH}${user?.image}`
//                           : uploadProfile
//                     }
//                     alt=""
//                   /> :
//                     <div className={isSidebarCollapsed ? "firstLetterPicSmall" : "firstLetterPic"}>
//                       {user?.fullname?.charAt(0)?.toUpperCase()}
//                     </div>}
//                   <p>{user?.fullname}</p>
//                 </Link>
//               </div>
//             </div>
//             <nav className="sb-sidenav-menu-nested nav  ">
//               <ul className="list-unstyled">
//                 {sidebarRoutes.map((route) => renderMenuItem(route, false))}
//               </ul>
//             </nav>
//           </div>
//         </div>

//         {/* Mobile View Sidebar */}
//         <div className="border-end bg-white mobilesidebar" id="sidebar-wrapper">
//           <div className="sidebar-heading border-bottom">
//             <span onClick={handleSidebarToggle}>

//               <Link to="/super-admin/dashboard">
//                 <img
//                   src={o2}
//                   className="logoclass"
//                   alt="Logo_image"
//                   height="40"
//                   width="150"
//                 />
//               </Link></span>
//             <button
//               className="btn togglebtn"
//               style={{ marginLeft: "2rem", position: "absolute" }}
//               onClick={handleSidebarToggle}
//             >
//               <svg
//                 width="40"
//                 height="40"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={{ color: "#134d75" }}
//               >
//                 <path
//                   d="M18 6L6 18"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M6 6L18 18"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="list-group list-group-flush">
//             <div className="profile-sec">
//               <div className="profile-dtl">
//                 <span onClick={handleSidebarToggle}>

//                   <Link to="/super-admin/dashboard">
//                     {" "}
//                     <img
//                       src={
//                         profileImage
//                           ? `${IMAGE_BASE_URL_WITH_SLASH}${profileImage}`
//                           : user && user.image
//                             ? `${IMAGE_BASE_URL_WITH_SLASH}${user.image}`
//                             : uploadProfile
//                       }
//                       alt=""




//                     />
//                     <p>{user?.company_name}</p>
//                   </Link></span>
//               </div>
//             </div>
//             <nav className="sb-sidenav-menu-nested nav  ">
//               <ul className="list-unstyled">
//                 {sidebarRoutes.map((route) => renderMenuItem(route, true))}
//               </ul>

//             </nav>{" "}
//           </div>
//         </div>
//         {/* TO here */}

//         <div id="page-content-wrapper">
//           <nav className="navbar navbar-expand-lg navbar-light  border-bottom header">
//             <div className="container-fluid">
//               <button className="btn togglebtn " id="sidebarToggle">
//                 <i className="fa fa-bars"></i>
//               </button>

//               <span className="navibar  navibarmobile">
//                 <input
//                   className="form-control "
//                   type="text"
//                   aria-label="Search"
//                   data-text="Search"
//                   placeholder="Search Employee"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   onKeyDown={handleKeyPress}
//                 />
//                 <i
//                   className="fa fa-search navi-search"
//                   style={{ paddingLeft: "2px" }}
//                   onClick={handleSearchInputChange}
//                 ></i>
//               </span>
//               <div className="d-flex justify-content-center align-items-center gap-3">


//                 {/* <i class="fa fa-bell" aria-hidden="true"></i> */}
//                 <NotificationDropdown />
//                 <ul className="navbar-nav  user-profile d-md-inline-block">
//                   <li className="nav-item dropdown">
//                     <div
//                       className="nav-link dropdown-toggle"
//                       id="navbarDropdown"
//                       to="#"
//                       role="button"
//                       data-toggle="dropdown"
//                       aria-expanded="false"
//                       style={{ margin: "0" }}
//                     >
//                       <div className="profile-user">
//                         <div className="profile-user-h">
//                           <Link>
//                             {" "}
//                             {
//                               profileImage || user?.image ? <img
//                                 src={
//                                   profileImage
//                                     ? `${IMAGE_BASE_URL_WITH_SLASH}${profileImage}`
//                                     : user && user.image
//                                       ? `${IMAGE_BASE_URL_WITH_SLASH}${user.image}`
//                                       : uploadProfile
//                                 }
//                                 alt="profile"
//                               /> :
//                                 <div className="firstLetterPicSmall">
//                                   {user?.fullname?.charAt(0)?.toUpperCase()}

//                                 </div>
//                             }
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                     <ul
//                       className="dropdown-menu dropdown-menu-end"
//                       aria-labelledby="navbarDropdown"
//                     >
//                       <li>
//                         <Link className="dropdown-item" to="/super-admin/profile">
//                           My Profile
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="dropdown-item" onClick={logoutUser}>
//                           Logout
//                         </Link>
//                       </li>
//                     </ul>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </nav>

//           <Outlet />

//           <div className=" mt-auto fixed-bottom1">
//             <div className="container-fluid bg-white foter">
//               <div className="d-flex align-items-center justify-content-between small text-center">
//                 <div className="text-muted">
//                   {" "}
//                   <span className="copyright quick-links footer_height">
//                     © COPYRIGHT 2023 <a href="/dashboard">ORPECT LLC.</a> All
//                     Rights Reserved.
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SuperAdminLayout;
import React, { useEffect, useState } from "react";
import { logoutUserapi } from "../../api/auth";
import {
  fabicon,
  o2,
  uploadProfile,
} from "../../asset/index";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { getFromLocalStorage } from "../../helper";
import { setEmpType } from "../../store/DashboardSlice";
import { logout } from "../../api/logout";
import NotificationDropdown from "../extras/Notification/NotificationBell";
import { ADMIN_ROUTES, COMPANY_ROUTES } from "../../config/routes.config";
import { IMAGE_BASE_URL_WITH_SLASH } from "../../api/baseUrl";

const SuperAdminLayout = () => {
  const [search, setSearch] = useState("");
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const notifications = useSelector(
    (state) => state.notification.list
  );

  const user = getFromLocalStorage("user");
  const profileImage = getFromLocalStorage("profileImage");

  const superAdminToken = getFromLocalStorage("superAdmintoken");
  const regularToken = getFromLocalStorage("token");

  console.log(notifications);
  console.log(user?.is_master, "is_master");

  // =========================
  // SIDEBAR ROUTES
  // =========================
  const sidebarRoutes = [
    ...(Number(user?.is_master) === 1
      ? [
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
        ]
      : []),

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
    //  {
    //     type: "link",
    //     path: "/super-admin/hrms",
    //     label: "HRMS",
    //     icon: "fa fa-user",
    //   },
  ];

  // =========================
  // OPEN ACTIVE SUBMENU
  // =========================
  useEffect(() => {
    const path = location.pathname;

    sidebarRoutes.forEach((route) => {
      if (route.type === "submenu" && route.submenu) {
        const hasActiveChild = route.submenu.some(
          (subItem) => subItem.path === path
        );

        if (hasActiveChild) {
          setOpenSubmenus((prev) => ({
            ...prev,
            [route.id]: true,
          }));
        }
      }
    });
  }, [location.pathname]);

  // =========================
  // LOGOUT
  // =========================
  const logoutUser = () => {
    dispatch(logoutUserapi())
      .then(() => {
        logout(true);
      })
      .catch(() => {
        logout(true);
      });
  };

  // =========================
  // SIDEBAR TOGGLE
  // =========================
  function handleSidebarToggle(event) {
    if (event) {
      event.preventDefault();
    }

    const toggled = !isSidebarCollapsed;

    setIsSidebarCollapsed(toggled);

    document.body.classList.toggle(
      "sb-sidenav-toggled",
      toggled
    );

    localStorage.setItem("sb|sidebar-toggle", toggled);
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
  }, []);

  // =========================
  // SEARCH
  // =========================
  const handleSearchInputChange = () => {
    dispatch(setEmpType(""));
    navigate("/search-employee");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchInputChange();
    }
  };

  // =========================
  // SUBMENU TOGGLE
  // =========================
  const toggleSubmenu = (submenuId, e) => {
    e.preventDefault();

    setOpenSubmenus((prev) => ({
      ...prev,
      [submenuId]: !prev[submenuId],
    }));
  };

  // =========================
  // CHECK ACTIVE SUBMENU
  // =========================
  const isSubmenuActive = (route) => {
    if (route.type === "submenu" && route.submenu) {
      return route.submenu.some(
        (subItem) => subItem.path === location.pathname
      );
    }

    return false;
  };

  // =========================
  // RENDER MENU ITEM
  // =========================
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
                  transform: isOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  display: "inline-block",
                }}
              ></i>
            </span>
          </a>

          <ul
            className={`navi nav-list curentemploye1 ${
              isOpen ? "show" : "collapse"
            }`}
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
                    <NavLink to={subItem.path}>
                      <i className={subItem.icon}></i> &nbsp;

                      <span className="iconmenu">
                        {subItem.label}
                      </span>
                    </NavLink>
                  </span>
                ) : (
                  <NavLink to={subItem.path}>
                    <i className={subItem.icon}></i> &nbsp;

                    <span className="iconmenu">
                      {subItem.label}
                    </span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li key={route.path}>
        {isMobile ? (
          <span onClick={handleSidebarToggle}>
            <NavLink to={route.path}>
              <i className={route.icon}></i> &nbsp;

              <span className="iconmenu">{route.label}</span>
            </NavLink>
          </span>
        ) : (
          <NavLink to={route.path}>
            <i className={route.icon}></i> &nbsp;

            <span className="iconmenu">{route.label}</span>
          </NavLink>
        )}
      </li>
    );
  };

  // =========================
  // SCROLL TOP
  // =========================
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // =========================
  // AUTH CHECK
  // =========================
  if (regularToken && !superAdminToken) {
    return <Navigate to={COMPANY_ROUTES.DASHBOARD} replace />;
  }

  if (!superAdminToken) {
    return <Navigate to={ADMIN_ROUTES.LOGIN} replace />;
  }

  return (
    <>
      <div className="d-flex" id="wrapper">
        {/* DESKTOP SIDEBAR */}
        <div
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
                  {profileImage || user?.image ? (
                    <img
                      src={
                        profileImage
                          ? `${IMAGE_BASE_URL_WITH_SLASH}${profileImage}`
                          : `${IMAGE_BASE_URL_WITH_SLASH}${user?.image}`
                      }
                      alt=""
                    />
                  ) : (
                    <div
                      className={
                        isSidebarCollapsed
                          ? "firstLetterPicSmall"
                          : "firstLetterPic"
                      }
                    >
                      {user?.fullname
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>
                  )}

                  <p>{user?.fullname}</p>
                </Link>
              </div>
            </div>

            <nav className="sb-sidenav-menu-nested nav">
              <ul className="list-unstyled">
                {sidebarRoutes.map((route) =>
                  renderMenuItem(route, false)
                )}
              </ul>
            </nav>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div id="page-content-wrapper">
          {/* HEADER */}
          <nav className="navbar navbar-expand-lg navbar-light border-bottom header">
            <div className="container-fluid">
              <button
                className="btn togglebtn"
                id="sidebarToggle"
              >
                <i className="fa fa-bars"></i>
              </button>

              <span className="navibar navibarmobile">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search Employee"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  onKeyDown={handleKeyPress}
                />

                <i
                  className="fa fa-search navi-search"
                  style={{ paddingLeft: "2px" }}
                  onClick={handleSearchInputChange}
                ></i>
              </span>

              <div className="d-flex justify-content-center align-items-center gap-3">
                <NotificationDropdown />

                <ul className="navbar-nav user-profile d-md-inline-block">
                  <li className="nav-item dropdown">
                    <div
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      style={{ margin: "0" }}
                    >
                      <div className="profile-user">
                        <div className="profile-user-h">
                          <Link>
                            {profileImage || user?.image ? (
                              <img
                                src={
                                  profileImage
                                    ? `${IMAGE_BASE_URL_WITH_SLASH}${profileImage}`
                                    : `${IMAGE_BASE_URL_WITH_SLASH}${user?.image}`
                                }
                                alt="profile"
                              />
                            ) : (
                              <div className="firstLetterPicSmall">
                                {user?.fullname
                                  ?.charAt(0)
                                  ?.toUpperCase()}
                              </div>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/super-admin/profile"
                        >
                          My Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          onClick={logoutUser}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* ROUTES */}
          <Outlet />

          {/* FOOTER */}
          <div className="mt-auto fixed-bottom1">
            <div className="container-fluid bg-white foter">
              <div className="d-flex align-items-center justify-content-between small text-center">
                <div className="text-muted">
                  <span className="copyright quick-links footer_height">
                    © COPYRIGHT 2023{" "}
                    <a href="/dashboard">ORPECT LLC.</a> All
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