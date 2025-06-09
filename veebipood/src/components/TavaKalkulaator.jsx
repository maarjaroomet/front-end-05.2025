import { useState } from "react"

function TavaKalkulaator() {
  const [number, setNumber] = useState(0);
  const [operator, setOperator] = useState("*");

  return (
    <div>
      {operator === "+" && <div>{number} + 2.089 = {(number + 2.089).toFixed(3)}</div>}
      {operator === "-" && <div>{number} - 2.089 = {(number - 2.089).toFixed(3)}</div>}
      {operator === "*" && <div>{number} * 2.089 = {(number * 2.089).toFixed(3)}</div>}
      {operator === "/" && <div>{number} / 2.089 = {(number / 2.089).toFixed(3)}</div>}

      <button onClick={() => setNumber(7)}>7</button>
      <button onClick={() => setNumber(8)}>8</button>
      <button onClick={() => setNumber(9)}>9</button>
      <button onClick={() => setOperator("*")}>*</button>
      <br/>
      <button onClick={() => setNumber(4)}>4</button>
      <button onClick={() => setNumber(5)}>5</button>
      <button onClick={() => setNumber(6)}>6</button>
      <button onClick={() => setOperator("/")}>/</button>
      <br/>
      <button onClick={() => setNumber(1)}>1</button>
      <button onClick={() => setNumber(2)}>2</button>
      <button onClick={() => setNumber(3)}>3</button>
      <button onClick={() => setOperator("+")}>+</button>
      <br/>
      <button>C</button>
      <button onClick={() => setNumber(0)}>0</button>
      <button onClick={() => setOperator("-")}>-</button>
      <button>=</button>
      <br/>

    </div>
  )
}

export default TavaKalkulaator