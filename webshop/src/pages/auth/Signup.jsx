import { Button, TextField } from "@mui/material"

function Signup() {
  return (
    <div>
      <br /><br />
            <TextField id="outlined-basic" label="Email" variant="outlined" /> <br /><br />
            <TextField id="outlined-basic" label="Password" variant="outlined" /> <br /><br />
            <Button variant="outlined">Registreeru</Button>
    </div>
  )
}

export default Signup