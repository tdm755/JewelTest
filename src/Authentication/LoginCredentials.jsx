import React, { useState } from 'react'
import CompanyLogo from '../../public/assets/Images/CompanyLogo.png'
import JewelleryDoodle from '../../public/assets/Images/JewelleryDoodle.jpg'
import { useNavigate } from 'react-router-dom';

function LoginCredentials() {
  const [view, setView] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
  };

  return (
    <div className='h-[100vh]' style={{backgroundImage : `url(${JewelleryDoodle})`, backgroundSize : 'cover', backgroundPosition : 'center', backgroundRepeat : 'no-repeat'}}>
      <div className="flex items-center justify-center h-full gap-2">
        <div className={`${!view ? 'w-[600px] h-[600px]' : 'w-32 h-32'} shadow-2xl transition-all duration-500 ease-in-out rounded-full bg-white flex items-center justify-center overflow-hidden`}>
          {!view ? (
            <div className="w-[400px] flex flex-col gap-7">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Forgot Password</h2>
              <form className='flex flex-col gap-5'>
                <div className="mb-4">
                  <input
                    className="appearance-none border rounded-xl w-full p-4 text-gray-700 leading-tight focus:outline-none"
                    type="email" 
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <button 
                    className="w-full bg-primary-default text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-secondary transition-colors"
                    type="submit"
                  >
                    Reset Password
                  </button>
                  <button
                    onClick={() => setView(true)}
                    className="text-primary-default hover:text-primary-secondary transition-colors"
                    type="button"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          ) : <img className='w-24 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer rounded-full' src={CompanyLogo} alt="" />}
        </div>
        <div className={`${view ? 'w-[600px] h-[600px]' : 'w-32 h-32'} shadow-2xl transition-all duration-500 ease-in-out rounded-full bg-white flex items-center justify-center overflow-hidden`}>
         {view ?  <div className="w-[400px] flex flex-col gap-7">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Admin Login</h2>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
              <div className="">
                <div className="mb-4">
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label> */}
                  <input
                    className="appearance-none border rounded-xl w-full p-4 text-gray-700 leading-tight focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label> */}
                  <input
                    className="appearance-none border rounded-xl w-full p-4 text-gray-700 leading-tight focus:outline-none"
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-between">
                <div className="flex items-center justify-between mb-6 w-full">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-default focus:ring-primary-default border-gray-300 rounded"
                      checked={credentials.rememberMe}
                      onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <button onClick={()=>setView(false)} className="font-medium text-primary-default hover:text-primary-secondary">
                      Forgot password?
                    </button>
                  </div>
                </div>
                <button
                  onClick={(e)=>{e.preventDefault(); navigate('/dashboard')}}
                  className="bg-primary-default hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-64"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div> :  <img className='w-24 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer rounded-full' src={CompanyLogo} alt="" />}
        </div>
      </div>
    </div>
  )
}

export default LoginCredentials
