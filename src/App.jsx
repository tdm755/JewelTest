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

function App() {
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      <CoverRoute>
        <Route path="/" element={<Layout setLogoutModal={setLogoutModal} />} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productdetails" element={<ProductPage />} />
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
