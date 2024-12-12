import { useState } from 'react'
import { Routes as CoverRoute, Route } from 'react-router-dom'
import Layout from './Pages/Layout'
import '../public/Styles/global.css'
import ContactUsPage from './Pages/ContactUsPage'
import LogoutModal from './Utils/LogoutModal'
import NotificationPage from './Pages/NotificationPage'
import Dashboard from './Pages/Dashboard'
import ProductPage from './Pages/ProductPage'
import Users from './Pages/Users'
import AddNewMember from './Pages/AddNewMember'
import LoginCredentials from './Authentication/LoginCredentials'
import Settings from './Pages/Settings'
import SIPEMIKItty from './Pages/SIPEMIKItty'
import EMI from './Pages/EMI'
import Kittty from './Pages/Kittty'

function App() {
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      <CoverRoute>
        <Route path="/" element={<LoginCredentials />} />
        <Route path="dashboard" element={<Layout setLogoutModal={setLogoutModal} />} >
          <Route index element={<Dashboard />} />
          {/* <Route path="" element={<Dashboard />} /> */}
          <Route path="productdetails" element={<ProductPage />} />
          <Route path="setting" element={<Settings />} />
          <Route path="sip" element={<SIPEMIKItty />} />
          <Route path="emi" element={<EMI />} />
          <Route path="kitty" element={<Kittty />} />
          <Route path="addmembers" element={<AddNewMember />} />
          <Route path="contactusdetails" element={<ContactUsPage />} />
          <Route path="users" element={<Users />} />
          <Route path="notificationpage" element={<NotificationPage />} />
        </Route>

      </CoverRoute>
      {logoutModal && <LogoutModal setLogoutModal={setLogoutModal} />}
    </>
  )
}

export default App
