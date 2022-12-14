import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import LoadingScreen from 'react-loading-screen'

export default function Dashboard() {

const [userCount, setUserCount] = useState(0)
const [androidCount, setAndroidCount] = useState(0)
const [iosCount, setIosCount] = useState(0)
const [quizUsersCount, setQuizUsersCount] = useState(0)
const [registeredUsers, setRegisteredUsers] = useState([])
const [quizUsers, setQuizUsers] = useState([])
const [loading, setIsLoading] = useState(true)

const getUserCount = async () =>{
    const querySnapshot = await getDocs(collection(db, "registered-users"));
    console.log(querySnapshot.size)
    setUserCount(querySnapshot.size)

    const registeredRef = collection(db, "registered-users");
    const q = query(registeredRef, orderBy("dateRegistered","desc"), limit(10));
    const querySnapshotAll = await getDocs(q)
    let myArray = []
    querySnapshotAll.forEach((doc) => {
        myArray.push(doc.data())
    });
    setRegisteredUsers(myArray)


    const querySnapshotAll2 = await getDocs(collection(db, "users"))
    let myArray2 = []
    querySnapshotAll2.forEach((doc) => {
        myArray2.push(doc.data())
    });

    const docRef = doc(db, "quiz", "quizday");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let quizday = docSnap.data()['name']
      let sortedScores = myArray2.sort(
        (p1, p2) => (p1[quizday].totalCorrect < p2[quizday].totalCorrect) ? 1 : (p1[quizday].totalCorrect > p2[quizday].totalCorrect) ? -1 : 0);
        setQuizUsers(sortedScores)
    } else {}

    
}
const getDeviceCount = async () =>{
    const docRef = doc(db, "device-info", "device-stat");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
        setAndroidCount(docSnap.data()['android'])
        setIosCount(docSnap.data()['ios'])
    } else {}
}
const getQuizCount = async () =>{
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log(querySnapshot.size)
    setQuizUsersCount(querySnapshot.size)
    // querySnapshot.forEach((doc) => {
    // // doc.data() is never undefined for query doc snapshots
    // // console.log(doc.id, " => ", doc.data());
    // });
}

const getDashboardDetails = async() => {
    await getUserCount()
    await getDeviceCount()
    await getQuizCount()
    setIsLoading(false)
}

useEffect( () => {
    getDashboardDetails()
  },[]);
  return (
   loading ? <LoadingScreen
    loading={loading}
    bgColor='#f1f1f1'
    spinnerColor='#9ee5f8'
    textColor='#676767'
    logoSrc='assets/img/asiwaju-logo.png'
    text='Loading Content'
    ></LoadingScreen> :
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            {/* <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li> */}
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Dashboard</h6>
        </nav>
        
      </div>
    </nav>

    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">people</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-md mb-0 text-capitalize">Registered Users</p>
                <h4 className="mb-0" style={{fontSize:"40px"}}>{userCount.toLocaleString()}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"/>
            <div className="card-footer p-3">
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">android</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-md mb-0 text-capitalize">Android Downloads</p>
                <h4 className="mb-0" style={{fontSize:"40px"}}>{androidCount.toLocaleString()}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"/>
            <div className="card-footer p-3">
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">apple</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-md mb-0 text-capitalize">IOS Downloads</p>
                <h4 className="mb-0" style={{fontSize:"40px"}}>{iosCount.toLocaleString()}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"/>
            <div className="card-footer p-3">
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">quiz</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-md mb-0 text-capitalize">Quiz Users</p>
                <h4 className="mb-0" style={{fontSize:"40px"}}>{quizUsersCount.toLocaleString()}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"/>
            <div className="card-footer p-3">
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4 mb-4">
        <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
          <div className="card">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-lg-6 col-7">
                  <h6>Last 10 Registered Users</h6>
                  
                </div>
                
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"></th>
                      <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Email</th>
                      <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">FullName</th>
                      <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Phone</th>
                      <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Address</th>
                      <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Date Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.map((row,index)=>(
                        <tr>
                        <td className='text-center'>
                            <span className="text-xs font-weight-bold"> {index + 1} </span>
                        </td>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm"> {row.email} </h6>
                            </div>
                          </div>
                        </td>
                        <td className="text-sm">
                          <span className="text-xs font-weight-bold"> {row.fullName ? row.fullName : "None"} </span>
                        </td>
                        <td className=" text-sm">
                          <span className="text-xs font-weight-bold"> {row.phone ? row.phone : "None"} </span>
                        </td>
                        <td className=" text-sm" style={{maxWidth:'250px', whiteSpace:'pre-wrap'}}>
                          <span className="text-xs font-weight-bold"> {row.address  ? row.address : "None"} </span>
                        </td>
                        <td className=" text-sm">
                          <span className="text-xs font-weight-bold"> {row.dateRegistered.toDate().toDateString()} </span>
                        </td>
                      </tr>
                    )) }
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card h-100">
          <div class="card-header pb-0">
              <div class="row">
                <div class="col-lg-6 col-7">
                  <h6>Top 10 Quiz Scores</h6>

                </div>
                <div class="col-lg-6 col-5 my-auto text-end">
                <p class="text-sm mb-0">
                    <i class="fa fa-check text-info" aria-hidden="true"></i>
                    <span class="font-weight-bold ms-1">DAY 1</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="card-body p-3">
            <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"></th>
                      <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Email</th>
                      <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Score (Max 10)</th>

                    </tr>
                  </thead>
                  <tbody>
                    {quizUsers.map((row,index)=>(
                        <tr>
                        <td className='text-center'>
                            <span className="text-xs font-weight-bold"> {index + 1} </span>
                        </td>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm"> {row.day1.email} </h6>
                            </div>
                          </div>
                        </td>
                        <td className="text-sm">
                          <span className="text-xs font-weight-bold"> {row.day1.totalCorrect} </span>
                        </td>
 
                      </tr>
                    )) }
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </main>

  )
}
