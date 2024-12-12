import React, { useState } from 'react'
import SearchIcon from '../../public/assets/SVGs/SearchIcon.svg'
import AddIcon from '../../public/assets/SVGs/AddIcon.svg'
import GridViewIcon from '../../public/assets/SVGs/GridViewIcon.svg'
import TableViewIcon from '../../public/assets/SVGs/TableViewIcon.svg'
import EditIcon from '../../public/assets/SVGs/EditIcon.svg'
import DeleteIcon2 from '../../public/assets/SVGs/DeleteIcon2.svg'

function ProductPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('table') // 'grid' or 'table'
  const [showAddModal, setShowAddModal] = useState(false)
  const [productsList, setProductsList] = useState([
    {
      id: 1,
      name: "Diamond Ring",
      category: "Rings",
      price: "₹50,000",
      stock: 10,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500"
    },
    {
      id: 2,
      name: "Gold Necklace",
      category: "Necklaces",
      price: "₹75,000",
      stock: 5,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500"
    },
    {
      id: 3,
      name: "Pearl Earrings",
      category: "Earrings",
      price: "₹25,000",
      stock: 15,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500"
    },
    {
      id: 4,
      name: "Diamond Bracelet",
      category: "Bracelets",
      price: "₹45,000",
      stock: 8,
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500"
    },
    {
      id: 5,
      name: "Gold Chain",
      category: "Chains",
      price: "₹35,000",
      stock: 12,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500"
    },
    {
      id: 6,
      name: "Ruby Ring",
      category: "Rings",
      price: "₹65,000",
      stock: 6,
      image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500"
    },
    {
      id: 7,
      name: "Sapphire Pendant",
      category: "Pendants",
      price: "₹55,000",
      stock: 9,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=500"
    },
    {
      id: 8,
      name: "Diamond Anklet",
      category: "Anklets",
      price: "₹30,000",
      stock: 7,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500"
    }
  ])
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: ''
  })

  const handleAddProduct = (e) => {
    e.preventDefault()
    const newProductWithId = {
      ...newProduct,
      id: productsList.length + 1
    }
    setProductsList([...productsList, newProductWithId])
    setShowAddModal(false)
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      image: ''
    })
  }

  return (
    <div className='flex flex-col gap-7'>
      <div className="w-full border rounded-3xl bg-white p-6 shadow-sm flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-col-reverse md:flex-row items-center gap-4">
          <div className="flex items-center gap-4 w-96 border rounded-full px-4 py-2 hover:shadow-md transition-shadow duration-300">
            <img src={SearchIcon} alt="search" className="w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex border rounded-full p-1">
            <button
              className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <img src={GridViewIcon} alt="Grid View" className="w-5 h-5" />
            </button>
            <button
              className={`p-2 rounded-full ${viewMode === 'table' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <img src={TableViewIcon} alt="Table View" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <button
          className='border rounded-full px-7 py-2 flex gap-2 items-center justify-center hover:bg-gray-50'
          onClick={() => setShowAddModal(true)}
        >
          <img className='w-5' src={AddIcon} alt="" />
          Add Product
        </button>
      </div>

      <div className="p-6 min-h-[500px] bg-white rounded-3xl">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsList.map(product => (
              <div key={product.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="aspect-square rounded-lg bg-gray-100 mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium text-primary-default">{product.price}</span>
                  {/* <span className="text-sm text-gray-500">Stock: {product.stock}</span> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Price</th>
                  {/* <th className="text-left p-4">Stock</th> */}
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productsList.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        {product.name}
                      </div>
                    </td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">{product.price}</td>
                    {/* <td className="p-4">{product.stock}</td> */}
                    <td className="p-4 flex justify-evenly">
                      <img className='w-6' src={EditIcon} alt="" />
                      <img className='w-6' src={DeleteIcon2} alt="" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-6 w-[500px]">
            <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm mb-1">Product Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm  mb-1">Category</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm  mb-1">Price</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: `₹${e.target.value}` })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Stock</label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Image URL</label>
                <input
                  type="url"
                  className="w-full border rounded-lg p-2"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-3 mt-4 justify-end">
                <button
                  type="button"
                  className='border px-8 rounded-full py-1.5 text-sm bg-primary-secondary'
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className='border px-8 rounded-full py-1.5 bg-primary-default text-white text-sm'
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductPage
