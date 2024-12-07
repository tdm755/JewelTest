import React, { useState, useEffect } from 'react'
import SearchIcon from '../../public/assets/SVGs/SearchIcon.svg'
import EyeIcon from '../../public/assets/SVGs/EyeIcon.svg'
import ArrowIcon from '../../public/assets/SVGs/ArrowIcon.svg'
import ArrowDown from '../../public/assets/SVGs/ArrowDown.svg'
import ProfileNotCompleted from '../../public/assets/Images/ProfileNotCompleted.png'

function UserDetails() {
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedRow, setExpandedRow] = useState(null)
    const [AscDesc, setAscDesc] = useState(true);
    const [userDetailsManagementPage, setUserDetailsManagementPage] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [expandedPlans, setExpandedPlans] = useState({});
    const [showAddModuleForm, setShowAddModuleForm] = useState(false);
    const [newModule, setNewModule] = useState({
        moduleType: 'SIP',
        baseAmount: '',
        tenure: '',
        items: '',
        details: '',
        profitPercentage: 0
    });

    // Default module configurations
    const [modules, setModules] = useState({
        SIP: {
            baseRate: 12,
            tenures: [12, 24, 36]
        },
        EMI: {
            baseRate: 15,
            tenures: [3, 6, 12]
        },
        KITTY: {
            baseRate: 8,
            tenures: [6, 12, 18]
        }
    });

    // Store user-specific interest rates and profit percentages
    const [userSpecificRates, setUserSpecificRates] = useState({});

    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        joinDate: new Date().toISOString().split('T')[0],
    });

    const calculateMonthlyAmount = (totalAmount, tenure, moduleType, userId, customProfitPercentage = 0) => {
        const baseRate = getEffectiveRate(userId, moduleType);
        const adjustedRate = baseRate + customProfitPercentage;
        const monthlyRate = adjustedRate / 100 / 12;

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

    const calculateTotalWithInterest = (baseAmount, tenure, moduleType, userId, customProfitPercentage = 0) => {
        const monthlyAmount = calculateMonthlyAmount(baseAmount, tenure, moduleType, userId, customProfitPercentage);
        return monthlyAmount * tenure;
    }

    const calculateTotalInterest = (pkg) => {
        return pkg.totalAmount - pkg.baseAmount;
    }

    const calculateTotalProfit = (pkg) => {
        return pkg.baseAmount * (pkg.profitPercentage / 100) * (pkg.tenure / 12);
    }

    const getRemainingAmount = (pkg) => {
        const totalPaid = pkg.paidMonths.reduce((sum, month) => sum + month.amount, 0);
        return pkg.totalAmount - totalPaid;
    }

    const calculateInterestPercentage = (pkg) => {
        const { moduleType } = pkg;
        const baseRate = modules[moduleType].baseRate;
        const userSpecificRate = userSpecificRates[pkg.userId]?.[moduleType] || 0;
        const profitPercentage = pkg.profitPercentage || 0;
        return baseRate + userSpecificRate + profitPercentage;
    };

    const calculateProfitAndEffectiveRate = (pkg) => {
        const baseRate = modules[pkg.moduleType].baseRate;
        const userSpecificRate = userSpecificRates[pkg.userId]?.[pkg.moduleType] || 0;
        const profitPercentage = pkg.profitPercentage || 0;

        const effectiveRate = baseRate + userSpecificRate + profitPercentage;
        const totalInterest = pkg.totalAmount - pkg.baseAmount;
        const profitAmount = pkg.baseAmount * (profitPercentage / 100) * (pkg.tenure / 12);

        return {
            baseRate,
            userSpecificRate,
            profitPercentage,
            effectiveRate,
            totalInterest,
            profitAmount
        };
    }

    const getEffectiveRate = (userId, moduleType) => {
        const baseRate = modules[moduleType].baseRate;
        const userSpecificRate = userSpecificRates[userId]?.[moduleType] || 0;
        return baseRate + userSpecificRate;
    }

    const calculateCompletionPercentage = (pkg) => {
        const totalPaid = pkg.paidMonths.reduce((sum, month) => sum + month.amount, 0);
        return Math.round((totalPaid / pkg.totalAmount) * 100);
    }

    const addNewModule = () => {
        if (!selectedUser || !newModule.baseAmount || !newModule.tenure) return;

        const today = new Date();
        const endDate = new Date(today);
        endDate.setMonth(endDate.getMonth() + parseInt(newModule.tenure));

        const newPkg = {
            id: `pkg${Date.now()}`,
            name: `${newModule.moduleType} Module`,
            startDate: today.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            baseAmount: parseInt(newModule.baseAmount),
            totalAmount: calculateTotalWithInterest(
                parseInt(newModule.baseAmount),
                parseInt(newModule.tenure),
                newModule.moduleType,
                selectedUser.id,
                newModule.profitPercentage
            ),
            status: 'Active',
            details: newModule.details,
            items: newModule.items,
            tenure: parseInt(newModule.tenure),
            moduleType: newModule.moduleType,
            userId: selectedUser.id,
            profitPercentage: parseFloat(newModule.profitPercentage) || 0,
            monthlyAmount: calculateMonthlyAmount(
                parseInt(newModule.baseAmount),
                parseInt(newModule.tenure),
                newModule.moduleType,
                selectedUser.id,
                newModule.profitPercentage
            ),
            paidMonths: []
        };

        const updatedUser = {
            ...selectedUser,
            packages: [...selectedUser.packages, newPkg]
        };
        setSelectedUser(updatedUser);

        // Update the users array with the new package
        const updatedUsers = users.map(user =>
            user.id === selectedUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);

        setShowAddModuleForm(false);
        setNewModule({
            moduleType: 'SIP',
            baseAmount: '',
            tenure: '',
            items: '',
            details: '',
            profitPercentage: 0
        });
    };

    const setUserSpecificRate = (userId, moduleName, rate) => {
        setUserSpecificRates(prev => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                [moduleName]: parseFloat(rate) || 0
            }
        }));
    }

    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Arpit Vinay Tiwari',
            phone: '+91 777777777777',
            email: 'tdm75513@gmail.com',
            address: '123 Main St, City, Country',
            joinDate: '2023-01-15',
            monthlyAmountVisble: false,
            status: 'Active',
            packages: []
        },
        {
            id: 2,
            name: 'John Doe',
            phone: '+91 888888888888',
            email: 'john@gmail.com',
            address: '456 Oak Ave, Town, Country',
            joinDate: '2023-02-20',
            monthlyAmountVisble: false,
            status: 'Active',
            packages: []
        }
    ]);

    const markAsPaid = (pkg, month) => {
        const penaltyAmount = prompt("Enter penalty amount (if any):");
        const penalty = parseFloat(penaltyAmount) || 0;

        if (!pkg.paidMonths.some(pm => pm.month === month)) {
            const newPayment = {
                month,
                amount: pkg.monthlyAmount + penalty,
                date: new Date().toISOString().split('T')[0],
                penalty
            };

            const updatedPkg = {
                ...pkg,
                paidMonths: [...pkg.paidMonths, newPayment].sort((a, b) => a.month - b.month)
            };

            const updatedUser = {
                ...selectedUser,
                packages: selectedUser.packages.map(p =>
                    p.id === pkg.id ? updatedPkg : p
                )
            };

            setSelectedUser(updatedUser);

            // Update the users array
            const updatedUsers = users.map(user =>
                user.id === selectedUser.id ? updatedUser : user
            );
            setUsers(updatedUsers);
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

    const handleManageUser = (user) => {
        window.scrollTo(0, 0);
        setSelectedUser(user);
        setUserDetailsManagementPage(true);
    }

    const HandleUserDetailModalCloseButton = () => {
        setUserDetailsManagementPage(false);
        setSelectedUser(null);
        setShowAddModuleForm(false);
    }

    const togglePlanExpansion = (pkgId) => {
        setExpandedPlans(prev => ({
            ...prev,
            [pkgId]: !prev[pkgId]
        }));
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Function to add a new user
    const addNewUser = () => {
        if (!newUser.name || !newUser.phone || !newUser.email) return;

        const updatedUsers = [...users, { id: Date.now(), ...newUser, packages: [] }];
        setUsers(updatedUsers);
        setShowAddUserForm(false);
        setNewUser({ name: '', phone: '', email: '', address: '', joinDate: new Date().toISOString().split('T')[0] });
    };

    console.log(selectedUser);


    return (
        <div className='p-6 rounded-xl flex flex-col gap-7 relative mb-20'>
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">

            </div>

            {/* Add New User Modal */}
            {showAddUserForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Add New Member</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder="Enter name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={newUser.phone}
                                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder="Enter phone"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    value={newUser.address}
                                    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder="Enter address"
                                />
                            </div>
                            <div className="col-span-2 flex justify-end gap-4">
                                <button
                                    onClick={() => setShowAddUserForm(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={addNewUser}
                                    className="px-4 py-2 bg-primary-default text-white rounded-lg hover:bg-primary-dark"
                                >
                                    Add Member
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search and Filter UI */}
            <div className="h-52 w-full border rounded-3xl bg-white p-6 shadow-sm flex flex-col justify-center items-center gap-10">
                <div className="flex gap-10">
                    <div className="relative">
                        <select className='border relative z-10 cursor-pointer bg-transparent rounded-full pl-7 w-36 pr-2 py-2 flex gap-2 items-center justify-center outline-none appearance-none' name="" id="">
                            <option value="">Show 10</option>
                            <option value="">Show 20</option>
                            <option value="">Show 40</option>
                            <option value="">Show 80</option>
                        </select>
                        <img className='absolute right-4 z-0 top-3 w-5' src={ArrowDown} alt="" />
                    </div>
                    <div className="relative">
                        <select className='border relative z-10 cursor-pointer bg-transparent rounded-full pl-7 w-36 pr-2 py-2 flex gap-2 items-center justify-center outline-none appearance-none' name="" id="">
                            <option value="">Short By</option>
                            <option className='' value="">All</option>
                            <option className='text-green-500' value="">Active</option>
                            <option className='text-red-500' value="">Inactive</option>
                        </select>
                        <img className='absolute right-4 z-0 top-3 w-5' src={ArrowDown} alt="" />
                    </div>

                    <button onClick={() => setAscDesc(!AscDesc)} className='border rounded-full pl-7 w-40 pr-2 py-2 flex gap-2 items-center justify-center'><span className=''>{AscDesc ? 'Ascending' : 'Descending'}</span> <img className={`w-5 ${AscDesc ? 'rotate-90' : '-rotate-90'}`} src={ArrowIcon} alt="" /> </button>

                    <div className="relative">
                        <select className='border relative z-10 cursor-pointer bg-transparent rounded-full pl-7 w-44 pr-2 py-2 flex gap-2 items-center justify-center outline-none appearance-none' name="" id="">
                            <option className='' value="">All</option>
                            <option className='' value="">SIP Members</option>
                            <option className='' value="">EMI Members</option>
                            <option className='' value="">Kitty Members</option>
                        </select>
                        <img className='absolute right-4 z-0 top-3 w-5' src={ArrowDown} alt="" />
                    </div>
                </div>
                <div className="flex gap-10">
                    <div className="w-96 h-12 border rounded-full flex items-center px-4">
                        <img src={SearchIcon} alt="" className="w-5 h-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="flex-1 outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                    </div>
                    <button
                        onClick={() => setShowAddUserForm(true)}
                        className="bg-primary-default text-white px-6 py-3 rounded-full text-sm hover:bg-primary-dark"
                    >
                        Add New Member
                    </button>
                </div>
            </div>

            {/* Users Table */}
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
                                            <img
                                                onClick={() => setExpandedRow(expandedRow === user.id ? null : user.id)}
                                                className='w-6'
                                                src={EyeIcon}
                                                alt=""
                                            />
                                            <button
                                                onClick={() => handleManageUser(user)}
                                                className='border px-4 py-1 rounded-full bg-primary-secondary text-primary-default'
                                            >
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
                                                                    <div className='grid grid-cols-4 gap-4 text-sm'>
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
            <div className={`scrollbarOf2 absolute top-0 right-0 bottom-0 ${userDetailsManagementPage ? ' w-full p-6 ' : 'w-0 p-0'} transition-all duration-500 ease-in-out z-50 overflow-y-auto bg-white rounded-3xl`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-2xl font-bold ${userDetailsManagementPage === false && 'hidden'}`}>User Management</h2>
                    <button
                        onClick={HandleUserDetailModalCloseButton}
                        className="text-gray-600 hover:text-gray-800 border px-6 py-2 rounded-full"
                    >
                        Close
                    </button>
                </div>

                {selectedUser && userDetailsManagementPage && (
                    <>
                        {/* User Details Section */}
                        <div className="rounded-lg p-6 mb-6 bg-gray-50">
                            <h3 className="text-lg font-semibold mb-4">User Details</h3>
                            <div className="grid grid-cols-4 gap-4">
                                <div className='border rounded-xl p-2'>
                                    <p className="text-gray-600">Name</p>
                                    <p className="font-medium">{selectedUser.name}</p>
                                </div>
                                <div className='border rounded-xl p-2'>
                                    <p className="text-gray-600">Email</p>
                                    <p className="font-medium">{selectedUser.email}</p>
                                </div>
                                <div className='border rounded-xl p-2'>
                                    <p className="text-gray-600">Phone</p>
                                    <p className="font-medium">{selectedUser.phone}</p>
                                </div>
                                <div className='border rounded-xl p-2'>
                                    <p className="text-gray-600">Join Date</p>
                                    <p className="font-medium">{selectedUser.joinDate}</p>
                                </div>
                            </div>

                            {/* Module Interest Rates Section */}
                            <div className="rounded-lg py-10">
                                <h3 className="text-lg font-semibold mb-4">Module Interest Rates</h3>
                                <div className="flex gap-4">
                                    {Object.entries(modules).map(([moduleName, moduleData]) => (
                                        <div key={moduleName} className="flex w-full items-center justify-between border bg-white p-4 rounded-xl">
                                            <div>
                                                <h4 className="font-medium">{moduleName}</h4>
                                                <p className="text-sm text-gray-600">
                                                    Default Rate: {moduleData.rate}%
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="number"
                                                    placeholder="Custom Rate %"
                                                    className="border rounded-full px-3 py-2 w-44 outline-none"
                                                    value={userSpecificRates[selectedUser.id]?.[moduleName] || ''}
                                                    onChange={(e) => setUserSpecificRate(selectedUser.id, moduleName, parseFloat(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Add New Module Button */}
                        <div className="mb-6 flex items-center justify-center">
                            <button
                                onClick={() => setShowAddModuleForm(true)}
                                className="bg-primary-default text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors"
                            >
                                Add New Module
                            </button>
                        </div>

                        {/* Add New Module Form */}
                        {showAddModuleForm && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Add New Module</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex col-span-2 gap-4">
                                        <div className='w-1/3'>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Module Type
                                            </label>
                                            <select
                                                value={newModule.moduleType}
                                                onChange={(e) => setNewModule({ ...newModule, moduleType: e.target.value })}
                                                className="w-full border rounded-lg px-3 py-2"
                                            >
                                                <option value="SIP">SIP</option>
                                                <option value="EMI">EMI</option>
                                                <option value="KITTY">KITTY</option>
                                            </select>
                                        </div>
                                        <div className='w-1/3'>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tenure (months)
                                            </label>
                                            <select
                                                value={newModule.tenure}
                                                onChange={(e) => setNewModule({ ...newModule, tenure: e.target.value })}
                                                className="w-full border rounded-lg px-3 py-2"
                                            >
                                                <option value="">Select tenure</option>
                                                {modules[newModule.moduleType].tenures.map(tenure => (
                                                    <option key={tenure} value={tenure}>{tenure} months</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='w-1/3'>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Items
                                            </label>
                                            <input
                                                type="text"
                                                value={newModule.items}
                                                onChange={(e) => setNewModule({ ...newModule, items: e.target.value })}
                                                className="w-full border rounded-lg px-3 py-2"
                                                placeholder="Enter items"
                                            />
                                        </div>
                                        <div className='w-1/3'>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Base Amount
                                            </label>
                                            <input
                                                type="number"
                                                value={newModule.baseAmount}
                                                onChange={(e) => setNewModule({ ...newModule, baseAmount: e.target.value })}
                                                className="w-full border rounded-lg px-3 py-2"
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    </div>


                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Details
                                        </label>
                                        <textarea
                                            value={newModule.details}
                                            onChange={(e) => setNewModule({ ...newModule, details: e.target.value })}
                                            className="w-full border rounded-lg px-3 py-2"
                                            placeholder="Enter details"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-4">
                                        <button
                                            onClick={() => setShowAddModuleForm(false)}
                                            className='border px-8 rounded-full py-1.5 bg-primary-secondary'
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={addNewModule}
                                            className='border px-8 rounded-full py-1.5 bg-primary-default text-white'
                                        >
                                            Add Module
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Active Plans Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">Active Plans</h3>
                            {selectedUser.packages.length > 0 ? selectedUser.packages.map((pkg, index) => (
                                <div key={index} className="bg-white rounded-lg border p-6">
                                    <div
                                        className="flex justify-between items-center mb-4 cursor-pointer"
                                        onClick={() => togglePlanExpansion(pkg.id)}
                                    >
                                        <h4 className="text-lg font-medium">{pkg.name}</h4>
                                        <div className='flex items-center gap-4'>
                                            <div className='text-sm font-medium'>
                                                Completion: {calculateCompletionPercentage(pkg)}%
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm ${pkg.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {pkg.status}
                                            </span>
                                            <img
                                                src={ArrowDown}
                                                alt="Toggle"
                                                className={`w-4 h-4 transition-transform duration-300 ${expandedPlans[pkg.id] ? 'rotate-180' : ''}`}
                                            />
                                        </div>
                                    </div>

                                    <div className={`transition-all duration-300 ${expandedPlans[pkg.id] ? 'block' : 'hidden'}`}>
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
                                                <p className="text-gray-600">Interest Percentage</p>
                                                <p>{calculateInterestPercentage(pkg)}%</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 mb-6">
                                            <div>
                                                <p className="text-gray-600">Total Amount</p>
                                                <p>₹{pkg.totalAmount}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Total Interest</p>
                                                <p>₹{calculateTotalInterest(pkg)}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Total Profit</p>
                                                <p>₹{calculateTotalProfit(pkg)}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Remaining Amount</p>
                                                <p>₹{getRemainingAmount(pkg)}</p>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <h5 className="font-medium mb-4">Monthly Payment Updates</h5>
                                            <div className="text-sm mb-2">
                                                Total Penalty: <span className="text-red-600">₹{pkg.paidMonths.reduce((total, pm) => total + (pm.penalty || 0), 0)}</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                {Array.from({ length: pkg.tenure }).map((_, i) => {
                                                    const isPaid = isPaidMonth(pkg, i + 1);
                                                    const paidAmount = getPaidAmount(pkg, i + 1);
                                                    const paymentDate = getPaymentDate(pkg, i + 1);
                                                    const penalty = pkg.paidMonths.find(pm => pm.month === i + 1)?.penalty || 0;

                                                    return (
                                                        <div key={i} className="border rounded-lg p-4">
                                                            <p className="text-sm font-medium mb-2">Month {i + 1}</p>
                                                            {isPaid ? (
                                                                <div className="bg-green-50 text-green-800 p-2 rounded">
                                                                    <div className="text-center mb-1">Paid: ₹{paidAmount >= 0 ? paidAmount : `-${Math.abs(paidAmount)}`}</div>
                                                                    {penalty > 0 && (
                                                                        <div className="text-red-600 text-center">Penalty: ₹{penalty}</div>
                                                                    )}
                                                                    <div className="text-xs text-center">Date: {paymentDate}</div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className="text-gray-600 mb-2">
                                                                        Amount Due: ₹{pkg.monthlyAmount >= 0 ? pkg.monthlyAmount : `-${Math.abs(pkg.monthlyAmount)}`}
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
                                </div>
                            )) : <div className='flex flex-col items-center justify-center'>
                                    <img className='w-96' src={ProfileNotCompleted} alt="" />
                                    <h4 className='text-2xl font-mono'>No Plans Activated Yet</h4>
                                 </div>}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserDetails
