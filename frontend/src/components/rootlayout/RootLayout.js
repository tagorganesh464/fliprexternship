import React from 'react'
import NavbarMain from "../navbar/NavbarMain"
import Footer from "../footer/Footer"
import { Outlet } from 'react-router-dom'
function RootLayout() {
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
     <NavbarMain/>
     {/* placeholder */}
     <div >
     <Outlet/>
     </div>
     <div style={{marginTop:"auto"}}>
     <Footer/>
     </div>
     
    </div>
  )
}

export default RootLayout