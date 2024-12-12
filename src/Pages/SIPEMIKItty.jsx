import React, { useState, useEffect } from 'react'

function SIPEMIKItty() {
  // SIP Configuration State
  const [sipConfig, setSipConfig] = useState(() => {
    const savedConfig = localStorage.getItem('sipConfiguration')
    return savedConfig ? JSON.parse(savedConfig) : {
      plans: [
        { 
          id: 1, 
          name: 'Gold SIP', 
          rate: 8.5, 
          minInvestment: 100,
          maxInvestment: 100000,
          tenure: [12, 24, 36, 48, 60] 
        },
        { 
          id: 2, 
          name: 'Silver SIP', 
          rate: 7.2, 
          minInvestment: 500,
          maxInvestment: 50000,
          tenure: [12, 24, 36] 
        },
        { 
          id: 3, 
          name: 'Diamond SIP', 
          rate: 9.0, 
          minInvestment: 500,
          maxInvestment: 200000,
          tenure: [24, 36, 48, 60] 
        }
      ]
    }
  })

  // New Plan State
  const [newPlan, setNewPlan] = useState({
    name: '',
    rate: '',
    minInvestment: '',
    maxInvestment: '',
    tenure: []
  })

  // Add Plan
  const addPlan = () => {
    const { name, rate, minInvestment, maxInvestment, tenure } = newPlan
    
    // Validation
    if (!name.trim()) {
      alert('Please enter a plan name')
      return
    }
    
    const rateNum = Number(rate)
    const minInv = Number(minInvestment)
    const maxInv = Number(maxInvestment)

    if (rateNum <= 0 || rateNum > 20) {
      alert('Interest rate must be between 0 and 20%')
      return
    }

    if (minInv <= 0 || maxInv <= minInv) {
      alert('Invalid investment range')
      return
    }

    if (!tenure.length) {
      alert('Please add at least one tenure option')
      return
    }

    setSipConfig(prev => ({
      ...prev,
      plans: [
        ...prev.plans,
        {
          id: Date.now(),
          name,
          rate: rateNum,
          minInvestment: minInv,
          maxInvestment: maxInv,
          tenure: tenure.split(',').map(t => parseInt(t.trim())).filter(t => !isNaN(t))
        }
      ]
    }))

    // Reset form
    setNewPlan({
      name: '',
      rate: '',
      minInvestment: '',
      maxInvestment: '',
      tenure: ''
    })
  }

  // Remove Plan
  const removePlan = (id) => {
    if (sipConfig.plans.length <= 1) {
      alert('At least one plan must remain')
      return
    }

    setSipConfig(prev => ({
      ...prev,
      plans: prev.plans.filter(plan => plan.id !== id)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate plans
    const invalidPlan = sipConfig.plans.find(
      plan => plan.rate <= 0 || 
      plan.rate > 20 ||
      plan.minInvestment <= 0 ||
      plan.maxInvestment <= plan.minInvestment ||
      !plan.tenure.length
    )

    if (invalidPlan) {
      alert('Invalid plan configuration found')
      return
    }

    // Save configuration
    localStorage.setItem('sipConfiguration', JSON.stringify(sipConfig))
    alert('SIP configuration saved successfully!')
  }

  return (
    <div className='p-2 md:p-6 rounded-xl flex flex-col gap-7'>
      <div className="h-24 w-full border rounded-3xl bg-white p-6 shadow-sm flex">
        <div className="flex justify-evenly md:justify-end w-full gap-4">
          <button 
            type="button"
            className="border border-primary-default text-primary-default py-2 px-4 rounded-xl hover:bg-primary-secondary transition-colors"
            onClick={() => {
              // Reset to default configuration
              setSipConfig({
                plans: [
                  { 
                    id: 1, 
                    name: 'Gold SIP', 
                    rate: 8.5, 
                    minInvestment: 100,
                    maxInvestment: 100000,
                    tenure: [12, 24, 36, 48, 60] 
                  },
                  { 
                    id: 2, 
                    name: 'Silver SIP', 
                    rate: 7.2, 
                    minInvestment: 500,
                    maxInvestment: 50000,
                    tenure: [12, 24, 36] 
                  },
                  { 
                    id: 3, 
                    name: 'Diamond SIP', 
                    rate: 9.0, 
                    minInvestment: 500,
                    maxInvestment: 200000,
                    tenure: [24, 36, 48, 60] 
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

      {/* Add New SIP Plan */}
      <div className='w-full border rounded-3xl bg-white p-6 shadow-sm'>
        <h3 className="text-lg font-medium mb-4">Add New SIP Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            value={newPlan.name}
            onChange={(e) => setNewPlan(prev => ({...prev, name: e.target.value}))}
            className="border rounded-xl p-3"
            placeholder="Plan Name"
          />
          <div className="relative">
            <input
              type="number"
              value={newPlan.rate}
              onChange={(e) => setNewPlan(prev => ({...prev, rate: e.target.value}))}
              className="border rounded-xl p-3 w-full pr-8"
              placeholder="Interest Rate"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={newPlan.minInvestment}
              onChange={(e) => setNewPlan(prev => ({...prev, minInvestment: e.target.value}))}
              className="border rounded-xl p-3 w-full pl-8"
              placeholder="Min Investment"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={newPlan.maxInvestment}
              onChange={(e) => setNewPlan(prev => ({...prev, maxInvestment: e.target.value}))}
              className="border rounded-xl p-3 w-full pl-8"
              placeholder="Max Investment"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          </div>
          <input
            type="text"
            value={newPlan.tenure}
            onChange={(e) => setNewPlan(prev => ({...prev, tenure: e.target.value}))}
            className="border rounded-xl p-3"
            placeholder="Tenure (comma-separated months)"
          />
          <button 
            onClick={addPlan}
            className="bg-primary-default text-white py-2 px-4 rounded-xl hover:bg-primary-secondary transition-colors"
          >
            Add Plan
          </button>
        </div>
      </div>

      {/* Existing SIP Plans */}
      <div className='w-full border rounded-3xl bg-white p-6 shadow-sm'>
        <h3 className="text-lg font-medium mb-4">Existing SIP Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sipConfig.plans.map((plan) => (
            <div key={plan.id} className="border rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{plan.name}</h4>
                <button 
                  onClick={() => removePlan(plan.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                <p>Interest Rate: {plan.rate}% p.a.</p>
                <p>Investment Range: ₹{plan.minInvestment.toLocaleString()} - ₹{plan.maxInvestment.toLocaleString()}</p>
                <p>Available Tenures: {plan.tenure.join(', ')} months</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Active SIP Plans</h3>
          <p className="text-3xl font-semibold text-primary-default">127</p>
          <p className="text-sm text-gray-500 mt-1">Total active plans this month</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Total SIP Amount</h3>
          <p className="text-3xl font-semibold text-primary-default">₹8.5L</p>
          <p className="text-sm text-gray-500 mt-1">Cumulative investment amount</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Average SIP Value</h3>
          <p className="text-3xl font-semibold text-primary-default">₹6,692</p>
          <p className="text-sm text-gray-500 mt-1">Per plan average amount</p>
        </div>
      </div>
    </div>
  )
}

export default SIPEMIKItty
