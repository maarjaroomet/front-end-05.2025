import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function MaintainFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const url = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/feedbacks.json";

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(json => setFeedbacks(json || []))
    }, []);

  const deleteFeedback = (index) => {
      feedbacks.splice(index, 1);
      fetch(url, {method: "PUT", body: JSON.stringify(feedbacks)})
          .then(res => res.json())
          .then(json => {
              setFeedbacks(json || []);
              toast.success("Tagasiside kustutatud")
          })
    }

  return (
    <div>
        <h2>Halda tagasisidet</h2>

        <table>
            <thead>
            <tr>
                <th>Nimi</th>
                <th>Hinnang</th>
                <th>Kommentaar</th>
                <th>Kustuta</th>
            </tr>
            </thead>
            <tbody>
            {feedbacks.map((feedback, index) => (
                <tr key={feedback.name + index}>
                <td>{feedback.name}</td>
                <td>{feedback.rate}</td>
                <td>{feedback.comment}</td>
                <td>
                    <button className="delete-btn" onClick={() => deleteFeedback(index)}>x</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        <ToastContainer
            position="bottom-right"
            autoClose={4000}
            theme="dark"
        />
    </div>
  )
}

export default MaintainFeedbacks