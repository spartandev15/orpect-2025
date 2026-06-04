import React from 'react'
import Layout from '../../component/layout'
import Button from '../../component/Button'
import { useHrmsAccessMutation } from '../../apis/hrms'

const TempHrms = () => {
  const [hrmsAccess]=useHrmsAccessMutation()
  return (
    <Layout>

        <div className='p-4'>
            TempHrms
            <button onClick={()=>hrmsAccess()}>Hit</button>
            </div>
    </Layout>
  )
}

export default TempHrms