import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { Footer } from './Footer'

const MainLayouts = () => {
  return (
    <div>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default MainLayouts