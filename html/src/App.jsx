import './App.css'


function App() {

  return (
    <>
      <img className="pilt" src="https://sildid-kleebised.ee/wp-content/uploads/2023/01/2023-01-31-vikerkaar-Asset-22.png" alt=""/>
      <br /><br />
      <button className="green-button">
        Grey text
      </button>
      <br /><br />
      <span className="blue-text">Blue text</span>
      <br /><br />
      <span className="green-text">Green text</span>
      <br /><br />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </tbody>
      </table>
      <br /><br />



      <iframe
        className="youtube-fixed"
        width="420"
        height="345"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
      ></iframe>
      
    </>
  )
}

export default App
