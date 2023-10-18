import React from 'react'
import Layout from '../Components/Layout/Layout'

const About = () => {
  return (
   <Layout title={'About Us'} description={'About us page'}>
<div className="responsive-container-block bigContainer">
  <div className="responsive-container-block Container">
    <div className="responsive-container-block leftSide">
      <p className="text-blk heading">
        Who We Are?
      </p>
      <p className="text-blk subHeading">
        Semaj Africa is an online education platform that delivers video courses, programs and resources for Individual, Advertising &amp; Media Specialist, Online Marketing Professionals, Freelancers and anyone looking to pursue a career in digital marketing, Accounting, Web development, Programming. Multimedia and CAD design.
      </p>
    </div>
    <div className="responsive-container-block rightSide">
     <img src='/images/about.jpeg' className='AboutIMG' />
    </div>
  </div>
</div>

   </Layout>
  )
}

export default About