import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() { 
    const navigate = useNavigate()
    const [selectedMenu, setSelectedMenu] = useState(1)
  return (
    <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a className="navbar-brand m-0" href="#" target="_blank">
        <img src="assets/img/asiwaju-logo.png" className="navbar-brand-img h-100" alt="main_logo"/>
        <span className="ms-1 font-weight-bold text-white">ASIWAJU Analytics</span>
      </a>
    </div>
    <hr className="horizontal light mt-0 mb-2"/>
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item" >
          <Link to={"/"} className={`nav-link text-white ${selectedMenu == 1 ? "active bg-gradient-primary": ""} `} onClick={()=>{
            setSelectedMenu(1)
          }} >
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">dashboard</i>
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/registered-users"} onClick={()=>{
            setSelectedMenu(2)
            console.log("Clicked")
          }} className={`nav-link ${selectedMenu == 2 ? "active bg-gradient-primary": ""} text-white`}>
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">person</i>
            </div>
            <span className="nav-link-text ms-1">Users</span>
          </Link>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link text-white " href="../pages/tables.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">table_view</i>
            </div>
            <span className="nav-link-text ms-1">Quiz</span>
          </a>
        </li> */}
        
      </ul>
    </div>
    <div className="sidenav-footer position-absolute w-100 bottom-0 ">
      <div className="mx-3">
        <button className="btn bg-gradient-primary mt-4 w-100" type="button" onClick={()=>{
            localStorage.clear()
            window.location.reload()
            navigate("/")

        }}>Sign Out</button>
      </div>
    </div>
  </aside>
  )
}
