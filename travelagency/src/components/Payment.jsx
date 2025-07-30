
function Payment({sum}) {

  const pay = () => {
    const url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
    const payload = {
        "account_name": "EUR3D1",
        "nonce": "165as" + new Date() + Math.random() * 999999,
        "timestamp": new Date(),
        "amount": sum,
        "order_reference": "ab" + Math.random() * 999999,
        "customer_url": "https://maarja-travelagency.web.app/cart",
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

  return (
    <div>
        <button onClick={pay}>Maksa</button>
        
    </div>
  )
}

export default Payment