import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RegisterWrapper from "../pages/auth-pages/Register";
import LoginWrapper from "../pages/auth-pages/Login";

import ForgetPassword from "../pages/auth-pages/ForgetPassword";
import ResetPassword from "../pages/auth-pages/ResetPassword";
import ProtectedRoute from "./ProtectedRoutes";

import EmployeeList from "../pages/employee/EmployeeList";
import AddEmployee from "../pages/employee/AddEmployee";
import UploadCsv from "../pages/UploadCsv";
import Addposition from "../pages/Addposition";
import Dasboard from "../pages/dashboard";
import Profile from "../pages/profile/Profile";
import ViewEmployee from "../pages/employee/ViewEmployee";
import NonJoinersList from "../pages/employee/NonJoinersList";
import ExEmployeeList from "../pages/employee/ExEmployeeList";
import SearchEmployeeList from "../pages/employee/SearchEmployee";
import AddReview from "../pages/rate-review/AddReview";
import AddExEmployeeReview from "../pages/rate-review/AddExEmployeeReview";
import UpdatePassword from "../pages/auth-pages/UpdatePassword";
import ViewEmployeeAllReview from "../pages/rate-review/ViewEmployeeAllReview";
import AddNonEmployeeReview from "../pages/rate-review/AddNonEmployeeReview";
import VerificationPage from "../pages/auth-pages/VerificationPage";
import ViewExEmployee from "../pages/view-employee/ViewExEmployee";
import ViewNonJoiner from "../pages/view-employee/viewNonJoiner";

import ErrorPage404 from "../pages/LandingPage/Errorpage404";
import AboutUs from "../pages/LandingPage/About us/AboutUs";
import ContactUs from "../pages/LandingPage/Contact US/Contact Us";
import Faqs from "../pages/LandingPage/FAQ/Faqs";
import Community from "../pages/LandingPage/Community/Community";
import PrivacyPolicy from "../pages/LandingPage/PrivacyPolicy/PrivacyPolicy";
import Blog from "../pages/LandingPage/Blog/Blog";
import Blog1 from "../pages/LandingPage/Blog/Introducing";
import Blog2 from "../pages/LandingPage/Blog/ArtofFeedback";
import Blog3 from "../pages/LandingPage/Blog/NewRecuriment";
import Blog4 from "../pages/LandingPage/Blog/RevolutionizingEmployee";
import TermsofUse from "../pages/LandingPage/TermofUse";
import HomePage from "../pages/LandingPage/Home/Index";
import RateReviewList from "../pages/rate-review";
import { Helmet } from 'react-helmet';
import { getDescription, getKeywords, getTitle } from "../helper/utilDetails";
import Blog5 from "../pages/LandingPage/Blog/EmbraceTransparency";
import Joinorpect from "../pages/LandingPage/JoinOrpect/Joinorpect";
import EmployeeRegister from "../pages/auth-pages/EmployeRegister";
import EmployeeDashboard from "../pages/Employee Dashboard/Dashboard";
import TotalReview from "../pages/Employee Dashboard/Review";
import Viewcompany from "../pages/Employee Dashboard/Viewcompany";
import AddCompanyReview from "../pages/Employee Dashboard/AddCompanyReview";
import SuperAdmin_login from "../pages/SuperAdmin/superAdmin-auth/SuperAdmin_login";
import Dashboard from "../pages/SuperAdmin/Dashboard/Dashboard";
import SuperAdminLayout from "../component/layout/SuperAdminLayout";
import User from "../pages/SuperAdmin/User/User";
import SuperAdminProfile from "../pages/SuperAdmin/Profile/Profile";
import AddUser from "../pages/SuperAdmin/User/AddUser";
import ViewUser from "../pages/SuperAdmin/User/ViewUser";
import ViewCompany from "../pages/SuperAdmin/Compaines/ViewCompany";
import Companies from "../pages/SuperAdmin/Compaines/Companies";
import UpdateAdminPassword from "../pages/SuperAdmin/superAdmin-auth/UpdatePassword";
import AddCompany from "../pages/SuperAdmin/Compaines/AddCompany";
import CurrentEmployee from "../pages/SuperAdmin/Employee/CurrentEmployee";
import ExEmployee from "../pages/SuperAdmin/Employee/ExEmployee";
import NonJoiner from "../pages/SuperAdmin/Employee/NonJoiner";
import NotificationList from "../pages/SuperAdmin/Notification/NotificationList";

const Navigation = () => {
  const location = useLocation();
 
  return (
    <>
      <Helmet>
        <title>{getTitle(location.pathname)}</title>
        <meta name="description" content={getDescription(location.pathname)} />
        <meta name="keywords" content={getKeywords(location.pathname)} />
      </Helmet>
     
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="*" element={<ErrorPage404 />} />
          <Route path="404" element={<ErrorPage404 />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/community-guidlines" element={<Community />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/join-orpect-plus" element={<Joinorpect />} />
          <Route path="/introducing-ORPECT" element={<Blog1 />} />
          <Route path="/art-of-feedback" element={<Blog2 />} />
          <Route path="/new-era-recruitment" element={<Blog3 />} />
          <Route path="/revolutionizing-employee" element={<Blog4 />} />
          <Route path="/embrace-transparency" element={<Blog5 />} />
          <Route path="/terms-of-use" element={<TermsofUse />} />
          <Route path="/signup" element={<RegisterWrapper />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verification" element={<VerificationPage />} />
          {/* Employee Dashboard */}
     <Route path="/employee-signup" element={<EmployeeRegister />}/>
        <Route path="/employee-dashboard" element={<EmployeeDashboard/>} />
        <Route path="/total-reviews" element={<TotalReview />} />
        <Route path="/company-detail" element={<Viewcompany />} />
        <Route path="/company-review" element={<AddCompanyReview />} />

          {/* Click here to go to Login Page */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-password"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dasboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-employee"
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-employee/:id"
            element={
              <ProtectedRoute>
                <ViewEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-exemployee/:id"
            element={
              <ProtectedRoute>
                <ViewExEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-nonjoiner/:id"
            element={
              <ProtectedRoute>
                <ViewNonJoiner />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload-csv"
            element={
              <ProtectedRoute>
                <UploadCsv />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-position"
            element={
              <ProtectedRoute>
                <Addposition />
              </ProtectedRoute>
            }
          />
          <Route
            path="/current-employee"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ex-employee"
            element={
              <ProtectedRoute>
                <ExEmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/previous-review"
            element={
              <ProtectedRoute>
                <RateReviewList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/non-joiner"
            element={
              <ProtectedRoute>
                <NonJoinersList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search-employee"
            element={
              <ProtectedRoute>
                <SearchEmployeeList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-review"
            element={
              <ProtectedRoute>
                <AddReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee-review/:id"
            element={
              <ProtectedRoute>
                <ViewEmployeeAllReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-exemployee-review"
            element={
              <ProtectedRoute>
                <AddExEmployeeReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-nonjoiner-review"
            element={
              <ProtectedRoute>
                <AddNonEmployeeReview />
              </ProtectedRoute>
            }
          />
                 <Route path="super-admin/login" element={<SuperAdmin_login />} />
               <Route path="/super-admin" element={<SuperAdminLayout/>}>
                 <Route path="dashboard" element={<Dashboard />} />
                 <Route path="user" element={<User />} />
                 <Route path="profile" element={<SuperAdminProfile/>} />
                 <Route path="updatepassword" element={<UpdateAdminPassword/>} />

                 <Route path="adduser" element={<AddUser/>} />
                 <Route path="viewuser/:id" element={<ViewUser/>} />


                 <Route path="companies" element={<Companies/>} />
                 <Route path="viewcompany/:id" element={<ViewCompany/>} />
                 <Route path="addcompany" element={<AddCompany/>} />

                 <Route path="currentEmployee/:id" element={<CurrentEmployee/>} />
                 <Route path="exEmployee/:id" element={<ExEmployee/>} />
                 <Route path="nonJoiner/:id" element={<NonJoiner/>} />

                 <Route path="notification-list" element={<NotificationList/>} />


               </Route>
        </Routes>
       
      {/* Conditionally render the script tag based on the current route */}
    </>
  );
};

export default Navigation;
