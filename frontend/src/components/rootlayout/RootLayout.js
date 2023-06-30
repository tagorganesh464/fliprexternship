import React from 'react'
import NavbarMain from "../navbar/NavbarMain"
import { domainContext } from "../../context/DomainContextProvider";
import { Outlet } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useLocation } from "react-router-dom";
import { useContext } from 'react';
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
 let [domain,setDomain]=useContext(domainContext)
 useEffect(()=>{
   let url=window.location.href;
   let baseURL = url.split("/").slice(0, 3).join("/")
   setDomain(baseURL.replace("://","://server."))
   console.log(domain)
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