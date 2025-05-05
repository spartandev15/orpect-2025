import React from 'react'
import Layout from '../../component/layout'
import ExEmployeeTable from '../../component/table/ExEmployeeTable'

const ExEmployeeList = () => {
  return (
     <Layout>
      <div className='dashboardindex'>
        <ExEmployeeTable/>
        </div>
     </Layout>
  )
}

export default ExEmployeeList