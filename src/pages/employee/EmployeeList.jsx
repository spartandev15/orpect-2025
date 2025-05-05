import React from "react";
import Layout from "../../component/layout";
import CurrentEmployeeTable from "../../component/table/CurrentEmployeeTable";
const EmployeeList = () => {


  return (
    <>
      <Layout>
        <div className="dashboardindex">
        <CurrentEmployeeTable/>
        </div>
      </Layout>
    </>
  );
};

export default EmployeeList;
