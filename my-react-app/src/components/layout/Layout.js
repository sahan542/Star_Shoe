import React from 'react'
import Footer from './Footer';
import Header from './Header';
import {Helmet} from "react-helmet";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';


const Layout = ({children, title,description,keywords,author}) => {
  return (
    <div>
        <helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description }/>
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </helmet>

        <Header></Header>

        <main style={{minHeight:'70vh'}}>
          <Toaster></Toaster>
        {children}
        </main>
        <Footer></Footer>


    </div>
  )
}

Layout.defaultProps = {
  title: "Star_Shoe-Shop Now!",
  description: "MERN Stack Project",
  keywords: "MERN,MongoDB,React,NodeJs",
  author: "Sahan Rashmika Silva"

}

export default Layout;