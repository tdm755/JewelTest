import React, { useState, useEffect } from 'react'

function Kittty() {
  // Kitty Configuration State - Simplified and focused
  const [kittyConfig, setKittyConfig] = useState(() => {
    const savedConfig = localStorage.getItem('kittyConfiguration')
    return savedConfig ? JSON.parse(savedConfig) : {
      minDuration: 6,     // Minimum duration of kitty scheme
      maxDuration: 12,    // Maximum duration of kitty scheme
      minAmount: 10000,   // Minimum kitty amount
      maxAmount: 100000,  // Maximum kitty amount
      adminContributionMonth: 1, // Month when admin contributes
      jewelryTypes: [
        { 
          id: 1, 
          name: 'Gold Necklace Set', 
          minValue: 50000, 
          maxValue: 500000 
        },
        { 
          id: 2, 
          name: 'Diamond Pendant', 
          minValue: 25000, 
          maxValue: 250000 
        },
        { 
          id: 3, 
          name: 'Silver Bracelet', 
          minValue: 10000, 
          maxValue: 100000 
        }
      ]
    }
  })

  // Jewelry Types Management
  const [newJewelryType, setNewJewelryType] = useState({
    name: '',
    minValue: '',
    maxValue: ''
  })

  // Add Jewelry Type
  const addJewelryType = () => {
    const { name, minValue, maxValue } = newJewelryType
    
    // Validation
    if (!name.trim()) {
      alert('Please enter a jewelry type name')
      return
    }
    
    const minVal = Number(minValue)
    const maxVal = Number(maxValue)

    if (minVal <= 0) {
      alert('Minimum value must be greater than 0')
      return
    }
    if (maxVal <= minVal) {
      alert('Maximum value must be greater than minimum value')
      return
    }

    setKittyConfig(prev => ({
      ...prev,
      jewelryTypes: [
        ...prev.jewelryTypes, 
        { 
          id: Date.now(), 
          name,
          minValue: minVal,
          maxValue: maxVal
        }
      ]
    }))
    
    // Reset form
    setNewJewelryType({
      name: '',
      minValue: '',
      maxValue: ''
    })
  }

  // Remove Jewelry Type
  const removeJewelryType = (id) => {
    // Prevent removing if only one jewelry type remains
    if (kittyConfig.jewelryTypes.length <= 1) {
      alert('At least one jewelry type must remain')
      return
    }

    setKittyConfig(prev => ({
      ...prev,
      jewelryTypes: prev.jewelryTypes.filter(type => type.id !== id)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (kittyConfig.minDuration < 6 || kittyConfig.maxDuration > 24) {
      alert('Duration must be between 6 and 24 months')
      return
    }

    if (kittyConfig.minAmount <= 0 || kittyConfig.maxAmount <= kittyConfig.minAmount) {
      alert('Invalid amount range')
      return
    }

    if (kittyConfig.jewelryTypes.length === 0) {
      alert('Please add at least one jewelry type')
      return
    }

    // Validate jewelry types
    const invalidType = kittyConfig.jewelryTypes.find(
      type => type.minValue <= 0 || type.maxValue <= type.minValue
    )
    if (invalidType) {
      alert('Invalid jewelry type values')
      return
    }

    // Save configuration
    localStorage.setItem('kittyConfiguration', JSON.stringify(kittyConfig))
    alert('Kitty configuration saved successfully!')
  }

  // Load existing configuration on component mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('kittyConfiguration')
    if (savedConfig) {
      try {
        setKittyConfig(JSON.parse(savedConfig))
      } catch (error) {
        console.error('Error parsing saved configuration:', error)
      }
    }
  }, [])

  return (
    <div className='p-2 md:p-6 rounded-xl flex flex-col gap-7'>
      <div className="h-24 w-full border rounded-3xl bg-white p-6 shadow-sm flex items-center justify-between">
        <div className="flex justify-evenly md:justify-end w-full gap-4">
          <button 
            type="button"
            className="border border-primary-default text-primary-default py-2 px-4 rounded-xl hover:bg-primary-secondary transition-colors"
            onClick={() => {
              // Reset to default configuration
              setKittyConfig({
                minDuration: 6,
                maxDuration: 12,
                minAmount: 10000,
                maxAmount: 100000,
                adminContributionMonth: 1,
                jewelryTypes: [
                  { 
                    id: 1, 
                    name: 'Gold Necklace Set', 
                    minValue: 50000, 
                    maxValue: 500000 
                  },
                  { 
                    id: 2, 
                    name: 'Diamond Pendant', 
                    minValue: 25000, 
                    maxValue: 250000 
                  },
                  { 
                    id: 3, 
                    name: 'Silver Bracelet', 
                    minValue: 10000, 
                    maxValue: 100000 
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

      <div className='w-full border rounded-3xl bg-white p-6 shadow-sm'>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Minimum Kitty Duration</label>
            <div className="relative">
              <input 
                type="number"
                min="6"
                max="24"
                value={kittyConfig.minDuration}
                onChange={(e) => setKittyConfig(prev => ({...prev, minDuration: Number(e.target.value)}))}
                className="border rounded-xl p-3 w-full pr-12"
                placeholder="Minimum duration"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">Months</span>
            </div>
            <p className="text-sm text-gray-500">Minimum allowed Kitty duration (6-24 months)</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Maximum Kitty Duration</label>
            <div className="relative">
              <input 
                type="number"
                min="6"
                max="24"
                value={kittyConfig.maxDuration}
                onChange={(e) => setKittyConfig(prev => ({...prev, maxDuration: Number(e.target.value)}))}
                className="border rounded-xl p-3 w-full pr-12"
                placeholder="Maximum duration"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">Months</span>
            </div>
            <p className="text-sm text-gray-500">Maximum allowed Kitty duration (6-24 months)</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Minimum Kitty Amount</label>
            <div className="relative">
              <input
                type="number" 
                min="0"
                value={kittyConfig.minAmount}
                onChange={(e) => setKittyConfig(prev => ({...prev, minAmount: Number(e.target.value)}))}
                className="border rounded-xl p-3 w-full pl-8"
                placeholder="Enter min amount"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
            </div>
            <p className="text-sm text-gray-500">Minimum allowed Kitty amount</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Maximum Kitty Amount</label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={kittyConfig.maxAmount}
                onChange={(e) => setKittyConfig(prev => ({...prev, maxAmount: Number(e.target.value)}))}
                className="border rounded-xl p-3 w-full pl-8"
                placeholder="Enter max amount"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
            </div>
            <p className="text-sm text-gray-500">Maximum allowed Kitty amount</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Admin Contribution Month</label>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={kittyConfig.adminContributionMonth}
                onChange={(e) => setKittyConfig(prev => ({...prev, adminContributionMonth: Number(e.target.value)}))}
                className="border rounded-xl p-3 w-full pr-20"
                placeholder="Enter admin contribution month"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">Month</span>
            </div>
            <p className="text-sm text-gray-500">Month when admin contributes</p>
          </div>
        </form>
      </div>

      {/* Jewelry Types Management */}
      <div className='w-full border rounded-3xl bg-white p-6 shadow-sm'>
        <h3 className="text-lg font-medium mb-4">Supported Jewelry Types</h3>
        
        {/* Add New Jewelry Type */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            value={newJewelryType.name}
            onChange={(e) => setNewJewelryType(prev => ({...prev, name: e.target.value}))}
            className="border rounded-xl p-3"
            placeholder="Jewelry Type Name"
          />
          <input
            type="number"
            value={newJewelryType.minValue}
            onChange={(e) => setNewJewelryType(prev => ({...prev, minValue: e.target.value}))}
            className="border rounded-xl p-3"
            placeholder="Minimum Value (₹)"
          />
          <input
            type="number"
            value={newJewelryType.maxValue}
            onChange={(e) => setNewJewelryType(prev => ({...prev, maxValue: e.target.value}))}
            className="border rounded-xl p-3"
            placeholder="Maximum Value (₹)"
          />
          <button 
            onClick={addJewelryType}
            className="bg-primary-default text-white py-2 px-4 rounded-xl hover:bg-primary-secondary transition-colors"
          >
            Add Jewelry Type
          </button>
        </div>

        {/* Existing Jewelry Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kittyConfig.jewelryTypes.map((type) => (
            <div key={type.id} className="border rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{type.name}</p>
                <p className="text-sm text-gray-500">₹{type.minValue} - ₹{type.maxValue}</p>
              </div>
              <button 
                onClick={() => removeJewelryType(type.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-full"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Kittty
