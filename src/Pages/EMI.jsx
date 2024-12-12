import React, { useState, useEffect } from 'react'

function EMI() {
  // EMI Configuration State
  const [emiConfig, setEmiConfig] = useState(() => {
    const savedConfig = localStorage.getItem('emiConfiguration')
    return savedConfig ? JSON.parse(savedConfig) : {
      loanTypes: [
        { 
          id: 1, 
          name: 'Gold Jewellery Loan', 
          minAmount: 50000, 
          maxAmount: 5000000, 
          minTenure: 6, 
          maxTenure: 36, 
          baseRate: 12.5 
        },
        { 
          id: 2, 
          name: 'Diamond Jewellery Loan', 
          minAmount: 100000, 
          maxAmount: 10000000, 
          minTenure: 12, 
          maxTenure: 60, 
          baseRate: 13.5 
        },
        { 
          id: 3, 
          name: 'Silver Jewellery Loan', 
          minAmount: 25000, 
          maxAmount: 2000000, 
          minTenure: 6, 
          maxTenure: 24, 
          baseRate: 11.5 
        }
      ]
    }
  })

  // New Loan Type State
  const [newLoanType, setNewLoanType] = useState({
    name: '',
    minAmount: '',
    maxAmount: '',
    minTenure: '',
    maxTenure: '',
    baseRate: ''
  })

  // Add Loan Type
  const addLoanType = () => {
    const { name, minAmount, maxAmount, minTenure, maxTenure, baseRate } = newLoanType
    
    // Validation
    if (!name.trim()) {
      alert('Please enter a loan type name')
      return
    }
    
    const minAmt = Number(minAmount)
    const maxAmt = Number(maxAmount)
    const minTen = Number(minTenure)
    const maxTen = Number(maxTenure)
    const rate = Number(baseRate)

    if (minAmt <= 0 || maxAmt <= minAmt) {
      alert('Invalid amount range')
      return
    }

    if (minTen <= 0 || maxTen <= minTen) {
      alert('Invalid tenure range')
      return
    }

    if (rate <= 0 || rate > 30) {
      alert('Interest rate must be between 0 and 30%')
      return
    }

    setEmiConfig(prev => ({
      ...prev,
      loanTypes: [
        ...prev.loanTypes,
        {
          id: Date.now(),
          name,
          minAmount: minAmt,
          maxAmount: maxAmt,
          minTenure: minTen,
          maxTenure: maxTen,
          baseRate: rate
        }
      ]
    }))

    // Reset form
    setNewLoanType({
      name: '',
      minAmount: '',
      maxAmount: '',
      minTenure: '',
      maxTenure: '',
      baseRate: ''
    })
  }

  // Remove Loan Type
  const removeLoanType = (id) => {
    if (emiConfig.loanTypes.length <= 1) {
      alert('At least one loan type must remain')
      return
    }

    setEmiConfig(prev => ({
      ...prev,
      loanTypes: prev.loanTypes.filter(type => type.id !== id)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate loan types
    const invalidType = emiConfig.loanTypes.find(
      type => type.minAmount <= 0 || 
      type.maxAmount <= type.minAmount ||
      type.minTenure <= 0 ||
      type.maxTenure <= type.minTenure ||
      type.baseRate <= 0 ||
      type.baseRate > 30
    )

    if (invalidType) {
      alert('Invalid loan type configuration found')
      return
    }

    // Save configuration
    localStorage.setItem('emiConfiguration', JSON.stringify(emiConfig))
    alert('EMI configuration saved successfully!')
  }

  return (
    <div className='p-2 md:p-6 rounded-xl flex flex-col gap-7'>
      <div className="h-24 w-full border rounded-3xl bg-white p-6 shadow-sm flex items-center justify-between">
        <div className="flex justify-evenly md:justify-end w-full gap-4">
          <button 
            type="button"
            className="border border-primary-default text-primary-default py-2 px-4 rounded-xl hover:bg-primary-secondary transition-colors"
            onClick={() => {
              // Reset to default configuration
              setEmiConfig({
                loanTypes: [
                  { 
                    id: 1, 
                    name: 'Gold Jewellery Loan', 
                    minAmount: 50000, 
                    maxAmount: 5000000, 
                    minTenure: 6, 
                    maxTenure: 36, 
                    baseRate: 12.5 
                  },
                  { 
                    id: 2, 
                    name: 'Diamond Jewellery Loan', 
                    minAmount: 100000, 
                    maxAmount: 10000000, 
                    minTenure: 12, 
                    maxTenure: 60, 
                    baseRate: 13.5 
                  },
                  { 
                    id: 3, 
                    name: 'Silver Jewellery Loan', 
                    minAmount: 25000, 
                    maxAmount: 2000000, 
                    minTenure: 6, 
                    maxTenure: 24, 
                    baseRate: 11.5 
                  }
                ]
              })
            }}
          >
            Reset All
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-primary-default text-white py-2 px-4 rounded-xl hover:bg-primary-secondary transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Add New Loan Type */}
      <div className='w-full border rounded-3xl bg-white p-6 shadow-sm'>
        <h3 className="text-lg font-medium mb-4">Add New Loan Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={newLoanType.name}
              onChange={(e) => setNewLoanType(prev => ({...prev, name: e.target.value}))}
              className="border rounded-xl p-3"
              placeholder="Loan Type Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              value={newLoanType.minAmount}
              onChange={(e) => setNewLoanType(prev => ({...prev, minAmount: e.target.value}))}
              className="border rounded-xl p-3"
              placeholder="Minimum Amount (₹)"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              value={newLoanType.maxAmount}
              onChange={(e) => setNewLoanType(prev => ({...prev, maxAmount: e.target.value}))}
              className="border rounded-xl p-3"
              placeholder="Maximum Amount (₹)"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              value={newLoanType.minTenure}
              onChange={(e) => setNewLoanType(prev => ({...prev, minTenure: e.target.value}))}
              className="border rounded-xl p-3"
              placeholder="Minimum Tenure (Months)"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              value={newLoanType.maxTenure}
              onChange={(e) => setNewLoanType(prev => ({...prev, maxTenure: e.target.value}))}
              className="border rounded-xl p-3"
              placeholder="Maximum Tenure (Months)"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              value={newLoanType.baseRate}
              onChange={(e) => setNewLoanType(prev => ({...prev, baseRate: e.target.value}))}
              className="border rounded-xl p-3"
              placeholder="Base Interest Rate (%)"
            />
          </div>
          <button 
            onClick={addLoanType}
            className="bg-primary-default text-white py-2 px-4 rounded-xl hover:bg-primary-secondary transition-colors"
          >
            Add Loan Type
          </button>
        </div>
      </div>

      {/* Existing Loan Types */}
      <div className='w-full border rounded-3xl bg-white p-6 shadow-sm'>
        <h3 className="text-lg font-medium mb-4">Existing Loan Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emiConfig.loanTypes.map((type) => (
            <div key={type.id} className="border rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{type.name}</h4>
                <button 
                  onClick={() => removeLoanType(type.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <p>Amount Range: ₹{type.minAmount.toLocaleString()} - ₹{type.maxAmount.toLocaleString()}</p>
                <p>Tenure: {type.minTenure} - {type.maxTenure} months</p>
                <p>Base Rate: {type.baseRate}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EMI
