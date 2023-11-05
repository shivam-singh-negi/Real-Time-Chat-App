import { useCallback } from "react";
import { createContext ,useState} from "react";
useCallback
export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState({name:"shivam"});
    const [registerInfo, setRegisterInfo] = useState({
        name:"",
        email:"",
        password:"",
    });
console.log(registerInfo)

    const updateRegisterInfo=useCallback((info)=>{
    setRegisterInfo(info)
    },[])

    return (
        <>
        <AuthContext.Provider value={{user,registerInfo,updateRegisterInfo}}>
            {children}
        </AuthContext.Provider>
        </>
    );


};
