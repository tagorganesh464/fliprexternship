import React from 'react'
import NavbarMain from "../navbar/NavbarMain"
import { Outlet } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useLocation } from "react-router-dom";
import './RootLayOut.css'
function RootLayout() {
  let location=useLocation();
  let [path,setPath]=useState("none");
  useEffect(()=>{
   let url=location.pathname.replace("/","")
   if(url.length===0){
   setPath("home")
  }
  else{
   setPath(url)
  }
 },[location])
  return (
    <div
    className={path}
  >
    <div className="head">
    <NavbarMain/>
    </div>
    {/* placeholder */}
    <div className="main">
      <Outlet />
    </div>
  </div>
  )
}

export default RootLayout