// import { useState } from "react"
// fimport { useAuth } from "../store/auth"
// // import { useLocation } from "react-router-dom";


// // //if(userData &&user)

// // export const Contact=()=>{
// // const location = useLocation();
// //   const userId = location.state.userId;
// //   const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

// //   const [userPolicies, setUserPolicies] = useState([]);
// //   //const [userClaims, setUserClaims] = useState([]);
// //   const [userData, setUserData] = useState({});
// //  //// console.log(userPolicies)
// //   useEffect(() => {
// //     const fetchUserPolicies = async () => {
// //       try {
// //         // Fetch user policies array with authorization token in headers
// //         // const response = await axios.get(⁠ ${process.env.REACT_APP_BACKEND_URL}api/users/${userId} ⁠, {
// //         //   headers: {
// //         //     Authorization: ⁠ Bearer ${token} ⁠ // Include JWT token in request headers
// //         //   }
// //           const response=await fetch(`http://localhost:3000/api/users/${userId}`,{
// //                 method:"Get",
// //                 headers:{
// //                     Authorization:`Bearer ${token}`
// //                 }
// //         });
// //         const userPoliciesData = response.data.policies;
// //         setUserData(response.data);
// //         console.log(response.data)
// //         // Fetch policy details for each policy
// //         const policiesWithDetails = await Promise.all(userPoliciesData.map(async (policy) => {
// //         const policyId = policy.policyId; // Assuming the policy object has a policyId field
// //         //   const policyDetailResponse = await axios.get(⁠ ${process.env.REACT_APP_BACKEND_URL}api/policies/getPolicyById/${policyId} ⁠, {
// //         //     headers: {
// //         //       Authorization: ⁠ Bearer ${token} ⁠ // Include JWT token in request headers
// //         //     }
// //         //   });
// //         const policyDetailResponse=await fetch(`http://localhost:3000/api/policies/getPolicyById/${policyId}`,{
// //                 method:"Get",
// //                 headers:{
// //                     Authorization:`Bearer ${token}`
// //                 }
// //         })
// //           const policyDetail = policyDetailResponse.data;
// //           return {userId, ...policy, ...policyDetail };
// //         }));

// //         setUserPolicies(policiesWithDetails);
// //       } catch (error) {
// //         console.error('Error fetching user policies:', error);
// //       }
// //     };


// //     fetchUserPolicies();
    

// // },[userId,token])
// // }
// // Home.jsx

// const [userData,setUserData]=useState(true)
// // if(user.userData&&user){
    
// // }


//   const { user } = useAuth();

//   return (
//     <div>
//       <h2>Welcome to the Home Page</h2>
//       {user && (
//         <div>
//           <h3>User Information:</h3>
//           <p>Username: {user.username}</p>
//           <p>Email: {user.email}</p>
//           {/* Render other user information as needed */}
//         </div>
//       )}
//     </div>
//   );
// };

export const Contact=()=>{
    return <h1>about hi there !! hi </h1>
}
