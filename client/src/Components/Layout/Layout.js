import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Helmet from 'react-helmet';


const Layout = ({children, description, keywords, author, title}) => {
  return (
    <div>
    {/* SEO */}
    <Helmet> 
    <title>{title}</title>
  <meta charSet="UTF-8" />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords}/>
  <meta name="author" content={author} />

    </Helmet>
    <Header />
    <main style={{minHeight:'78vh'}} >
   
    {children}
    </main>
    <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: "MG's Cart - Shop Now",
  description: 'Ecommerce App',
  keywords: 'MERN, React, Node, MongoDB',
  author: 'Mohit Geryani',
}

export default Layout