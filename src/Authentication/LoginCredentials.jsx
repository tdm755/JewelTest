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
    <div className='h-[100vh]'>
      <div className="flex flex-col md:flex-row items-center justify-center h-full gap-2">
        <div className={`${!view ? 'w-full md:w-1/2 h-[600px]' : 'w-32 h-32'} shadow-2xl transition-all duration-500 ease-in-out rounded-full bg-white flex items-center justify-center overflow-hidden`}>
          {!view ? (
            <div className="w-[400px] flex flex-col gap-7">
              <h2 className="text-3xl text-primary-default mb-10 text-center tracking-wide">Forgot Password</h2>
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
                   className="bg-primary-default hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-64"
                    type="submit"
                  >
                    Reset Password
                  </button>
                  <button
                    onClick={() => setView(true)}
                    className="hover:text-primary-default text-gray-500 transition-colors"
                    type="button"
                  >
                    Return to Login Portal
                  </button>
                </div>
              </form>
            </div>
          ) : 
          // <img className='w-24 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer rounded-full' src={CompanyLogo} alt="" />
          <span>Your Logo</span>
          }
        </div>
        <div className={`${view ? 'w-full md:w-1/2 h-[600px]' : 'w-32 h-32'} border border-primary-secondary shadow-2xl transition-all duration-500 ease-in-out rounded-full bg-white flex items-center justify-center overflow-hidden`}>
         {view ?  <div className="w-[400px] flex flex-col gap-7">
          <div className="">
          <h2 className="text-xl text-primary-default text-center tracking-wide">Admin Login</h2>
          <h2 className="text-3xl text-primary-default mb-10 text-center tracking-wide">Welcome Back!</h2>
          </div>
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
                <div className="flex w-[80%] items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-default focus:ring-primary-default border-gray-300 rounded"
                      checked={credentials.rememberMe}
                      onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600  hover:text-primary-default cursor-pointer">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <button onClick={()=>setView(false)} className=" hover:text-primary-default text-gray-600">
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
          </div> : 
          //  <img className='w-24 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer rounded-full' src={CompanyLogo} alt="" />
          <span>Your Logo</span>
           }
        </div>
      </div>
    </div>
  )
}

export default LoginCredentials
