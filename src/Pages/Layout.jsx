import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import SideBar from '../Component/SideBar'
import { Outlet, useLocation } from 'react-router-dom'

function Layout({setLogoutModal}) {


    const {pathname} = useLocation();

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [pathname])

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    return (
        <div>
            <Header setLogoutModal={setLogoutModal} isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
            <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} setLogoutModal={setLogoutModal} /> 

            <div className="mt-32 lg:ml-[300px] lg:mr-4">
                <Outlet />
            </div>

        </div>
    )
}

export default Layout
