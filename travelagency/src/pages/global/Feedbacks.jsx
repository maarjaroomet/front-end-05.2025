import { useEffect, useState } from "react"

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [dbFeedbacks, setDbeedbacks] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const feedBacksUrl = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/feedbacks.json";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(feedBacksUrl)
        .then(res => res.json())
        .then(json => {
          setFeedbacks(json || []);
          setDbeedbacks(json || []);
          setLoading(false);
        })
  }, []);

  const reset = () => {
    setFeedbacks(dbFeedbacks);
    setSortOrder("");
  }

  const sort = (order) => {
    setSortOrder(order);
    const sorted = [...feedbacks].sort((a, b) =>
      order === "rate-asc" ? a.rate - b.rate :
      order === "rate-desc" ? b.rate - a.rate :
      0
    );
    setFeedbacks(sorted);
  }

  if(loading) {
    return <div>Laeb..</div>
  }

  return (
    <div>
      <div className="controls">
        <button onClick={reset}>Reset</button>

        <label>Sorteeri hinnangu järgi:</label>
        <select value={sortOrder} onChange={(e) => sort(e.target.value)}>
          <option disabled value="">Vali</option>
          <option value="rate-asc">Hinnang: kasvavalt</option>
          <option value="rate-desc">Hinnang: kahanevalt</option>
        </select>
      </div>
      <div className="grid">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="card">
            <h3>{feedback.rate} ⭐</h3>
            <p><strong>{feedback.name}</strong></p>
            <p>{feedback.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feedbacks