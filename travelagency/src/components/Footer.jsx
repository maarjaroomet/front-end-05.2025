import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <strong>PuhkusePlaneerija OÜ</strong><br />
            Reisitee 12, Tallinn 10123<br />
            info@puhkuseplaneerija.ee<br />
            +372 5551 2345
          </div>
          <Link to="/contact" className="footer-button">Võta ühendust</Link>
        </div>
      </footer>
    </div>
  )
}

export default Footer