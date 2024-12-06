import React from 'react'
import NotificationIcon from '../../public/assets/SVGs/NotificationIcon.svg'
import DeleteIcon from '../../public/assets/SVGs/DeleteIcon.svg'

function NotificationModal({ title, message, action }) {
  return (
    <div className='w-full bg-white border rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-300'>
      <div className='flex items-center gap-4'>
        <div className='w-12 h-12 rounded-full bg-[#ecedf8] flex items-center justify-center'>
          <img src={NotificationIcon} alt="notification" className='w-6 h-6' />
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='font-medium text-lg text-primary-text'>{title}</h3>
          <p className='text-sm text-gray-600'>{message}</p>
        </div>
      </div>
      <div className='flex gap-2'>
        <button 
          onClick={action}
          className='px-6 py-2 rounded-full bg-[#ecedf8] text-white text-sm hover:bg-primary-dark transition-colors duration-300'
        >
          <img className='w-5' src={DeleteIcon} alt="" />
        </button>
      </div>
    </div>
  )
}

export default NotificationModal
