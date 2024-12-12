import React, { useState } from 'react'
import CompanyLogo from '../../public/assets/Images/CompanyLogo.png'

function Settings() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    // Add password change logic here
    console.log('Password changed')
  }

  const handleEmailChange = (e) => {
    e.preventDefault()
    // Add email change logic here
    console.log('Email updated')
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    // Add password reset logic here using email
    console.log('Password reset email sent')
    setForgotPassword(false)
  }

  return (
    <div className='p-2 md:p-6 rounded-xl flex flex-col gap-7'>
      <div className="h-24 w-full border rounded-3xl bg-white p-6 shadow-sm flex items-center">
        <h2 className="text-2xl font-semibold text-primary-text">Settings</h2>
      </div>

      <div className='min-h-[500px] w-full border rounded-3xl bg-white p-6 shadow-sm flex flex-col gap-8'>
        <div className="flex items-center gap-4">
          <img src={CompanyLogo} alt="Profile" className="w-20 h-20 rounded-full" />
          <div>
            <h3 className="text-xl font-semibold">Admin Profile</h3>
            <p className="text-gray-500">Manage your account settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-4">Change Password</h4>
            {!forgotPassword ? (
              <>
                <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="border rounded-xl p-3"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="border rounded-xl p-3"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="border rounded-xl p-3"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="flex justify-between">
                  <button
                      type="button"
                      onClick={() => setForgotPassword(true)}
                      className='border px-8 rounded-full py-1.5 text- bg-primary-secondary'
                    >
                      Forgot Password?
                    </button>
                    <button
                      type="submit"
                      className='border px-8 rounded-full py-1.5 bg-primary-default text-white'
                    >
                      Update
                    </button>
                   
                  </div>
                </form>
              </>
            ) : (
              <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Enter your email to reset password"
                  className="border rounded-xl p-3"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
                <div className="flex flex-col gap-4 items-center">
                  <button
                    type="submit"
                    className='border px-8 rounded-full py-1.5 bg-primary-default text-white'
                  >
                    Reset Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotPassword(false)}
                    className="text-primary-default hover:text-primary-secondary transition-colors text-sm"
                  >
                    Back to Change Password
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-4">Email Settings</h4>
            <form onSubmit={handleEmailChange} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="New Email Address"
                className="border rounded-xl p-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
             <div className="flex items-center justify-center">
             <button
                type="submit"
               className='border px-8 rounded-full py-1.5 bg-primary-default text-white'
              >
                Update Email
              </button>
             </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
