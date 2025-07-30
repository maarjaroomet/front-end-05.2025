import { useContext, useState } from "react";
import PasswordInput from "./PasswordInput";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';

function AuthForm({ buttonContent }) {
  const { setLoggedIn } = useContext(AuthContext);
  const [person, setPerson] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    if (buttonContent === "Registreeru") {
        if (!person.email || !person.password || person.password !== repeatPassword) {
        alert("Palun täida kõik väljad õigesti ja veendu, et paroolid ühtiksid.");
        return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = existingUsers.find(u => u.email === person.email);
        if (userExists) {
        alert("Selle emailiga kasutaja on juba olemas!");
        return;
        }

        const updatedUsers = [...existingUsers, person];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        setLoggedIn(true);
        sessionStorage.setItem("token", "123");

        toast.success("Registreerimine õnnestus!");
        navigate("/");
    } else {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = existingUsers.find(
        (u) => u.email === person.email && u.password === person.password
        );

        if (!foundUser) {
        alert("Vale email või parool!");
        return;
        }

        setLoggedIn(true);
        sessionStorage.setItem("token", "123");
        navigate("/");
    }
    };


  return (
    <div>
      <div className="auth-form">
        <label>Email</label>
        <input
            type="email"
            value={person.email}
            onChange={(e) => setPerson({ ...person, email: e.target.value })}
        />
        <PasswordInput id="password" setPassword={(e) => setPerson({ ...person, password: e })} />

        {buttonContent === "Registreeru" && (
            <>
            <PasswordInput id="repeat-password" setPassword={setRepeatPassword} />
            <label>Nimi</label>
            <input
                type="text"
                value={person.name}
                onChange={(e) => setPerson({ ...person, name: e.target.value })}
            />
            <label>Telefon</label>
            <input
                type="tel"
                value={person.phone}
                onChange={(e) => setPerson({ ...person, phone: e.target.value })}
            />
            </>
        )}

        <button onClick={submit}>{buttonContent}</button>
        </div>

    <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
    />
    </div>
  )
}

export default AuthForm
