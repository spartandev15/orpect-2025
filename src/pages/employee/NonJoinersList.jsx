import React from 'react'
import Layout from '../../component/layout'
import NonJoinersTable from '../../component/table/NonjoinersEmployeeTable'
const NonJoinersList = () => {
  return (
    <Layout>
      <div className=' dashboardindex'>
        <NonJoinersTable/>
        </div>
    </Layout>
  )
}

export default NonJoinersList