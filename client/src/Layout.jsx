import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='p-4 px-8 flex flex-col min-h-screen' >
      <Header/>
      <Outlet></Outlet>
    </div>
  )
}

export default Layout
