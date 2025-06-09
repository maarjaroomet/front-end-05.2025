import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div>
        <img className='main-picture' src="https://thumbs.dreamstime.com/b/portfolio-banner-colorful-confetti-portfolio-banner-colorful-paper-confetti-vector-background-125413772.jpg" alt="" />
      <div className="rectangle"></div>

      <div className="navigation-pictures">
        <Link className="main-link" to="work">
          <img src="https://www.naceweb.org/images/default-source/2023/feature/work-modality-the-changing-nature-of-where-we-work-xlarge.jpg" alt="" />
          <p>Tööde lehele</p>
        </Link>
        <Link className="main-link" to="hobbies">
          <img src="https://wizdomapp.com/wp-content/uploads/2024/07/Hobbies.jpg" alt="" />
          <p>Hobide lehele</p>
        </Link>
        <Link className="main-link" to="courses">
          <img src="https://academylms.net/wp-content/uploads/2022/09/Structure-of-Online-Courses.png" alt="" />
          <p>Kursuste lehele</p>
        </Link>
      </div>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/ZbZSe6N_BXs?si=cI3R5jOu8dELnfTz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  )
}

export default NavBar