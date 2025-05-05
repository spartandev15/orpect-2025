import React from "react";
import Layout from "../../component/layout";
import PreviousReviewTable from "../../component/table/PreviousReviewTable";

const RateReviewList = () => {
  return (
    <Layout>
      <div className="dashboardindex">
        <PreviousReviewTable />
      </div>
    </Layout>
  );
};

export default RateReviewList;
