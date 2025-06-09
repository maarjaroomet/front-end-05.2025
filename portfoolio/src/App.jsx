import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Work from './pages/Work';
import Hobbies from './pages/Hobbies';
import Courses from './pages/Courses';
import NavBar from './components/NavBar';

function App() {

  return (
    <>
      

      <Routes>
        <Route path="" element={ < NavBar /> } />
        <Route path="work" element={ <Work /> } />
        <Route path="hobbies" element={ <Hobbies /> } />
        <Route path="courses" element={ <Courses /> } />
      </Routes>
      <br /><br />
      <a className="facebook-button" href="https:www.facebook.com">
        <img src="/facebook.png" alt="" />
        <span>Facebook</span>
      </a>
    </>
  )
}

export default App
