import { useState } from "react";
import show from "../assets/show.png"
import hide from "../assets/hide.png"

function PasswordInput({ id, setPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-wrapper">
      <label htmlFor={id}>Parool</label>
      <div className="password-input">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="toggle-button"
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <img style={{width: "15px"}} src={hide} alt=""  /> : <img style={{width: "15px"}} src={show} alt="" />}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;