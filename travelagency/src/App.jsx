import './App.css'
import {Route, Routes} from "react-router-dom"
import HomePage from './pages/global/HomePage'
import ContactUs from './pages/global/ContactUs'
import Cart from './pages/global/Cart'
import SingleDestination from './pages/global/SingleDestination'
import Destinations from './pages/global/Destinations'
import Feedbacks from './pages/global/Feedbacks'
import AddDestination from './pages/admin/AddDestination'
import EditDestination from './pages/admin/EditDestination'
import MaintainDestinations from './pages/admin/MaintainDestinations'
import MaintainCountries from './pages/admin/MaintainCountries'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import NotFound from './pages/global/NotFound'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import AddFeedback from './pages/admin/AddFeedback'
import MaintainFeedbacks from './pages/admin/MaintainFeedbacks'

function App() {

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="" element={ <HomePage />} />
        <Route path="contact" element={ <ContactUs /> } />
        <Route path="cart" element={ <Cart /> } />
        <Route path="destination/:id" element={ <SingleDestination /> } />
        <Route path="destinations" element={ <Destinations /> } />
        <Route path="feedbacks" element={ <Feedbacks /> } />

        <Route path="admin/add-destination" element={ <AddDestination /> } />
        <Route path="admin/add-feedback" element={ <AddFeedback /> } />
        <Route path="admin/edit-destination/:id" element={ <EditDestination /> } />
        <Route path="admin/maintain-destinations" element={ <MaintainDestinations /> } />
        <Route path="admin/maintain-countries" element={ <MaintainCountries /> } />
        <Route path="admin/maintain-feedbacks" element={ <MaintainFeedbacks /> } />

        <Route path="login" element={ <Login /> } />
        <Route path="signup" element={ <Signup /> } />

        <Route path="*" element={ <NotFound /> } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
