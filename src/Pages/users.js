import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { db } from '../firebase';
import LoadingScreen from 'react-loading-screen'

export default function Users() {
const [registeredUsers, setRegisteredUsers] = useState([])
const [loading, setIsLoading] = useState(false)

const getUsers = async () => {
    setIsLoading(true)
    try {
        const registeredRef = collection(db, "registered-users");
        const querySnapshotAll = await getDocs(registeredRef)
        let myArray = []
        querySnapshotAll.forEach((doc) => {
            myArray.push(doc.data())
        });
        setRegisteredUsers(myArray)
        setIsLoading(false) 
    } catch (error) {
       setIsLoading(false) 
    }
}

useEffect( () => {
    getUsers()
},[]);

const customStyles = {
    header: {
        style: {
        minHeight: "56px",
        },
    },
    headRow: {
        style: {
        fontSize: "13px",
        fontWeight: "bold",
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "#dce1e6",
        borderLeftStyle: "solid",
        borderLeftWidth: "1px",
        borderLeftColor: "#dce1e6",
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "#dce1e6",
        },
    },
    headCells: {
        style: {
        "&:not(:last-of-type)": {
            borderRightStyle: "solid",
            borderRightWidth: "1px",
            borderRightColor: "#dce1e6",
        },
        },
    },
    cells: {
        style: {
        "&:not(:last-of-type)": {
            borderRightStyle: "solid",
            borderRightWidth: "1px",
            borderRightColor: "#dce1e6",
        },
        },
    },
    rows: {
        style: {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "#dce1e6",
        borderLeftStyle: "solid",
        borderLeftWidth: "1px",
        borderLeftColor: "#dce1e6",
        },
    },
    };

    const columns = [
    {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        },
    {
        name: "Name",
        selector: (row) => row.fullName,
        sortable: true,
    },
    
    {
        name: "Phone",
        selector: (row) => row.phone,
        sortable: true,
    },
    {
        name: "Address",
        selector: (row) => row.address,
        sortable: true,
    },
    {
        name: "Date Registered",
        selector: (row) => row.dateRegistered.toDate().toDateString(),
        sortable: true,
    },
    {
        name: "Device ID",
        selector: (row) => row.deviceID,
        sortable: true,
    },
    
    
    
];
  return (
    loading ?<LoadingScreen
    loading={loading}
    bgColor='#f1f1f1'
    spinnerColor='#9ee5f8'
    textColor='#676767'
    logoSrc='assets/img/asiwaju-logo.png'
    text='Loading Content'>
        </LoadingScreen>
    :
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            {/* <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li> */}
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Registered Users</h6>
        </nav>
        
      </div>
    </nav>

    <div className="container-fluid py-4">
      <div className="row">
      <div className="card">
            <div className="card-body">
            <DataTable
                title="Registered Users"
                columns={columns}
                data={registeredUsers}
                progressPending={loading}
                pagination
                customStyles={customStyles}
            />
            </div>
        </div>
      </div>
    </div>
  </main>

  )
}
