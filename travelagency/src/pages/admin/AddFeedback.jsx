import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

function AddFeedback() {
  const [feedback, setFeedback] = useState({});
  const [dbFeedbacks, setDbFeedbacks] = useState([]);
  const feedbacksUrl = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/feedbacks.json";
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(feedbacksUrl)
        .then(res => res.json())
        .then(json => {
          setDbFeedbacks(json || []);
          setLoading(false);
        })
  }, []);
  
    const add = () => {
  
    const maxId = dbFeedbacks.reduce((max, d) => d.id > max ? d.id : max, 0);
    const newFeedback = { ...feedback, id: maxId + 1 };

    if (newFeedback.name === undefined || newFeedback.name === "") {
      toast.error("Nimi puudu!");
      return; 
    }

    if (newFeedback.rate === undefined || newFeedback.rate === "") {
      toast.error("Hinnang puudu!");
      return;
    }

    if (newFeedback.rate < 1 || newFeedback.rate > 5) {
      toast.error("Hinnang peab olema vahemikus 1 kuni 5!");
      return;
    }

    if (newFeedback.comment === undefined || newFeedback.comment === "") {
      toast.error("Kommentaar puudu!");
      return;
    }
  
    dbFeedbacks.push(newFeedback);
    fetch(feedbacksUrl, {method: "PUT", body: JSON.stringify(dbFeedbacks)})
      .then(res => res.json())
      .then(() => {
        toast.success("Tagasiside lisatud: " + newFeedback.rate);
      })
  }

  if(loading) {
    return <div>Laeb..</div>
  }
  return (
    <div className="add-feedback-form">
      <h2>Lisa tagasiside</h2>
      <form>
        <label>Nimi</label>
        <input onChange={(e) => setFeedback({ ...feedback, name: e.target.value })} type="text" />

        <label>Hinnang (1-5)</label>
        <input min="1" max="5" step="0.1" onChange={(e) => setFeedback({ ...feedback, rate: Number(e.target.value) })} type="number" />

        <label>Kommentaar</label>
        <textarea rows={3} onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}></textarea>

        <button type="button" onClick={add}>Lisa tagasiside</button>
      </form>

      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
      />
    </div>
  )
}

export default AddFeedback