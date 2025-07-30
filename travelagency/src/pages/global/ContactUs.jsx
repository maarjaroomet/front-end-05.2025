import { ToastContainer, toast } from 'react-toastify';

function ContactUs() {

  const sendMessage = () => {
      toast.success("Sõnum saadetud");
  }
  return (
    <div>
      <div className="contact-page">
        <h2>Võta ühendust</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <form>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Sinu email" />

              <label htmlFor="subject">Teema</label>
              <input type="text" id="subject" name="subject" placeholder="Teema" />

              <label htmlFor="message">Sisu</label>
              <textarea id="message" name="message" placeholder="Sõnum..." rows="6" />

              <button onClick={sendMessage} className="send-button">Saada</button>
            </form>
          </div>

          <div className="contact-card contact-info">
            <h3>Kontakt</h3>
            <p><strong>PuhkusePlaneerija OÜ</strong></p>
            <p>Reisitee 12, Tallinn 10123</p>
            <p>info@puhkuseplaneerija.ee</p>
            <p>+372 5551 2345</p>
          </div>
        </div>
      </div>

      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
      />
    </div>
  )
}

export default ContactUs