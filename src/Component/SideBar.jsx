import React, { useRef } from 'react'
import NotificationIcon from '../../public/assets/SVGs/NotificationIcon.svg';
import HomeIcon from '../../public/assets/SVGs/HomeIcon.svg';
import ContactUsIcon from '../../public/assets/SVGs/ContactUsIcon.svg';
import UserIcon from '../../public/assets/SVGs/UserIcon.svg';
import SettingIcon from '../../public/assets/SVGs/SettingIcon.svg';
import ArrowIcon from '../../public/assets/SVGs/ArrowIcon.svg';
import { NavLink, useLocation } from 'react-router-dom';
import ContactSVGComponent from '../../public/assets/SVGComponents/ContactUsIcon';
import ColorableSvg from '../Hooks/ColorableSvg';
import HomeSVGComponent from '../../public/assets/SVGComponents/HomeIcon';
import ProductSVGComponent from '../../public/assets/SVGComponents/ProductIcon';
import SettingSVGComponent from '../../public/assets/SVGComponents/SettingIcon';
import UserSVGComponent from '../../public/assets/SVGComponents/UserIcon';
import ClickSound from '../../public/assets/ClickSoundEffect.mp3';
import SIPIcon from '../../public/assets/SVGs/SIPIcon.svg'
import EMIIcon from '../../public/assets/SVGs/EMIIcon.svg'
import KittyIcon from '../../public/assets/SVGs/KittyIcon.svg'
import SIPIconSVGComponent from '../../public/assets/SVGComponents/SIPIcon';
import EMIIconSVGComponent from '../../public/assets/SVGComponents/EMIIcon';
import KittyIconSVGComponent from '../../public/assets/SVGComponents/KittyIcon';
import NotificationIconSVGComponent from '../../public/assets/SVGComponents/NotificationIcon';
import AddMemSVGComponent from '../../public/assets/SVGComponents/AddMemIcon';


function SideBar({setLogoutModal}) {
    const audioRef = useRef(null);
    const location = useLocation();
    const { pathname } = location;

    const handleLogout = () => {
        audioRef.current.play();
        setLogoutModal(true);
    }

    return (
        <div className='fixed top-2 left-2 bottom-2 rounded-2xl bg-white w-[270px] p-3 overflow-y-auto scrollbarOf'>
            <div className="flex flex-col gap-7 mb- items-center justify-between h-full">
                <div className="flex flex-col items-center justify-center w-full h-40 bg-white">
                    <div className="text-xl font-bold text-gray-800 tracking-wide">
                        Geeks
                    </div>
                    <div className="text-sm font-light text-gray-500 tracking-widest uppercase">
                        Admin Panel
                    </div>
                </div>

                <div className=" w-full flex flex-col gap-4">
                    {/* Dashboard Section */}
                    <div className="flex flex-col gap-1">
                        <h4 className='text-gray-500 text-sm font-medium'>Menu</h4>
                        <NavLink to={'dashboard'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full border rounded-2xl ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <HomeSVGComponent color={pathname === ('/') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Dashboard</span>
                                </div>
                            )}
                        </NavLink>
                        {/* <NavLink to={'/'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full border rounded-2xl ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex justify-between items-center px-4 group cursor-pointer transition-all`}>
                                    <div className="flex gap-4 items-center justify-start ">
                                        <ColorableSvg color="" width={24} height={24}>
                                        <HomeSVGComponent color={pathname === ('/') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Dashboard</span>
                                    </div>
                                    <span className='mr-2.5'>--</span>
                                </div>
                            )}
                        </NavLink> */}
                        <NavLink to={'contactusdetails'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full border rounded-2xl ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <ContactSVGComponent color={pathname === ('contactusdetails') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Contact Us</span>
                                </div>
                            )}
                        </NavLink>
                        <NavLink to={'notificationpage'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full border rounded-2xl ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <NotificationIconSVGComponent color={pathname === ('notificationpage') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Notifications</span>
                                </div>
                            )}
                        </NavLink>

                    </div>

                    {/* Features Section */}
                    <div className="flex flex-col gap-1">
                        <h4 className='text-gray-500 text-sm font-medium'>Features</h4>

                        <NavLink to={'productdetails'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full border rounded-2xl ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <ProductSVGComponent color={pathname === ('productdetails') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Product</span>
                                </div>
                            )}
                        </NavLink>
                        <NavLink to={'addmembers'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full cursor-not-allowed border rounded-2xl ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <AddMemSVGComponent color={pathname === ('addmembers') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Add New Members</span>
                                </div>
                            )}
                        </NavLink>
                        <NavLink to={'sip'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full border cursor-not-allowed rounded-2xl ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <SIPIconSVGComponent color={pathname === ('sip') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>SIP</span>
                                </div>
                            )}
                        </NavLink>
                        <NavLink to={'emi'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full border cursor-not-allowed rounded-2xl ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <EMIIconSVGComponent color={pathname === ('emi') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>EMI</span>
                                </div>
                            )}
                        </NavLink>
                        <NavLink to={'kitty'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full border cursor-not-allowed rounded-2xl ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <KittyIconSVGComponent color={pathname === ('kitty') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Kitty</span>
                                </div>
                            )}
                        </NavLink>
                        <NavLink to={'users'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full border rounded-2xl ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <UserSVGComponent color={pathname === ('users') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Users</span>
                                </div>
                            )}
                        </NavLink>
                    </div>


                    {/* Actions Section */}
                    <div className="">
                        <h4 className='text-gray-500 text-sm font-medium'>Actions</h4>
                        <NavLink to={'setting'}>
                            {({ isActive }) => (
                                <div className={`h-12 w-full border cursor-not-allowed rounded-2xl ${isActive ? 'bg-primary-default text-white' : 'text-primary-text'} hover:bg-primary-default flex gap-4 items-center justify-start px-4 group cursor-pointer transition-all`}>
                                    <ColorableSvg color="" width={24} height={24}>
                                        <SettingSVGComponent color={pathname === ('setting') && 'white'} />
                                    </ColorableSvg>
                                    <span className='group-hover:text-white'>Setting</span>
                                </div>
                            )}
                        </NavLink>
                    </div>
                </div>

                {/* User Profile Section */}
                <div className=" w-full pr-4 mt-10">
                    <div className=" h-40 rounded-b-2xl mb-4 py-4 px-2.5 relative bg-[#ecedf8] flex flex-col justify-between ">
                        <div className="w-24 h-24 rounded-full bg-gray-300 border-8 border-white absolute -top-7 -right-7" style={{ backgroundImage: `url('https://avatar.iran.liara.run/public/boy')`, backgroundSize: 'cover' }}></div>
                        <div className="flex items-center gap-3 ">
                            <div>
                                <h4 className="font-medium">Admin User</h4>
                                <p className="text-sm text-gray-500">admin@geeks.com</p>
                            </div>
                        </div>
                        <audio ref={audioRef} muted src={ClickSound} className="hidden" />
                        <div className="flex justify-between w-full">
                            <button onClick={handleLogout} className='px-10 py-2 bg-white rounded-full'>Logout</button>
                            <button className='px-2 py-2 w-10 h-10 bg-white rounded-full flex items-center justify-center'><img className='-rotate-45 w-5' src={ArrowIcon} alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
