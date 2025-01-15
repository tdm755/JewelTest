import React, { useState, useEffect } from 'react'

function Dashboard() {
    const [totalUsers, setTotalUsers] = useState(1250)
    const [activePackages, setActivePackages] = useState(850)
    const [completedPackages, setCompletedPackages] = useState(400)
    const [pendingRequests, setPendingRequests] = useState(25)
    const [recentPayments, setRecentPayments] = useState([])
    const [missedPayments, setMissedPayments] = useState([])
    const [consistentPayers, setConsistentPayers] = useState([])

    

    useEffect(() => {
        // Here you would fetch data from your backend/storage
        // For now using mock data
        const mockRecentPayments = [
            { id: 1, name: "John Doe", amount: 5000, date: "2024-01-15", moduleType: "SIP" },
            { id: 2, name: "Jane Smith", amount: 10000, date: "2024-01-14", moduleType: "EMI" },
            { id: 3, name: "Mike Johnson", amount: 7500, date: "2024-01-13", moduleType: "KITTY" }
        ]

        const mockMissedPayments = [
            { id: 4, name: "Alice Brown", dueDate: "2024-01-10", moduleType: "SIP", missedAmount: 3000 },
            { id: 5, name: "Bob Wilson", dueDate: "2024-01-08", moduleType: "EMI", missedAmount: 8000 }
        ]

        const mockConsistentPayers = [
            { id: 6, name: "Sarah Davis", streak: "6 months", moduleType: "KITTY" },
            { id: 7, name: "Tom Harris", streak: "12 months", moduleType: "SIP" }
        ]

        setRecentPayments(mockRecentPayments)
        setMissedPayments(mockMissedPayments)
        setConsistentPayers(mockConsistentPayers)
    }, [])

    return (
        <div className='py-6 px-2 lg:px-0'>
            <div className="flex flex-col lg:flex-row items-start justify-between gap-7">
                <div className="w-full lg:w-[65%] flex flex-col gap-7">
                    <div className="flex flex-wrap gap-7 items-center justify-center">
                        <div className="w-full lg:w-[45%] xl:w-[47%] h-44 border rounded-[35px] bg-gradient-to-br from-purple-50 to-white p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-gray-600 text-lg mb-2">Total Users</h3>
                                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                                        {totalUsers}
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-purple-600 mt-4 flex items-center">
                                <span className="text-sm mr-1">↑</span>
                                12% from last month
                            </p>
                        </div>
                        <div className="w-full lg:w-[45%] xl:w-[47%] h-44 border rounded-[35px] bg-gradient-to-br from-blue-50 to-white p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-gray-600 text-lg mb-2">Active Packages</h3>
                                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                                        {activePackages}
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-blue-600 mt-4 flex items-center">
                                <span className="text-sm mr-1">↑</span>
                                15% from last month
                            </p>
                        </div>
                        <div className="w-full lg:w-[45%] xl:w-[47%] h-44 border rounded-[35px] bg-gradient-to-br from-green-50 to-white p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-gray-600 text-lg mb-2">Completed Packages</h3>
                                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 text-transparent bg-clip-text">
                                        {completedPackages}
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-green-600 mt-4 flex items-center">
                                <span className="text-sm mr-1">↑</span>
                                5% from last month
                            </p>
                        </div>
                        <div className="w-full lg:w-[45%] xl:w-[47%] h-44 border rounded-[35px] bg-gradient-to-br from-orange-50 to-white p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-gray-600 text-lg mb-2">Pending Requests</h3>
                                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 text-transparent bg-clip-text">
                                        {pendingRequests}
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-orange-600 mt-4 flex items-center">
                                <span className="text-sm mr-1">↓</span>
                                3% from last month
                            </p>
                        </div>
                    </div>
                    <div className="h-[500px] bg-white rounded-[35px] p-6">
                        <h2 className="text-xl font-bold mb-4">Recent Payment Activities</h2>
                        <div className="space-y-4">
                            {recentPayments.map(payment => (
                                <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">{payment.name}</h3>
                                        <p className="text-sm text-gray-600">{payment.moduleType}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-green-600">₹{payment.amount}</p>
                                        <p className="text-sm text-gray-500">{payment.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-[35%] flex flex-col gap-7">
                    <div className="h-[500px] border bg-white rounded-[35px] p-6">
                        <h2 className="text-xl font-bold mb-4">Missed Payments</h2>
                        <div className="space-y-4">
                            {missedPayments.map(user => (
                                <div key={user.id} className="p-3 border rounded-lg bg-red-50">
                                    <h3 className="font-semibold">{user.name}</h3>
                                    <p className="text-sm text-gray-600">{user.moduleType}</p>
                                    <p className="text-sm text-red-600">Due: ₹{user.missedAmount}</p>
                                    <p className="text-xs text-gray-500">Due Date: {user.dueDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-[380px] bg-white rounded-[35px] p-6">
                        <h2 className="text-xl font-bold mb-4">Consistent Payers</h2>
                        <div className="space-y-4">
                            {consistentPayers.map(user => (
                                <div key={user.id} className="p-3 border rounded-lg bg-green-50">
                                    <h3 className="font-semibold">{user.name}</h3>
                                    <p className="text-sm text-gray-600">{user.moduleType}</p>
                                    <p className="text-sm text-green-600">Consistent for {user.streak}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className=""></div>
        </div>
    )
}

export default Dashboard
