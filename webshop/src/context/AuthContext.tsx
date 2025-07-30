import { createContext } from "react";

export const AuthContext = createContext({
    loggedIn: false,
    setLoggedIn: (loggedInStatus: boolean) => {console.log(loggedInStatus)},
    loading: false
});

