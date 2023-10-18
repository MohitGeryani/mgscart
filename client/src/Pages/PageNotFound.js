import React from 'react'
import Layout from '../Components/Layout/Layout'



const PageNotFound = () => {
  return (
    <Layout title={'404'}>
        <div id='PageNotFound'>
        <h1>404</h1>
        <b>Whoops! the page you're lookin for doesn't exists.</b>
        <button className='go-back-btn'>Go Back</button>
        </div>
    </Layout>
  )
}

export default PageNotFound