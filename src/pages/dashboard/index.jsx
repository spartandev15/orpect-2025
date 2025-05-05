import React from "react";  
import Layout from "../../component/layout";
import "../../../src/asset/css/dashboard.css";  
import CurrentEmployeeTable from "../../component/table/CurrentEmployeeTable";
import ExEmployeeTable from "../../component/table/ExEmployeeTable";
import NonJoinersTable from "../../component/table/NonjoinersEmployeeTable"; 
import { useSelector } from 'react-redux' 
import { currentem, exemploye, nonjoiner, review } from '../../asset'
import { getFromLocalStorage } from "../../helper";
import { Link } from "react-router-dom";

const Dasboard = () => {
  const user = getFromLocalStorage("user");

  const employeeCount = useSelector((s) => s.dashboardData?.employeeCount);
   
  const {currentEmployeeCount,exEmployeeCount,nonJoinerCount} = employeeCount

  return (
    <Layout>
    
        <div className="dashboardindex">
         
        <div className='row pd-4 viewemployee'>
            <div className='col-lg-12 c_name pd-4'>
              <h3>Welcome, {user?.company_name} </h3>
            </div>
           
            <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
             <Link to="/employee" className="cardtag"> <div className="card  ">
              <img src={currentem} className="card1 img-fluid" alt='' />
                <div className="os-inner-col">
               <h4 className="blue-violet">Current Employees</h4>
                  <h5 className="blue-violet_text">{currentEmployeeCount || '-'}</h5>
                  
                </div>
              </div></Link>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
             <Link to="/ex-employee" className="cardtag"> <div className="card  ">
              <img src={exemploye} className="card1 img-fluid" alt ='' />
                <div className="os-inner-col">
                 <h4 className="blue-violet">Ex Employees</h4>
                  <h5 className="blue-violet_text">{exEmployeeCount  || '-'}</h5>
                </div>
              </div></Link>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
             <Link to="/non-joiner" className="cardtag"> <div className="card  ">
              <img src={nonjoiner} className="card1 img-fluid" alt='' />
                <div className="os-inner-col">
                <h4 className="blue-violet">Non Joiners</h4>
                  <h5 className="blue-violet_text">{nonJoinerCount  || '-'}</h5>
                </div>
              </div></Link>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
             <Link to="/previous-review" className="cardtag"> <div className="card  ">
              <img src={review} className="card1 img-fluid" alt='' />
                <div className="os-inner-col">
               <h4 className="blue-violet"> Submitted Reviews</h4>
                  <h5 className="blue-violet_text"> {nonJoinerCount + exEmployeeCount }</h5>
                  
                </div>
              </div></Link>
            </div>
          </div>
         
          <CurrentEmployeeTable />
          <ExEmployeeTable />
          <NonJoinersTable />
          
        </div>
   
    </Layout>
  );
};

export default Dasboard;
