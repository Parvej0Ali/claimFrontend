import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const  AuthProvider = ({children})=>{
    //token that is stored on local storage
    const [token,setToken]=useState(localStorage.getItem('token'));
    
    const [user,setUser]=useState("")
    //policy lec34
    const [services,setServices]=useState("")

    //const [token,setToken]=useState("");
    const storetokenInLS=(serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("token",serverToken)
    }
    //if token true it will be true else it will be false
    let isLoggedIn=!!token;
    console.log("is login",isLoggedIn)
    //logoutfunctionality
    const LogoutUser=()=>{
        setToken("");
        return localStorage.removeItem("token")

    }
    //get policyies

    const getServices=async ()=>{
        try {
            const response= await fetch("https://claimbackend1.onrender.com/api/policies/showAllPolicies",{
                method:"GET",
            });
            if(response.ok){
                const data=await response.json();
                console.log(data)
                setServices(data)
            }
        } catch (error) {
            console.log(`services frontend error${error}`);            
        }

    }

    useEffect(()=>{
        getServices();
        userAunthentication();
    },[]);
    //get policy by userid
    // const getPolicyByUserId=async ()=>{
    //     try {
    //         const response= await fetch(`http://localhost:3000/api/policies/showPoliciesByUserId/${userId}`,{
    //             method:"GET",
    //         });
    //         if(response.ok){
    //             const data=await response.json();
    //             console.log(data)
    //             setServices(data)
    //         }
    //     } catch (error) {
    //         console.log(`services frontend error${error}`);            
    //     }

    // }

    // useEffect(()=>{
    //     getServices();
    //     userAunthentication();
    // },[]);

    //jwt authentication to get current user data 
    const userAunthentication=async()=>{
        try {
            const response=await fetch(`http://localhost:3000/api/users/${userId}`,{
                method:"Get",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
        if(response.ok){
            const data =await response.json();
            console.log("userdata",data)
            setUser(data);

        }
            
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        userAunthentication();
    },[])



    return <AuthContext.Provider value={{isLoggedIn,storetokenInLS,LogoutUser,user,services}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the provider")
    }

    return authContextValue;
}
