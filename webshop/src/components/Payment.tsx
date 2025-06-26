
function Payment(props: {sum: number}) {

  const pay = () => {
    const url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
    const payload = {
        "account_name": "EUR3D1",
        "nonce": "165as" + new Date() + Math.random() * 999999,
        "timestamp": new Date(),
        "amount": props.sum,
        "order_reference": "ab" + Math.random() * 999999,
        "customer_url": "https://maarja-webshop-06-25.web.app",
        "api_username": "e36eb40f5ec87fa2"
    }

    fetch(url, {
        method: "POST", 
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic ZTM2ZWI0MGY1ZWM4N2ZhMjo3YjkxYTNiOWUxYjc0NTI0YzJlOWZjMjgyZjhhYzhjZA=="
        }
    }).then(res => res.json())
      .then(json => window.location.href = json.payment_link)
  }

  //Javascriptis:
  // window.location.href --> rakendusest välja suunamine
  // navigate useNavigate --> Reacti sisene suunamine (URL on App.jsx sees olemas)

  //HTML-is:
  // <a href="" --> rakendusest välja suunamine
  // <Link to="" --> Reacti sisene suunamine (URL on App.jsx sees olemas)

  return (
    <div>
        <button onClick={pay}>Maksa</button>
        
    </div>
  )
}

export default Payment