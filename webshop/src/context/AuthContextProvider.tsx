import { useEffect, useState, type ReactNode } from "react"
import { AuthContext } from "./AuthContext"

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(sessionStorage.getItem("token") === null) {
            setLoading(false);
            return;
        }
        fetch("http://localhost:8090/validate-token?token=" + sessionStorage.getItem("token"), {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(json => {
            if(json.message && json.statusCode && json.timestamp) {
                alert(json.error);
                return;
              }
            if(json.id && json.email) {
                setLoggedIn(true);
            }
            setLoading(false);
        })
    }, []);

    return (
        <AuthContext.Provider value={{loggedIn, setLoggedIn, loading}}>
            {children}
        </AuthContext.Provider>
    )
}