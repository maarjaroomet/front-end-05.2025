import { Button, TextField } from "@mui/material"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function Login() {
  const {setLoggedIn} = useContext(AuthContext);

  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem("token", "123");
  }

  return (
    <div>
      <br /><br />
      <TextField id="outlined-basic" label="Email" variant="outlined" /> <br /><br />
      <TextField id="outlined-basic" label="Password" variant="outlined" /> <br /><br />
      <Button variant="outlined" onClick={login}>Logi sisse</Button>
    </div>
  )
}

export default Login