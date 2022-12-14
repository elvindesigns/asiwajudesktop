import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "./Component/sidebar";
import Dashboard from "./Pages/dashboard";
import SignIn from "./Pages/signin";
import { db } from "./firebase";
import Users from "./Pages/users";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const resetErrorMessage = () => {
    setErrorMessage("")
  }

  const setAuth = (email, password) => {
    setErrorMessage("")
    if(email.trim() === "" || password.trim() === ""){
      setErrorMessage("All fields are required")
      return;
    }
    console.log(email, password)
    getUser(email, password)
    setIsLoading(true)
  }

  const getUser = async (email, password)=>{
    const docRef = doc(db, "admin-users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      if(docSnap.data()['password'] === password){
        setIsAuthenticated(true)
        localStorage.setItem("user_detail", JSON.stringify({email:email}));
      }else{
        setErrorMessage("Incorrect Sign In Details")
      }
      setIsLoading(false)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setErrorMessage("User Not Found")
      setIsLoading(false)
    }
}

const checkUser = ()=>{
  let user = JSON.parse(localStorage.getItem("user_detail"));
  if(user){
    setIsAuthenticated(true)
  }
}

useEffect( () => {
  checkUser()
},[]);

  return (
    <Router>
       { !isAuthenticated ?  
          <Routes>
            <Route path="/" element={ <SignIn authenticate={setAuth} isLoading={isLoading} errorMessage={errorMessage} resetErrorMessage={resetErrorMessage}/>} /> 
            <Route path="/*" element={<Navigate to="/" replace />} />      
          </Routes> :
          <div className="g-sidenav-show  bg-gray-200">
            <Sidebar/>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />      
              <Route path="/dashboard" element={<Dashboard  />} />
              <Route path="/registered-users" element={<Users  />} />
            </Routes>
          </div>
        }
      
    </Router>
  );
}

export default App;
