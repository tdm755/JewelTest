import React, { useState } from 'react'
import SearchIcon from '../../public/assets/SVGs/SearchIcon.svg'
import EyeIcon from '../../public/assets/SVGs/EyeIcon.svg'
import ArrowIcon from '../../public/assets/SVGs/ArrowIcon.svg'
import ArrowDown from '../../public/assets/SVGs/ArrowDown.svg'
import Bracelet from '../../public/assets/Images/Bracelet.jpg'
import HeroJewelImage from '../../public/assets/Images/HeroJewelImage.png'
import NeckLaceCarousel from '../../public/assets/Images/NeckLaceCarousel.png'
import JewelleryImage2 from '../../public/assets/Images/JewelleryImage2.jpg'

function ContactUsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedRow, setExpandedRow] = useState(null)
  const [AscDesc, setAscDesc] = useState(true);

  const messages = [
    {
      id: 1,
      name: 'Arpit Vinay Tiwari',
      phone: '+91 777777777777',
      email: 'tdm75513@gmail.com',
      img: [
        Bracelet,
        HeroJewelImage,
        JewelleryImage2,
      ],
      title: 'Custom Diamond Necklace Design',
      message: 'I would like to get a necklace made similar to these designs. Looking for a combination of white gold and diamonds. Please provide an estimate for similar designs.'
    },
    {
      id: 2,
      name: 'John Doe',
      phone: '+91 888888888888',
      email: 'john@gmail.com',
      img: [
        Bracelet,
        HeroJewelImage,
        JewelleryImage2,
      ],
      title: 'Traditional Gold Bangles',
      message: 'Interested in getting traditional gold bangles made with intricate designs like in these reference images. Would like to know the making charges and timeline.'
    },
    {
      id: 3,
      name: 'Jane Smith',
      phone: '+91 999999999999',
      email: 'jane@gmail.com',
      img: [
        Bracelet,
        HeroJewelImage,
        JewelleryImage2,
      ],
      title: 'Bridal Jewellery Set',
      message: 'Planning for my wedding and looking to get a complete bridal set made. These are some designs I like. Please suggest similar options within 10 lakh budget.'
    }
  ]

  const [selectedPage, setSelectedPage] = useState(1);
  const itemPerPage = 5;



  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='p-2 md:p-6 rounded-xl flex flex-col gap-7'>
      <div className=" h-40 w-full border rounded-3xl bg-white p-6 shadow-sm flex flex-col md:flex-row justify-center items-center gap-10">
        <div className="flex gap-10">
          <div className="relative">
            <select className='border relative z-10 cursor-pointer bg-transparent rounded-full pl-7 w-32 pr-2 py-2 flex gap-2 items-center justify-center outline-none appearance-none' name="" id="">
              <option value="">Show 10</option>
              <option value="">Show 20</option>
              <option value="">Show 40</option>
              <option value="">Show 80</option>
            </select>
            <img className='absolute right-4 z-0 top-2.5 w-5' src={ArrowDown} alt="" />
          </div>

          <button onClick={() => setAscDesc(!AscDesc)} className='border rounded-full pl-7 w-40 pr-2 py-2 flex gap-2 items-center justify-center'><span className=''>{AscDesc ? 'Ascending' : 'Descending'}</span> <img className={`w-5 ${AscDesc ? 'rotate-90' : '-rotate-90'}`} src={ArrowIcon} alt="" /> </button>
        </div>
        <div className="flex items-center gap-4 w-96 border rounded-full px-4 py-2 hover:shadow-md transition-shadow duration-300">
          <img src={SearchIcon} alt="search" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search messages..."
            className="outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="min-h-[500px] w-full border flex flex-col justify-between rounded-3xl bg-white overflow-hidden shadow-sm">
        <div className="p-6 overflow-x-auto">
          <table className='w-full border-separate border-spacing-x-1 '>
            <thead>
              <tr className='bg-gray-50'>
                <th className='p-4 text-left first:rounded-tl-xl'>Sr.No</th>
                <th className='p-4 text-left'>Name</th>
                <th className='p-4 text-left'>Phone</th>
                <th className='p-4 text-left last:rounded-tr-xl'>Email</th>
                <th className='p-4 text-left last:rounded-tr-xl'>Images Uploaded</th>
                <th className='p-4 text-left last:rounded-tr-xl'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg, index) => (
                <React.Fragment key={msg.id}>
                  <tr
                    className={`
                                border-b cursor-pointer
                                hover:bg-gray-50 transition-colors duration-200
                                ${expandedRow === msg.id ? 'bg-gray-50' : ''}
                              `}
                    onClick={() => setExpandedRow(expandedRow === msg.id ? null : msg.id)}
                  >
                    <td className='px-4 py-6'>{index + 1}</td>
                    <td className='px-4 py-6'>{msg.name}</td>
                    <td className='px-4 py-6'>{msg.phone}</td>
                    <td className='px-4 py-6'>{msg.email}</td>
                    <td className='px-4 py-6'>{msg.img.length}</td>
                    <td className='px-4 py-6 flex items-center justify-center'><img className='w-6' src={EyeIcon} alt="" /></td>
                  </tr>
                  <tr>
                    <td colSpan={6} className='p-0'>
                      <div
                        className={`
                                    grid transition-all duration-300 ease-in-out
                                    ${expandedRow === msg.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                                  `}
                      >
                        <div className='overflow-hidden '>
                          <div className='p-6 bg-gray-50 rounded-xl m-4 shadow-sm'>
                            <div className='font-medium text-gray-700'>Title:</div>
                            <p className='mt-2 text-gray-600'>{msg.title}</p>
                            <div className='font-medium text-gray-700 mt-4'>Message:</div>
                            <p className='mt-2 text-gray-600'>{msg.message}</p>
                          </div>
                          <div className="p-6 bg-gray-50 rounded-xl m-4 shadow-sm flex items-center justify-center gap-4">
                            {msg.img.map((item, index) => {
                              return <div key={index} className="w-32 h-32 hover:scale-105 transition-all duration-300 ease-in-out border rounded-lg flex items-center justify-center relative" style={{ backgroundImage: `url(${item})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              {filteredMessages.length === 0 && (
                <tr>
                  <td colSpan={6} className='p-4 text-center text-gray-500'>
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end px-10">
        <div className="flex gap-1">
          <div className="">{'<'}</div>
          <div className="">1</div>
          <div className="">2</div>
          <div className="">3</div>
          <div className="">{'>'}</div>
        </div>
      </div>
      </div>

      
    </div>
  )
}

export default ContactUsPage
