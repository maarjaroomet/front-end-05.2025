import { Button, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext.tsx"
import PasswordInput from "./PasswordInput.tsx";
import { useNavigate } from "react-router-dom";

interface AuthFormInterface {
    buttonContent: string
}

function AuthForm(props: AuthFormInterface) {
  const {setLoggedIn} = useContext(AuthContext);
  const [person, setPerson] = useState({
    email: "",
    password: "",
    name: "",
    phone: ""
  });
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;

  const submit = () => {
    if(props.buttonContent === "Registreeru" && 
          person.password !== repeatPassword){
        alert("Paroolid ei ühti!");
        return;
    }

    if(props.buttonContent === "Registreeru" && 
          person.email === ""){
        alert("Email puudu!");
        return;
    }

    if(props.buttonContent === "Registreeru" && 
          person.password === ""){
        alert("Parool puudu!");
        return;
    }

    const endpoint = props.buttonContent === "Registreeru" ? "/signup" : "/login";
    fetch(url + endpoint, {
      method: "POST",
      body: JSON.stringify(person),
      headers: {"Content-Type": "application/json"}
    }).then(res => res.json())
    .then(json => {
      if(json.message && json.statusCode && json.timestamp) {
        alert(json.message);
        return;
      }
      setLoggedIn(true);
      sessionStorage.setItem("token", json.token);
      navigate("/admin");
    })           
  }

  return (
    <div>
      <div>{JSON.stringify(person)}</div>
      <div>{repeatPassword}</div>
      <br /><br />
      <TextField onChange={(e) => setPerson({...person, email: e.target.value})} label="Email" variant="outlined" /> <br /><br />
      <PasswordInput id="password" setPassword ={(e) => setPerson({...person, password: e})} />
      <br /><br />
      
      {props.buttonContent === "Registreeru" &&
      <>
        <PasswordInput id="repeat-password" setPassword={setRepeatPassword} />
        <br /><br />
          <TextField onChange={(e) => setPerson({...person, name: e.target.value})} label="Name" variant="outlined" /> <br /><br />
          <TextField onChange={(e) => setPerson({...person, phone: e.target.value})} label="Telephone" variant="outlined" type="number" /> <br /><br />
      </>}
      <Button variant="outlined" onClick={submit}>{props.buttonContent}</Button>

    </div>
  )
}

export default AuthForm


{/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="repeat-assword">Repeat password</InputLabel>
          <OutlinedInput id="repeat-password" onChange={(e) => setRepeatPassword( e.target.value)} label="Repeat password" type={showPassword ? 'text' : 'password'} 
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }/> 
      </FormControl> */}