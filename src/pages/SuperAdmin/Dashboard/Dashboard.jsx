import React from 'react'
import { Link } from 'react-router-dom'
import { useGetDashboardQuery } from '../../../apis/SuperAdmin/dashboard'
import { currentem, exemploye, nonjoiner, review } from '../../../asset'

const Dashboard = () => {
  const {data}=useGetDashboardQuery()
  console.log(data)
  return (
    <div className="dashboardindex">
         
    <div className='row pd-4 viewemployee'>
        <div className='col-lg-12 c_name pd-4'>
          <h3>Welcome,  </h3>
        </div>
       
        <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
         <Link to="/employee" className="cardtag"> <div className="card  ">
          <img src={currentem} className="card1 img-fluid" alt='' />
            <div className="os-inner-col">
           <h4 className="blue-violet">Total Companies</h4>
              <h5 className="blue-violet_text">{data?.totalCompanies}</h5>
              
            </div>
          </div></Link>
        </div>
        <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
         <Link to="/ex-employee" className="cardtag"> <div className="card  ">
          <img src={exemploye} className="card1 img-fluid" alt ='' />
            <div className="os-inner-col">
             <h4 className="blue-violet">Total Admins</h4>
              <h5 className="blue-violet_text">{data?.totalAdmins}</h5>
            </div>
          </div></Link>
        </div>
        <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
         <Link to="/non-joiner" className="cardtag"> <div className="card  ">
          <img src={nonjoiner}className="card1 img-fluid" alt='' />
            <div className="os-inner-col">
            <h4 className="blue-violet">Pending Requests</h4>
              <h5 className="blue-violet_text">{data?.pendingRequests}</h5>
            </div>
          </div></Link>
        </div>
        <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
         <Link to="/previous-review" className="cardtag"> <div className="card  ">
          <img src={review} className="card1 img-fluid" alt='' />
            <div className="os-inner-col">
           <h4 className="blue-violet"> Submitted Reviews</h4>
              <h5 className="blue-violet_text"> -</h5>
              
            </div>
          </div></Link>
        </div>
      </div>

      
    </div>
  )
}

export default Dashboard