import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
export const Register=()=>{
    const [user,setUser]=useState({
        username:"",
        email:"",
        dob:"",
        password:""
    });

    const navigate=useNavigate();
    const {storetokenInLS}=useAuth();
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
const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log(user)
    try {
        const response=await fetch(`https://claim-backend1.vercel.app/api/auth/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user),
        
        });
        console.log(JSON.stringify(user));
        //35
        //const res_data=await response.json()
        //console.log(res_data)
        if (response.ok) {
            // Registration successful
            const data=await response.json()
            console.log("response from backend",data)
            // storetokenInLS(data.token)
            // localStorage.setItem("token",data)
            alert("Registration successful");
            setUser({
                username:"",
                email:"",
                dob:"",
                password:""
            });
            navigate("/login");
          } else if (response.status === 400) {
            // User already exists
            const data = await response.json();
            //console.log("this is resposnse",data)
            alert(data.msg); // Display error message to the user
          } else {
            // Other error
            throw new Error('Registration failed');
          }
    } catch (error) {
        
        console.log("register",error);
    }
    
};

    return(
    <>
        <section>
            <main>
                <div className="Registration grid-two-cols">
                    <div className="container grid grid-two-cols">
                        <div className="registration image">
                            <img src="/regis.jpeg" alt=" a girl is try to do reges" 
                            width="500"
                            height="500"
                            />
                        </div>
                        <div className="registraiton form">
                            <h1 className="main headind mb-3">Registration Form</h1>
                            <br/>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input 
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        id="username"
                                        required
                                        autoComplete="off"
                                        value={user.username}
                                        onChange={handleInput}
                                    />
                                </div>
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
                                    <label htmlFor="dob">dob</label>
                                    <input 
                                        type="date"
                                        name="dob"
                                        placeholder="dateofbirth"
                                        id="dob"
                                        required
                                        autoComplete="off"
                                        value={user.dob}
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
                                    Registor Now
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