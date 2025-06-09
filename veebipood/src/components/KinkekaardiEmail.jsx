import { useRef, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

function KinkekaardiEmail() {
    const showEmailRef = useRef();
    const emailRef = useRef();
    const [isEmailShown, setEmailShown] = useState(false);

    const showEmail = () => {
        setEmailShown(showEmailRef.current.checked);
    }

    const insertEmail = () => {
        if(emailRef.current.value.length < 6) {
            toast.error("Email liiga lühike!");
            return;
        }

        if(emailRef.current.value.includes("@") === false) {
            toast.error("Email peab sisestama @ märki!");
            return;
        }

        toast.success("Edukalt lisatud!");
    }

  return (
    <div>
        <label htmlFor="show-email">Näita e-maili välja</label>
        <input id="show-email" ref={showEmailRef} onChange={showEmail} type="checkbox" /><br />
        <br />

        {isEmailShown === true &&
            <>
                <label htmlFor="email">Email</label> <br />
                <input id="email" ref={emailRef} type="text" /> <br />
                <button onClick={insertEmail}>Sisesta</button>
            </>
        }

        {/* veebilehelt https://www.npmjs.com/package/react-toastify */}
        <ToastContainer 
            position="bottom-right"
            autoClose={4000}
            theme="dark"
        />               
    </div>
  )
}

export default KinkekaardiEmail