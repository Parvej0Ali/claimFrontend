import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import { useAuth } from "../store/auth";
export const Login=()=>{
    const [user,setUser]=useState({
        email:"",
          password:""
    });

    const { storetokenInLS } = useAuth()
    const navigate = useNavigate();

//handle input
const handleInput=(e)=>{
    let name=e.target.name;
    let value=e.target.value;

    setUser({
        ...user,
        [name]:value,
    });
};
//handling form submit
const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
        const response = await fetch("https://claimbackend1.onrender.com/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
            const responseData = await response.json();
            storetokenInLS(responseData.token)
            //localStorage.setItem("token",responseData.token)
            console.log("after login: ", responseData);
            // toast.success("Registration Successful");
            //saveTokenInLocalStr(responseData.token);
            alert("Login Successfull")
            //tusharcode
            const {userId,isAdmin,username}=responseData;
            if(isAdmin){
                navigate("/admin",{state:{userId:userId}})
            }else{
                navigate("/userdashboard",{state:{userId:userId, username:username}});
            }
            //tusharcode
            
          }else if (response.status === 400) {
            const data = await response.json();
            // Invalid credentials, display error message
            alert(data.msg);
          } else {
            throw new Error('Sign-in failed');
          }
    }catch (error){
        console.log(error);
    }
}
    return (
        <>
        <section>
            <main>
                <div className="Login form">
                    <div className="container grid grid two cols">
                        
                        
                        <div className="Login form">
                            <h1 className="main heading mb-3">Login form</h1>
                            <br/>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email">email</label>
                                    <input 
                                        type="text"
                                        name="email"
                                        placeholder="enter email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">password</label>
                                    <input 
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        id="password"
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                </div>
                                <br/>
                                <button type="Submit" className="btn btn-submit">
                                    Login Now
                                </button>
                            </form>
                        </div>

                    </div>
                    
                </div>
            </main>
        </section>
    </>
    );
}