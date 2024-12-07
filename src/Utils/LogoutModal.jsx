import React from 'react'
import LogoutIcon from '../../public/assets/SVGs/LogoutModal.svg'
import { useNavigate } from 'react-router-dom';

function LogoutModal({ setLogoutModal }) {

    const navigate = useNavigate();

    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50">
            <div onClick={() => setLogoutModal(false)} className='absolute top-0 right-0 bottom-0 left-0 bg-[#00000013] z-50'></div>
            <div className="w-96 h-60 bg-white rounded-3xl overflow-hidden relative z-50 flex items-center justify-end shadow-2xl ">
                <div className="absolute top-0 left-0 w-36 h-24 rounded-br-full bg-[#ecedf8] flex items-center justify-center">
                    <img className='w-12' src={LogoutIcon} alt="" />
                </div>
                <div className="flex flex-col gap-10 items-center justify-center mt-7 mr-10">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <h2 className='text-3xl text-primary-text'>LogOut!</h2>
                        <p>Are you sure you want to logout?</p>
                    </div>
                    <div className="flex gap-1">
                        <button onClick={()=>setLogoutModal(false)} className='border px-8 rounded-full py-1.5 text-sm bg-primary-secondary'>Cancel</button>
                        <button onClick={()=>{setLogoutModal(false); navigate('/')}} className='border px-8 rounded-full py-1.5 bg-primary-default text-white text-sm'>LogOut</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal
