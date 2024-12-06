import React, { useState } from 'react'
import SearchIcon from '../../public/assets/SVGs/SearchIcon.svg'
import NotificationIcon from '../../public/assets/SVGs/NotificationIcon.svg'
import UserSVGComponent from '../../public/assets/SVGComponents/UserIcon';
import ColorableSvg from '../Hooks/ColorableSvg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import HomeSVGComponent from '../../public/assets/SVGComponents/HomeIcon';
import SettingSVGComponent from '../../public/assets/SVGComponents/SettingIcon';

function Header({setLogoutModal}) {
    const [SearchBarOpen, setSearchBarOpen] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    const { pathname } = location;


    return (
        <div className='fixed top-0 pt-2 right-2 h-20  left-[290px] flex justify-between items-center bg-[#ecedf8] z-50'>

            {/* LeftSection */}
            <div className="px-12 flex flex-col gap-1">
                <h2 className='text-2xl font-semibold text-[#46467f]'>{pathname === '/contactusdetails' ? 'Contact Messages' : pathname === '/notificationpage' ? 'Notifications' : pathname === '/productdetails' ? 'Products' : pathname === '/users' ? 'User Details' : 'Dashboard'}</h2>
                <div className="text-xs  text-gray-500 ml-16">
                    <span>-</span>
                    <button>{pathname === '/contactusdetails' ? 'Contact Messages' : pathname === '/notificationpage' ? 'Notifications' : pathname === '/productdetails' ? 'Products' : pathname === '/users' ? 'Users' : 'Dashboard'}</button>
                </div>
            </div>


            {/* RightSection */}
            <div className="px-10 flex gap-4">
                <div className="">
                    <div className={`overflow-hidden rounded-full relative ${SearchBarOpen ? 'w-96 justify-end px-1.5' : 'w-11 justify-center'} h-11 bg-white flex items-center gap-4  transition-all duration-500 ease-in-out`}>
                        <div className={` rounded-full bg-white absolute ${SearchBarOpen ? 'px-5 border-r p-2.5 left-0' : ''}`}>
                            <img onClick={() => { setSearchBarOpen(true) }} className='w-5 cursor-pointer ' src={SearchIcon} alt="" />
                        </div>
                        <input autoFocus={SearchBarOpen} className={`${SearchBarOpen ? 'w-[90%]' : 'w-0 hidden'} border pl-7 outline-none rounded-r-full p-1.5`} type="text" />
                    </div>
                </div>
                <div onClick={() => {navigate('notificationpage')}} className=" rounded-full w-11 h-11 cursor-pointer bg-white flex items-center justify-center"><img className='w-5' src={NotificationIcon} alt="" /></div>

                <div onClick={() => setDropDown(!dropDown)} className="relative">
                    <div className="flex gap-4 cursor-pointer">
                        <div className=" rounded-full w-11 h-11 bg-white" style={{ backgroundImage: `url('https://avatar.iran.liara.run/public/boy')`, backgroundSize: 'cover' }}></div>
                        <div className="flex flex-col">
                            <span className='text-sm'>Admin User</span>
                            <span className='text-xs text-gray-500'>Admin</span>
                        </div>
                    </div>
                    <div className={`bg-white ${dropDown ? 'h-52 w-64' : 'h-0 w-0'} flex flex-col gap-1 transition-all duration-500 ease-in-out absolute top-16 right-0 rounded-3xl overflow-hidden shadow-2xl`}>
                        <NavLink to={'/'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full  ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <HomeSVGComponent color={pathname === ('/') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Dashboard</span>
                                </div>
                            )}
                        </NavLink>
                        <NavLink to={'users'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full  ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <UserSVGComponent color={pathname === ('users') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Users</span>
                                </div>
                            )}
                        </NavLink>
                        <NavLink to={'setting'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full  ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <SettingSVGComponent color={pathname === ('setting') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Setting</span>
                                </div>
                            )}
                        </NavLink>
                        <div className="flex justify-center w-full">
                            <button onClick={()=>setLogoutModal(true)} className='px-10 py-2 bg-[#ecedf8] rounded-full'>Logout</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header
