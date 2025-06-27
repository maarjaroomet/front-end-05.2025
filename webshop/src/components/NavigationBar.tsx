import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import english from "../assets/english.png"
import estonian from "../assets/estonian.png"
import { useContext } from 'react';
import { CartSumContext } from '../context/CartSumContext';
import { AuthContext } from '../context/AuthContext';
import { useAppSelector } from '../redux/store';

function NavigationBar() {
  const { t, i18n } = useTranslation();
  const {cartSum} = useContext(CartSumContext);
  const {loggedIn, setLoggedIn} = useContext(AuthContext);
  const count = useAppSelector(state => state.counter.value);
  
  const changeLanguageLocal = (newLang: string) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  }

  const logout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("token");
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {loggedIn && <Nav.Link as={Link} to="/admin">{t("menu.admin")}</Nav.Link>}
            <Nav.Link as={Link} to="/cart">{t("menu.cart")}</Nav.Link>
            <Nav.Link as={Link} to="/shops">{t("menu.shops")}</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            {/* <button onClick={() => changeLanguageLocal("en")}>en</button>
            <button onClick={() => changeLanguageLocal("et")}>et</button> */}
            <span>{cartSum.toFixed(2)} €</span>
            <span>/ {count}</span>
            <img className={i18n.language === "en" ? "icon active" : "icon"} src={english} alt="" onClick={() => changeLanguageLocal("en")} />
            <img className={i18n.language === "et" ? "icon active" : "icon"}  src={estonian} alt="" onClick={() => changeLanguageLocal("et")} />
            {!loggedIn ?
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </> :
              <Nav.Link onClick={logout}>Log out</Nav.Link>
            }           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;