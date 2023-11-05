import { useCallback ,useEffect} from "react";
import { createContext ,useState} from "react";
import { baseUrl, postRequest } from "../Utils/services";
export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading,setRegisterLoading]=useState(false);
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading,setLoginLoading]=useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name:"",
        email:"",
        password:"",
    });

    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password:"",
    });

console.log("register user Info:",registerInfo);
console.log("login user Info:",loginInfo);


useEffect(() => {
    const user=localStorage.getItem("User");
    setUser(JSON.parse(user));
    
}, []);


const registerUser=useCallback(async(e)=>{
    e.preventDefault()
    setRegisterLoading(true)
    setRegisterError(null)
const response=await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo))
console.log(response)
setRegisterLoading(false)

if(response.error){return setRegisterError(response);}

localStorage.setItem("User",JSON.stringify(response))
setUser(response);
},[registerInfo])



const updateRegisterInfo=useCallback((info)=>{
    setRegisterInfo(info)
    },[])



const loginUser=useCallback(async(e)=>{
    e.preventDefault()
    setLoginLoading(true)
    setLoginError(null)
const response=await postRequest(`${baseUrl}/users/login`,JSON.stringify(loginInfo))
console.log(response)
setLoginLoading(false)

if(response.error){return setLoginError(response);}

localStorage.setItem("User",JSON.stringify(response))
setUser(response);
},[loginInfo])




const updateLoginInfo=useCallback((info)=>{
    setLoginInfo(info)
    },[])









const logoutUser= useCallback(()=>{
    localStorage.removeItem("User");
    setUser(null);
},[])










    return (
        <>
        <AuthContext.Provider value={{user,registerInfo,updateRegisterInfo,registerUser,registerError,isRegisterLoading,logoutUser,loginUser,loginError,loginInfo,updateLoginInfo,isLoginLoading}}>
            {children}
        </AuthContext.Provider>
        </>
    );


};
