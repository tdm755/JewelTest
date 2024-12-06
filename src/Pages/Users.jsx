import React, { useState } from 'react'
import SearchIcon from '../../public/assets/SVGs/SearchIcon.svg'
import EyeIcon from '../../public/assets/SVGs/EyeIcon.svg'
import ArrowIcon from '../../public/assets/SVGs/ArrowIcon.svg'
import ArrowDown from '../../public/assets/SVGs/ArrowDown.svg'

function UserDetails() {
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedRow, setExpandedRow] = useState(null)
    const [AscDesc, setAscDesc] = useState(true);
    const [userDetailsManagementPage, setUserDetailsManagementPage] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fixed interest rates and tenures
    const INTEREST_RATES = {
        SIP: {
            rate: 12, // 12% per annum
            tenures: [12, 24, 36] // months
        },
        EMI: {
            rate: 15, // 15% per annum
            tenures: [3, 6, 12] // months
        },
        KITTY: {
            rate: 8, // 8% per annum
            tenures: [6, 12, 18] // months
        }
    }

    const calculateMonthlyAmount = (totalAmount, tenure, moduleType) => {
        const annualRate = INTEREST_RATES[moduleType].rate / 100;
        const monthlyRate = annualRate / 12;
        
        if (moduleType === 'EMI') {
            const emi = (totalAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                       (Math.pow(1 + monthlyRate, tenure) - 1);
            return Math.round(emi);
        } else {
            const baseMonthly = totalAmount / tenure;
            const interestComponent = baseMonthly * monthlyRate;
            return Math.round(baseMonthly + interestComponent);
        }
    }

    const calculateTotalWithInterest = (baseAmount, tenure, moduleType) => {
        const monthlyAmount = calculateMonthlyAmount(baseAmount, tenure, moduleType);
        return monthlyAmount * tenure;
    }

    const users = [
        {
            id: 1,
            name: 'Arpit Vinay Tiwari',
            phone: '+91 777777777777',
            email: 'tdm75513@gmail.com',
            address: '123 Main St, City, Country',
            joinDate: '2023-01-15',
            status: 'Active',
            packages: [
                {
                    id: 'pkg1',
                    name: 'SIP Module',
                    startDate: '2023-01-20',
                    endDate: '2024-01-19',
                    baseAmount: 50000,
                    totalAmount: calculateTotalWithInterest(50000, 12, 'SIP'),
                    status: 'Active',
                    details: 'Monthly investment in Gold Jewellery',
                    items: 'Gold Necklace, Gold Earrings',
                    tenure: 12,
                    moduleType: 'SIP',
                    monthlyAmount: calculateMonthlyAmount(50000, 12, 'SIP'),
                    paidMonths: [
                        { month: 1, amount: 4650, date: '2023-01-20' },
                        { month: 2, amount: 4650, date: '2023-02-20' },
                        { month: 3, amount: 4650, date: '2023-03-20' }
                    ]
                },
                {
                    id: 'pkg2',
                    name: 'EMI Module',
                    startDate: '2023-02-01',
                    endDate: '2023-08-01',
                    baseAmount: 100000,
                    totalAmount: calculateTotalWithInterest(100000, 6, 'EMI'),
                    status: 'Active',
                    details: 'EMI for Diamond Ring',
                    items: 'Diamond Solitaire Ring',
                    tenure: 6,
                    moduleType: 'EMI',
                    monthlyAmount: calculateMonthlyAmount(100000, 6, 'EMI'),
                    paidMonths: [
                        { month: 1, amount: 17500, date: '2023-02-01' },
                        { month: 2, amount: 17500, date: '2023-03-01' }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'John Doe',
            phone: '+91 888888888888',
            email: 'john@gmail.com',
            address: '456 Oak Ave, Town, Country',
            joinDate: '2023-02-20',
            status: 'Active',
            packages: [
                {
                    id: 'pkg3',
                    name: 'Kitty Module',
                    startDate: '2023-03-01',
                    endDate: '2024-03-01',
                    baseAmount: 75000,
                    totalAmount: calculateTotalWithInterest(75000, 12, 'KITTY'),
                    status: 'Active',
                    details: 'Monthly savings for Wedding Collection',
                    items: 'Bridal Jewellery Set',
                    tenure: 12,
                    moduleType: 'KITTY',
                    monthlyAmount: calculateMonthlyAmount(75000, 12, 'KITTY'),
                    paidMonths: [
                        { month: 1, amount: 6800, date: '2023-03-01' },
                        { month: 2, amount: 6800, date: '2023-04-01' }
                    ]
                }
            ]
        }
    ]

    const calculateCompletionPercentage = (pkg) => {
        const totalPaid = pkg.paidMonths.reduce((sum, month) => sum + month.amount, 0);
        return Math.round((totalPaid / pkg.totalAmount) * 100);
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleManageUser = (user) => {
        setSelectedUser(user);
        setUserDetailsManagementPage(true);
    }

    function HandleUserDetailModalCloseButton() {

        setUserDetailsManagementPage(false);
        setSelectedUser(null);
        
    }

    const markAsPaid = (pkg, month) => {
        if (!pkg.paidMonths.some(pm => pm.month === month)) {
            const newPayment = {
                month,
                amount: pkg.monthlyAmount,
                date: new Date().toISOString().split('T')[0]
            };
            pkg.paidMonths.push(newPayment);
            pkg.paidMonths.sort((a, b) => a.month - b.month);
            setSelectedUser({...selectedUser});
        }
    }

    const isPaidMonth = (pkg, month) => {
        return pkg.paidMonths.some(pm => pm.month === month);
    }

    const getPaidAmount = (pkg, month) => {
        const payment = pkg.paidMonths.find(pm => pm.month === month);
        return payment ? payment.amount : null;
    }

    const getPaymentDate = (pkg, month) => {
        const payment = pkg.paidMonths.find(pm => pm.month === month);
        return payment ? payment.date : null;
    }

    const getRemainingAmount = (pkg) => {
        const totalPaid = pkg.paidMonths.reduce((sum, month) => sum + month.amount, 0);
        return pkg.totalAmount - totalPaid;
    }

    return (
        <div className='p-6 rounded-xl flex flex-col gap-7 relative mb-20'>
            {/* Keep existing search and filter UI */}
            <div className="h-40 w-full border rounded-3xl bg-white p-6 shadow-sm flex justify-center items-center gap-10">
                {/* ... existing filter UI code ... */}
            </div>

            <div className="min-h-[500px] w-full border rounded-3xl bg-white overflow-hidden shadow-sm">
                <div className="p-6">
                    <table className='w-full border-separate border-spacing-x-1'>
                        <thead>
                            <tr className='bg-gray-50'>
                                <th className='p-4 text-left first:rounded-tl-xl'>Sr.No</th>
                                <th className='p-4 text-left'>Name</th>
                                <th className='p-4 text-left'>Phone</th>
                                <th className='p-4 text-left'>Email</th>
                                <th className='p-4 text-left'>Status</th>
                                <th className='p-4 text-left'>Active Plans</th>
                                <th className='p-4 text-left last:rounded-tr-xl'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <React.Fragment key={user.id}>
                                    <tr className={`border-b cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${expandedRow === user.id ? 'bg-gray-50' : ''}`}>
                                        <td className='px-4 py-6'>{index + 1}</td>
                                        <td className='px-4 py-6'>{user.name}</td>
                                        <td className='px-4 py-6'>{user.phone}</td>
                                        <td className='px-4 py-6'>{user.email}</td>
                                        <td className='px-4 py-6'>
                                            <span className={`px-3 py-1 rounded-full text-sm ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className='px-4 py-6'>
                                            {user.packages.filter(pkg => pkg.status === 'Active').length} Active
                                        </td>
                                        <td className='px-4 py-6 flex items-center gap-4 justify-center'>
                                            <img onClick={() => setExpandedRow(expandedRow === user.id ? null : user.id)} className='w-6' src={EyeIcon} alt="" />
                                            <button onClick={() => handleManageUser(user)} className='border px-4 py-1 rounded-full bg-primary-secondary text-primary-default'>
                                                Manage User
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Expanded row details */}
                                    <tr>
                                        <td colSpan={7} className='p-0'>
                                            <div className={`grid transition-all duration-300 ease-in-out ${expandedRow === user.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                                <div className='overflow-hidden'>
                                                    <div className='p-6 bg-gray-50 rounded-xl m-4 shadow-sm'>
                                                        {/* Package details */}
                                                        <div className='mt-6'>
                                                            <div className='font-medium text-gray-700 mb-4'>Jewellery Plans:</div>
                                                            {user.packages.map((pkg, idx) => (
                                                                <div key={idx} className='bg-white p-4 rounded-lg shadow-sm mb-4'>
                                                                    <div className='flex justify-between items-center mb-3'>
                                                                        <h3 className='font-medium text-lg'>{pkg.name}</h3>
                                                                        <div className='flex items-center gap-4'>
                                                                            <div className='text-sm'>
                                                                                Completion: {calculateCompletionPercentage(pkg)}%
                                                                            </div>
                                                                            <span className={`px-3 py-1 rounded-full text-sm ${pkg.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                                                {pkg.status}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='grid grid-cols-4 gap-4 text-sm mb-3'>
                                                                        <div>
                                                                            <div className='text-gray-600'>Start Date</div>
                                                                            <div>{pkg.startDate}</div>
                                                                        </div>
                                                                        <div>
                                                                            <div className='text-gray-600'>End Date</div>
                                                                            <div>{pkg.endDate}</div>
                                                                        </div>
                                                                        <div>
                                                                            <div className='text-gray-600'>Monthly Amount</div>
                                                                            <div>₹{pkg.monthlyAmount}</div>
                                                                        </div>
                                                                        <div>
                                                                            <div className='text-gray-600'>Total Amount</div>
                                                                            <div>₹{pkg.totalAmount}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Management Sidebar */}
            <div className={`scrollbarOf2 absolute top-0 right-0 bottom-0 ${userDetailsManagementPage ? ' w-full p-6 ' : 'w-0 p-0' } transition-all duration-500 ease-in-out z-50 overflow-y-auto bg-white rounded-3xl`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-2xl font-bold ${userDetailsManagementPage === false && 'hidden'}`}>User Management</h2>
                    <button 
                        onClick={() => {HandleUserDetailModalCloseButton()}}
                        className="text-gray-600 hover:text-gray-800 border px-6 py-2 rounded-full"
                    >
                        {/* ✕ */}
                        Close
                    </button>
                </div>

                {selectedUser && userDetailsManagementPage && (
                    <>
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-4">User Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600">Name</p>
                                    <p className="font-medium">{selectedUser.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Email</p>
                                    <p className="font-medium">{selectedUser.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Phone</p>
                                    <p className="font-medium">{selectedUser.phone}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Join Date</p>
                                    <p className="font-medium">{selectedUser.joinDate}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">Active Plans</h3>
                            {selectedUser.packages.map((pkg, index) => (
                                <div key={index} className="bg-white rounded-lg border p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-lg font-medium">{pkg.name}</h4>
                                        <div className='flex items-center gap-4'>
                                            <div className='text-sm font-medium'>
                                                Completion: {calculateCompletionPercentage(pkg)}%
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm ${pkg.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {pkg.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4 mb-6">
                                        <div>
                                            <p className="text-gray-600">Start Date</p>
                                            <p>{pkg.startDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">End Date</p>
                                            <p>{pkg.endDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Monthly Amount</p>
                                            <p>₹{pkg.monthlyAmount}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Remaining Amount</p>
                                            <p>₹{getRemainingAmount(pkg)}</p>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <h5 className="font-medium mb-4">Monthly Payment Updates</h5>
                                        <div className="grid grid-cols-3 gap-4">
                                            {Array.from({ length: pkg.tenure }).map((_, i) => {
                                                const isPaid = isPaidMonth(pkg, i + 1);
                                                const paidAmount = getPaidAmount(pkg, i + 1);
                                                const paymentDate = getPaymentDate(pkg, i + 1);
                                                
                                                return (
                                                    <div key={i} className="border rounded-lg p-4">
                                                        <p className="text-sm font-medium mb-2">Month {i + 1}</p>
                                                        {isPaid ? (
                                                            <div className="bg-green-50 text-green-800 p-2 rounded">
                                                                <div className="text-center mb-1">Paid: ₹{paidAmount}</div>
                                                                <div className="text-xs text-center">Date: {paymentDate}</div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <div className="text-gray-600 mb-2">
                                                                    Amount Due: ₹{pkg.monthlyAmount}
                                                                </div>
                                                                <button 
                                                                    onClick={() => markAsPaid(pkg, i + 1)}
                                                                    className="w-full bg-primary-secondary text-primary-default px-4 py-2 rounded-lg hover:bg-primary-default hover:text-white transition-colors"
                                                                >
                                                                    Mark as Paid
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserDetails
