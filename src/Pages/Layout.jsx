import React from 'react'
import Header from '../Component/Header'
import SideBar from '../Component/SideBar'
import { Outlet } from 'react-router-dom'

function Layout({setLogoutModal}) {
    return (
        <div>
            <Header setLogoutModal={setLogoutModal} />
            <SideBar setLogoutModal={setLogoutModal} /> 

            <div className="mt-32 ml-[300px] mr-4">
                <Outlet />
            </div>

        </div>
    )
}

export default Layout
