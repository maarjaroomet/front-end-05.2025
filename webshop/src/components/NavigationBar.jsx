import {Link} from "react-router-dom"
import { useTranslation } from 'react-i18next';

function NavigationBar() {
  const { t, i18n } = useTranslation();

  const changeLanguageLocal = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  }

  return (
    <div>
      <button onClick={() => changeLanguageLocal("en")}>en</button>
      <button onClick={() => changeLanguageLocal("et")}>et</button>
      <Link to="/">
        <button>{t("menu.homepage")}</button>
      </Link>
      <Link to="/admin">
        <button>{t("menu.admin")}</button>
      </Link>
      <Link to="/cart">
        <button>{t("menu.cart")}</button>
      </Link>
      <Link to="admin/maintain-products">
        <button>{t("menu.maintainproducts")}</button>
      </Link>
    </div>
  )
}

export default NavigationBar