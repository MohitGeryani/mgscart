import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' >

    <div className='footer-links-container'>
    <Link to='/about' className='footer-links' >About</Link>
    <Link to='/contact'  className='footer-links'>Contact</Link>
    <Link to='/policy'  className='footer-links'>Privacy Policy</Link>
    </div>
    <h4>All Right Reserverd &copy; MohitGeryani </h4>

    </div>
  )
}

export default Footer