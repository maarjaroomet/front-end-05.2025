import { useState } from 'react';
import { Link } from 'react-router-dom';

function Courses() {
  const [kursus, setKursus] = useState("Valimata");

  return (
    <div>
    <Link to="/">
        <button>Tagasi</button>
    </Link>
    <button className={kursus === "Udemy" ? "aktiivne" : undefined} onClick={() => setKursus("Udemy")}>Udemy</button>
    <button className={kursus === "Coursera" ? "aktiivne" : undefined} onClick={() => setKursus("Coursera")}>Coursera</button>
    <button className={kursus === "Codecademy" ? "aktiivne" : undefined} onClick={() => setKursus("Codecademy")}> Codecademy</button>
    <button className={kursus === "Udacity" ? "aktiivne" : undefined} onClick={() => setKursus("Udacity")}>Udacity</button>
    {kursus === "Udemy" && <div>Siin on kirjeldus (loend) Udemy.com läbitud kursustest</div>}
    {kursus === "Coursera" && <div>Siin on kirjeldus (loend) Coursera.org läbitud kursustest</div>}
    {kursus === "Codecademy" && <div>Siin on kirjeldus (loend) Codecademy.com läbitud kursustest</div>}
    {kursus === "Udacity" && <div>Siin on kirjeldus (loend) Udacity.com läbitud kursustest</div>}
  </div>
  )
}

export default Courses