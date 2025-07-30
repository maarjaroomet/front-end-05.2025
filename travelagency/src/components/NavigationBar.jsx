import { Link } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavigationBar() {
  const [hoverMenu, setHoverMenu] = useState(false);
  const [hoverBurger, setHoverBurger] = useState(false);
  const hideMenuTimeout = useRef(null);
  const hideBurgerTimeout = useRef(null);
  const {loggedIn, setLoggedIn} = useContext(AuthContext);

  const logout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("token");
  }

  return (
    <div>
        
        <div className="navbar">
            <div className="navbar-inner">
                <div className="nav-left">
                    <img style={{width: "50px"}} src="/calendar.png" alt="" />
                    <Link to="/" className="nav-button">Avaleht</Link>

                   {loggedIn && <div
                        className="dropdown-wrapper"
                        onMouseEnter={() => {
                            clearTimeout(hideMenuTimeout.current);
                            setHoverMenu(true);
                        }}
                        onMouseLeave={() => {
                            hideMenuTimeout.current = setTimeout(() => {
                            setHoverMenu(false);
                            }, 300);
                        }}
                        >
                        <div className="nav-button">Admin</div>
                        {hoverMenu && (
                            <div className="dropdown-content">
                            <Link to="/admin/add-destination">Lisa sihtkoht</Link>
                            <Link to="/admin/maintain-destinations">Halda sihtkohti</Link>
                            <Link to="/admin/maintain-countries">Halda sihtkoha riike</Link>
                            <Link to="/admin/add-feedback">Lisa tagasiside</Link>
                            <Link to="/admin/maintain-feedbacks">Halda tagasisidet</Link>
                            </div>
                        )}
                    </div>}
                </div>

                <div className="nav-right">
                    <div
                        className="dropdown-wrapper"
                        onMouseEnter={() => {
                            clearTimeout(hideBurgerTimeout.current);
                            setHoverBurger(true);
                        }}
                        onMouseLeave={() => {
                            hideBurgerTimeout.current = setTimeout(() => {
                            setHoverBurger(false);
                            }, 300);
                        }}
                        >
                        <div className="nav-button">☰</div>
                        {hoverBurger && (
                            <div className="dropdown-content right">
                            <Link to="/destinations">Sihtkohad</Link>
                            <Link to="/feedbacks">Tagasiside</Link>
                            <Link to="/cart">Ostukorv</Link>
                            <Link to="/contact">Kontakt</Link>
                            </div>
                        )}
                    </div>

                    {!loggedIn ?
                    <>
                        <Link to="/login" className="nav-button">Logi sisse</Link>
                        <Link to="/signup" className="nav-button">Registreeru</Link>
                    </> :
                        <button onClick={logout} className="nav-button">Logi välja</button>
                    }       
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavigationBar