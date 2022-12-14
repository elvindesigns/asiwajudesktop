import React, { useEffect, useState } from 'react'


export default function SignIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


  return (
    <body className="bg-gray-200">
        <main className="main-content  mt-0">
            <div className="page-header align-items-start min-vh-100" style={{backgroundImage: "url(assets/img/asiwaju-bg.jpg)"}}>
            <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container my-auto">
                <div className="row">
                <div className="col-lg-4 col-md-8 col-12 mx-auto">
                    <div className="card z-index-0 fadeIn3 fadeInBottom">
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div className=" shadow-info border-radius-lg py-3 pe-1 text-center">
                            <img src='assets/img/asiwaju-logo.png' style={{maxWidth:'300px'}}/>
                            <h4 className="text-black font-weight-bolder text-center mt-2 mb-0">ASIWAJU ANALYTICS</h4>
                            <h4 className="text-black font-weight-normal text-center mt-2 mb-0">sign in</h4>
                        
                        </div>
                    </div>
                    
                    <div className="card-body">
                       {props.errorMessage != "" ? <div class="alert alert-primary alert-dismissible text-white" role="alert">
                            <span class="text-sm">{props.errorMessage}</span>
                            <button type="button" class="btn-close text-lg py-3 opacity-10"  aria-label="Close" onClick={()=>{
                                props.resetErrorMessage()
                            }}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>: <div></div>}
                        <form role="form" className="text-start">
                        <div className="input-group input-group-outline my-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" onChange={(e)=>{
                                setEmail(e.target.value)
                            }}/>
                        </div>
                        <div className="input-group input-group-outline mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={(e)=>{
                                setPassword(e.target.value)
                            }}/>
                        </div>
                        
                        <div className="text-center">
                            {!props.isLoading ? <button type="button" className="btn bg-gradient-info w-100 my-4 mb-2" onClick={()=>{
                                props.authenticate(email, password)
                            }}>Sign in</button>
                        :
                        <button type="button" className="btn bg-gradient-default w-100 my-4 mb-2">Signing In...</button>}
                        </div>
                        
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <footer className="footer position-absolute bottom-2 py-2 w-100">
                <div className="container">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-12 col-md-6 my-auto">
                    <div className="copyright text-center text-sm text-white text-lg-start">
                        © 2022 
                        
                        <a href="https://www.creative-tim.com" className="font-weight-bold text-white" target="_blank"> Decagon A's </a>
                        Trust LTD.
                    </div>
                    </div>
                    <div className="col-12 col-md-6">
                    
                    </div>
                </div>
                </div>
            </footer>
            </div>
        </main>
    </body>
  )
}
