import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

function Menu() {
  const { t, i18n } = useTranslation();

  const muudaKeel = (uusKeel) => {
    i18n.changeLanguage(uusKeel);
    localStorage.setItem("keel", uusKeel);
  }

  return (
    <div>
      <button onClick={() => muudaKeel("en")}>en</button>
      <button onClick={() => muudaKeel("et")}>et</button>
        <Link to="/">
          <img className="pilt" src="https://www.looduskalender.ee/n/sites/default/files/inline-images/110601aa078.jpg" alt="" />
        </Link>

        <Link to="/ostukorv">
          <button>{t("menu.cart")}</button>
        </Link>
        <Link to="/lisa-toode">
          <button>{t("menu.add-product")}</button>
        </Link>
        <Link to="/osta-kinkekaart">
          <button>{t("menu.giftcards")}</button>
        </Link>
        <Link to="/esindused">
          <button>Esindused</button>
        </Link>
        <Link to="/seaded">
          <button>Seaded</button>
        </Link>
        <Link to="/kalkulaator">
          <button>Kalkulaator</button>
        </Link>
        <Link to="/halda-tooteid">
          <button>Halda tooteid</button>
        </Link>
    </div>
  )
}

export default Menu