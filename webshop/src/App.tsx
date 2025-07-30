import './App.css'
import {Navigate, Route, Routes} from "react-router-dom"
import HomePage from './pages/global/HomePage'
import {ContactUs} from './pages/global/ContactUs'
import Shops from './pages/global/Shops'
import Cart from './pages/global/Cart'
import SingleProduct from './pages/global/SingleProduct'
import NotFound from './pages/global/NotFound'
import AdminHome from './pages/admin/AdminHome'
import AddProduct from './pages/admin/AddProduct'
import EditProduct from './pages/admin/EditProduct'
import MaintainProducts from './pages/admin/MaintainProducts'
import MaintainCategories from './pages/admin/MaintainCategories'
import MaintainShops from './pages/admin/MaintainShops'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import NavigationBar from './components/NavigationBar'
import Supplier1 from './pages/admin/Supplier1'
import Supplier2 from './pages/admin/Supplier2'
import Supplier3 from './pages/admin/Supplier3'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
  const {loading} = useContext(AuthContext);
  const {loggedIn} = useContext(AuthContext);

  if(loading) {
    return <div></div>
  }

  return (
    <>
      <NavigationBar />
        <Routes>
          <Route path="" element={ <HomePage />} />
          <Route path="contact" element={ <ContactUs /> } />
          <Route path="shops" element={ <Shops /> } />
          <Route path="cart" element={ <Cart /> } />
          <Route path="product/:id" element={ <SingleProduct /> } />

          
          {loggedIn ?
          <>
            <Route path="admin" element={ <AdminHome />} />
            <Route path="admin/add-product" element={ <AddProduct /> } />
            <Route path="admin/edit-product/:id" element={ <EditProduct /> } />
            <Route path="admin/maintain-products" element={ <MaintainProducts /> } />
            <Route path="admin/maintain-categories" element={ <MaintainCategories /> } />
            <Route path="admin/maintain-shops" element={ <MaintainShops /> } />

            <Route path="admin/supplier1" element={ <Supplier1 /> } />
            <Route path="admin/supplier2" element={ <Supplier2 /> } />
            <Route path="admin/supplier3" element={ <Supplier3 /> } />
          </> :
          <Route path="admin/*" element={ <Navigate to="/login" /> } />
          }
          
          <Route path="login" element={ <Login /> } />
          <Route path="signup" element={ <Signup /> } />

          <Route path="*" element={ <NotFound /> } />
        </Routes>
    </>
  )
}

export default App
