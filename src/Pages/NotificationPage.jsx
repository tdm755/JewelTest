import React, { useState } from 'react'
import NotificationUtil from '../Utils/NotificationModal';
import SearchIcon from '../../public/assets/SVGs/SearchIcon.svg'
import DeleteIcon from '../../public/assets/SVGs/DeleteIcon.svg'

function NotificationPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      title: "New SIP Request",
      message: "Rahul Kumar has requested a new SIP plan for 22K Gold Necklace worth ₹50,000.",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "EMI Payment Due",
      message: "EMI payment of ₹5,000 is due for Diamond Ring from Priya Sharma.",
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      title: "New Kitty Member",
      message: "Anjali Gupta has joined Gold Savings Kitty scheme with monthly contribution of ₹2,000.",
      timestamp: "1 day ago"
    },
    {
      id: 4,
      title: "Customer Enquiry",
      message: "New message from Amit Patel: Interested in Gold coin SIP scheme, please provide details.",
      timestamp: "2 days ago"
    },
    {
      id: 5,
      title: "EMI Payment Received",
      message: "EMI payment of ₹10,000 received from Meera Singh for Diamond Bracelet.",
      timestamp: "2 days ago"
    },
    {
      id: 6,
      title: "Kitty Maturity Alert",
      message: "Gold Savings Kitty for Sunita Verma will mature in 7 days. Total value: ₹24,000",
      timestamp: "3 days ago"
    }
  ];

  const handleAction = (id) => {
    console.log(`Notification ${id} deleted`);
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='p-2 md:p-6 rounded-xl flex flex-col gap-7'>
      <div className=" w-full border rounded-3xl bg-white p-6 shadow-sm flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
        {/* <h2 className="text-2xl font-semibold text-primary-text">Notifications</h2> */}
        <div className="flex items-center gap-4 w-96 border rounded-full px-4 py-2 hover:shadow-md transition-shadow duration-300">
          <img src={SearchIcon} alt="search" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search notifications..."
            className="outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button className='border rounded-full  px-7 py-2 flex gap-2 items-center justify-center'><img className='w-5' src={DeleteIcon} alt="" /> Clear All</button>
      </div>

      <div className='min-h-[500px] w-full border rounded-3xl bg-white p-6 shadow-sm flex flex-col gap-4'>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationUtil
              key={notification.id}
              title={notification.title}
              message={`${notification.message} • ${notification.timestamp}`}
              action={() => handleAction(notification.id)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No notifications found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationPage
