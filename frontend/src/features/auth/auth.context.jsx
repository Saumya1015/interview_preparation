
// createContext

// Context banane ke liye use hota hai. // global box that uses everyone data ko multilple jgh send

// useState

// State store karne ke liye use hota hai.

import { createContext,useEffect,useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()



 // childern   <AuthProvider> ke nser jo hai


export const AuthProvider = ({ children }) => { 
   // user curr value chnge ke baad
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

 

    
// Context box ke andar data rakhna aur neeche wale sab components ko dena.

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )

    
}