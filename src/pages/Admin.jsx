import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom"

export const AdminPage = () => {
    const location = useLocation();
    const userId = location.state.userId;
    const token = localStorage.getItem('token');
    const [claims, setClaims] = useState([]);
    const [allPolicies, setAllPolicies] = useState([]);
    //console.log(username)
    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await fetch('https://claimbackend1.onrender.com/api/claims/allClaims', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ userId: userId }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch claims');
                }

                const data = await response.json();
                // Filter out claims with status 'approved' or 'rejected'
                const filteredClaims = data.filter((claim) => claim.status !== 'rejec');
                setClaims(filteredClaims);
            } catch (error) {
                console.error('Error fetching claims:', error);
            }
        };
        const fetchAllPolicies = async () => {
            try {
                const response = await fetch(`https://claimbackend1.onrender.com/api/policies/showAllPolicies`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch all policies');
                }
                const data = await response.json();
                console.log('this is from show all policy admin', data);
                setAllPolicies(data);
                
            } catch (error) {
                console.error('Error fetching all policies:', error);
            }
        };
    
        fetchClaims();
        fetchAllPolicies();
    }, [userId, token]);

    const handleApproveClaim = async (claimId, userId, policyId, amount) => {
        try {
            const response = await fetch(`https://claimbackend1.onrender.com/api/claims/updateClaim/${claimId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    claimId,
                    userId,
                    policyId,
                    amount,
                    status: 'approved',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to approve claim');
            }

            // Remove the approved claim from the local state
            setClaims((prevClaims) => prevClaims.filter((claim) => claim._id !== claimId));

            console.log('Claim approved:', claimId);
        } catch (error) {
            console.error('Error approving claim:', error);
        }
    };

    const handleRejectClaim = async (claimId, userId, policyId, amount) => {
        try {
            const response = await fetch(`https://claimbackend1.onrender.com/api/claims/updateClaim/${claimId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    claimId,
                    userId,
                    policyId,
                    amount,
                    status: 'rejected',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to reject claim');
            }

            // Remove the rejected claim from the local state
            setClaims((prevClaims) => prevClaims.filter((claim) => claim._id !== claimId));

            console.log('Claim rejected:', claimId);
        } catch (error) {
            console.error('Error rejecting claim:', error);
        }
    };

    //delete policy
    const handleDelete = async (policyId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/policies/policies/${policyId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete policy');
            }

            // Remove the deleted policy from the state
            setAllPolicies(allPolicies.filter((policy) => policy._id !== policyId));
        } catch (error) {
            console.error('Error deleting policy:', error);
        }
    };
    return (
        <div>
            <h1>Welcome to Admin Page</h1>
            <button className="btn btn-submit" style={{ color: 'black', backgroundColor: '#FFF8E1' }}>
                {/* navigate("/admin",{state:{userId:userId}}) */}
                    <NavLink to="/newPolicy">Create New Policy</NavLink>
            </button>


            <h1>All Claims</h1>
            <div className="claim-cards">
                {claims.map((claim) => (
                    <div key={claim._id} className="claim-card">
                        <h2>Claim ID: {claim._id}</h2>
                        <p>User ID: {claim.userId}</p>
                        <p>Amount: {claim.amount}</p>
                        <p>Status: {claim.status}</p>
                        <div className="button-group">
                            {/* <button
                                onClick={() => handleApproveClaim(claim._id, claim.userId, claim.policyId, claim.amount)}
                                style={{ backgroundColor: 'green' }}
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleRejectClaim(claim._id, claim.userId, claim.policyId, claim.amount)}
                                style={{ backgroundColor: 'red' }}
                            >
                                Reject
                            </button> */}
                            {claim.status === 'pending' && (
                                <>
                                <button
                                    onClick={() => handleApproveClaim(claim._id, claim.userId, claim.policyId, claim.amount)}
                                    style={{ backgroundColor: 'green' }}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleRejectClaim(claim._id, claim.userId, claim.policyId, claim.amount)}
                                    style={{ backgroundColor: 'red' }}
                                >
                                    Reject
                                </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>


            <h1>All Policies</h1>
            <div className="policy-cards">
            {allPolicies.map((policy) => (
            <div key={policy._id} className="policy-card">
                <h2>Policy ID: {policy._id}</h2>
                <p>Policy Name: {policy.policyName}</p>
                <p>Duration: {policy.duration} years</p>
                <p>Total Amount: {policy.totalAmount}</p>
                <div className="button-group">
                    <button onClick={() => handleDelete(policy._id)}>Delete</button>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};




//refine code 4
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export const AdminPage = () => {
//     const location = useLocation();
//     const userId = location.state.userId;
//     const token = localStorage.getItem('token');
//     const [claims, setClaims] = useState([]);

//     useEffect(() => {
//         const fetchClaims = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/api/claims/allClaims', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({ userId: userId }),
//                 });
//                 console.log(response)
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch claims');
//                 }

//                 const data = await response.json();
//                 setClaims(data);
//             } catch (error) {
//                 console.error('Error fetching claims:', error);
//             }
//         };

//         fetchClaims();
//     }, [userId, token]);
//     console.log(claims)

//     const handleApproveClaim = async (claimId, userId, policyId, amount) => {
//         try {
//             console.log("inside handle user claim", userId)
//             const response = await fetch(`http://localhost:3000/api/claims/updateClaim/${claimId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     claimId,
//                     userId,
//                     policyId,
//                     amount,
//                     status: 'approved',
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to approve claim');
//             }

//             setClaims((prevClaims) =>
//                 prevClaims.map((claim) => {
//                     if (claim._id === claimId) {
//                         return { ...claim, status: 'approved', processed: true };
//                     }
//                     return claim;
//                 })
//             );

//             console.log('Claim approved:', claimId);
//         } catch (error) {
//             console.error('Error approving claim:', error);
//         }
//     };

//     const handleRejectClaim = async (claimId, userId, policyId, amount) => {
//         try {
//             console.log("inside the reject claim", claimId)
//             const response = await fetch(`http://localhost:3000/api/claims/updateClaim/${claimId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     claimId,
//                     userId,
//                     policyId,
//                     amount,
//                     status: 'rejected',
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to reject claim');
//             }

//             setClaims((prevClaims) =>
//                 prevClaims.map((claim) => {
//                     if (claim._id === claimId) {
//                         return { ...claim, status: 'rejected', processed: true };
//                     }
//                     return claim;
//                 })
//             );

//             console.log('Claim rejected:', claimId);
//         } catch (error) {
//             console.error('Error rejecting claim:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Admin Page</h1>
//             <div className="claim-cards">
//                 {claims.map((claim) => (
//                     <div key={claim._id} className="claim-card">
//                         <h2>Claim ID: {claim._id}</h2>
//                         <p>User ID: {claim.userId}</p>
//                         <p>Amount: {claim.amount}</p>
//                         <p>Status: {claim.status}</p>
//                         <div className="button-group">
//                             {!claim.processed && claim.status !== 'approved' && (
//                                 <button
//                                     onClick={() => handleApproveClaim(claim._id, claim.userId, claim.policyId, claim.amount)}
//                                     style={{ backgroundColor: 'green' }}
//                                 >
//                                     Approve
//                                 </button>
//                             )}
//                             {!claim.processed && claim.status !== 'rejected' && (
//                                 <button
//                                     onClick={() => handleRejectClaim(claim._id, claim.userId, claim.policyId, claim.amount)}
//                                     style={{ backgroundColor: 'red' }}
//                                 >
//                                     Reject
//                                 </button>
//                             )}
//                             {claim.processed && (
//                                 <button disabled style={{ backgroundColor: 'lightgray' }}>Processed</button>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };


//refined sol 4

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export const AdminPage = () => {
//     const location = useLocation();
//     const userId = location.state.userId;
//     const token = localStorage.getItem('token');
//     const [claims, setClaims] = useState([]);

//     useEffect(() => {
//         const fetchClaims = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/api/claims/allClaims', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({ userId: userId }),
//                 });
//                 console.log(response)
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch claims');
//                 }

//                 const data = await response.json();
//                 setClaims(data);
//             } catch (error) {
//                 console.error('Error fetching claims:', error);
//             }
//         };

//         fetchClaims();
//     }, [userId, token]);
//     console.log(claims)

//     const handleApproveClaim = async (claimId,userId,policyId,amount) => {
//         try {
//             console.log("inside handle user claim",userId)
//             const response = await fetch(`http://localhost:3000/api/claims/updateClaim/${claimId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     claimId,
//                     userId,
//                     policyId,
//                     amount,
//                     status: 'approved',
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to approve claim');
//             }

//             setClaims((prevClaims) =>
//                 prevClaims.map((claim) => (claim._id === claimId ? { ...claim, status: 'approved' } : claim))
//             );

//             console.log('Claim approved:', claimId);
//         } catch (error) {
//             console.error('Error approving claim:', error);
//         }
//     };

//     const handleRejectClaim = async (claimId,userId,policyId,amount) => {
//         try {
//             console.log("inside the reject claim",claimId)
//             const response = await fetch(`http://localhost:3000/api/claims/updateClaim/${claimId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     claimId,
//                     userId,
//                     policyId,
//                     amount,
//                     status: 'rejected',
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to reject claim');
//             }

//             setClaims((prevClaims) =>
//                 prevClaims.map((claim) => (claim._id === claimId ? { ...claim, status: 'rejected' } : claim))
//             );

//             console.log('Claim rejected:', claimId);
//         } catch (error) {
//             console.error('Error rejecting claim:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Admin Page</h1>
//             <div className="claim-cards">
//                 {claims.map((claim) => (
//                     <div key={claim._id} className="claim-card">
//                         <h2>Claim ID: {claim._id}</h2>
//                         <p>User ID: {claim.userId}</p>
//                         <p>Amount: {claim.amount}</p>
//                         <p>Status: {claim.status}</p>
//                         <div className="button-group">
//                             {!claim.processed && claim.status !== 'approved' && (
//                                 <button
//                                     onClick={() => handleApproveClaim(claim._id,claim.userId,claim.policyId,claim.amount)}
//                                     style={{ backgroundColor: 'green' }}
//                                 >
//                                     Approve
//                                 </button>
//                             )}
//                             {!claim.processed && claim.status !== 'rejected' && (
//                                 <button
//                                     onClick={() => handleRejectClaim(claim._id,claim.userId,claim.policyId,claim.amount)}
//                                     style={{ backgroundColor: 'red' }}
//                                 >
//                                     Reject
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };





//refined code 3

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export const AdminPage = () => {
//     const location = useLocation(); // Use the useLocation hook to get the location object
//     const userId = location.state.userId; // Extract the userId from the location state
//     const token = localStorage.getItem('token');
//     const [claims, setClaims] = useState([]);

//     useEffect(() => {
//         // Fetch all claims
//         const fetchClaims = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/api/claims/allClaims', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`, // Make sure to add admin token here
//                     },
//                     body: JSON.stringify({ userId: userId }), // Pass admin userId here
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch claims');
//                 }
//                 const data = await response.json();
//                 console.log("all the claims are",data)
//                 setClaims(data);
//             } catch (error) {
//                 console.error('Error fetching claims:', error);
//             }
//         };

//         fetchClaims();
//     }, [userId, token]); // Include userId and token in the dependency array

//     const handleApprove = async (claimId) => {
//         // Implement logic to approve the claim
//         // Update claim status in the backend and then update the local state
//         const updatedClaims = claims.map((claim) =>
//             claim._id === claimId ? { ...claim, status: 'approved', processed: true } : claim
//         );
//         setClaims(updatedClaims);
//     };

//     const handleReject = async (claimId) => {
//         // Implement logic to reject the claim
//         // Update claim status in the backend and then update the local state
//         const updatedClaims = claims.map((claim) =>
//             claim._id === claimId ? { ...claim, status: 'rejected', processed: true } : claim
//         );
//         setClaims(updatedClaims);
//     };

//     return (
//         <div>
//             <h1>Admin Page</h1>
//             <div className="claim-cards">
//                 {claims.map((claim) => (
//                     <div key={claim._id} className="claim-card">
//                         <h2>Claim ID: {claim._id}</h2>
//                         <p>User ID: {claim.userId}</p>
//                         <p>Amount: {claim.amount}</p>
//                         <p>Status: {claim.status}</p>
//                         <div className="button-group">
//                             {claim.status !== 'approved' && !claim.processed && (
//                                 <button
//                                     onClick={() => handleApprove(claim._id)}
//                                     style={{ backgroundColor: 'green' }}
//                                     disabled={claim.status === 'rejected'}
//                                 >
//                                     Approve
//                                 </button>
//                             )}
//                             {claim.status !== 'rejected' && !claim.processed && (
//                                 <button
//                                     onClick={() => handleReject(claim._id)}
//                                     style={{ backgroundColor: 'red' }}
//                                     disabled={claim.status === 'approved'}
//                                 >
//                                     Reject
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };





// // refine code 2


// // import React, { useState, useEffect } from 'react';
// // import { useLocation } from 'react-router-dom';

// // export const AdminPage = () => {
// //     const location = useLocation(); // Use the useLocation hook to get the location object
// //     const userId = location.state.userId; // Extract the userId from the location state
// //     const token = localStorage.getItem('token');
// //     const [claims, setClaims] = useState([]);

// //     useEffect(() => {
// //         // Fetch all claims
// //         const fetchClaims = async () => {
// //             try {
// //                 const response = await fetch('http://localhost:3000/api/claims/allClaims', {
// //                     method: 'POST',
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                         Authorization: `Bearer ${token}`, // Make sure to add admin token here
// //                     },
// //                     body: JSON.stringify({ userId: userId }), // Pass admin userId here
// //                 });

// //                 if (!response.ok) {
// //                     throw new Error('Failed to fetch claims');
// //                 }

// //                 const data = await response.json();
// //                 setClaims(data);
// //             } catch (error) {
// //                 console.error('Error fetching claims:', error);
// //             }
// //         };

// //         fetchClaims();
// //     }, [userId, token]); // Include userId and token in the dependency array

// //     const handleApprove = async (claimId) => {
// //         // Implement logic to approve the claim
// //         // Update claim status in the backend and then update the local state
// //         const updatedClaims = claims.map((claim) =>
// //             claim._id === claimId ? { ...claim, status: 'approved' } : claim
// //         );
// //         setClaims(updatedClaims);
// //     };

// //     const handleReject = async (claimId) => {
// //         // Implement logic to reject the claim
// //         // Update claim status in the backend and then update the local state
// //         const updatedClaims = claims.map((claim) =>
// //             claim._id === claimId ? { ...claim, status: 'rejected' } : claim
// //         );
// //         setClaims(updatedClaims);
// //     };

// //     return (
// //         <div>
// //             <h1>Admin Page</h1>
// //             <div className="claim-cards">
// //                 {claims.map((claim) => (
// //                     <div key={claim._id} className="claim-card">
// //                         <h2>Claim ID: {claim._id}</h2>
// //                         <p>User ID: {claim.userId}</p>
// //                         <p>Amount: {claim.amount}</p>
// //                         <p>Status: {claim.status}</p>
// //                         <div className="button-group">
// //                             {claim.status !== 'approved' && (
// //                                 <button
// //                                     onClick={() => handleApprove(claim._id)}
// //                                     style={{ backgroundColor: 'green' }}
// //                                     disabled={claim.status === 'rejected'}
// //                                 >
// //                                     Approve
// //                                 </button>
// //                             )}
// //                             {claim.status !== 'rejected' && (
// //                                 <button
// //                                     onClick={() => handleReject(claim._id)}
// //                                     style={{ backgroundColor: 'red' }}
// //                                     disabled={claim.status === 'approved'}
// //                                 >
// //                                     Reject
// //                                 </button>
// //                             )}
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // };






// // // import React, { useState, useEffect } from 'react';
// // // import { useLocation } from 'react-router-dom';

// // // export const AdminPage = () => {
// // //     const location = useLocation(); // Use the useLocation hook to get the location object
// // //     const userId = location.state.userId; // Extract the userId from the location state
// // //     const token = localStorage.getItem('token');
// // //     const [claims, setClaims] = useState([]);

// // //     useEffect(() => {
// // //         // Fetch all claims
// // //         const fetchClaims = async () => {
// // //             try {
// // //                 const response = await fetch('http://localhost:3000/api/claims/allClaims', {
// // //                     method: 'POST',
// // //                     headers: {
// // //                         'Content-Type': 'application/json',
// // //                         Authorization: `Bearer ${token}`, // Make sure to add admin token here
// // //                     },
// // //                     body: JSON.stringify({ userId: userId }), // Pass admin userId here
// // //                 });

// // //                 if (!response.ok) {
// // //                     throw new Error('Failed to fetch claims');
// // //                 }

// // //                 const data = await response.json();
// // //                 setClaims(data);
// // //             } catch (error) {
// // //                 console.error('Error fetching claims:', error);
// // //             }
// // //         };

// // //         fetchClaims();
// // //     }, [userId, token]); // Include userId and token in the dependency array

// // //     const handleApprove = async (claimId) => {
// // //         // Implement logic to approve the claim
// // //     };

// // //     const handleReject = async (claimId) => {
// // //         // Implement logic to reject the claim
// // //     };

// // //     return (
// // //         <div>
// // //             <h1>Admin Page</h1>
// // //             <div className="claim-cards">
// // //                 {claims.map((claim) => (
// // //                     <div key={claim._id} className="claim-card">
// // //                         <h2>Claim ID: {claim._id}</h2>
// // //                         <p>User ID: {claim.userId}</p>
// // //                         <p>Amount: {claim.amount}</p>
// // //                         <p>Status: {claim.status}</p>
// // //                         <div className="button-group">
// // //                             <button onClick={() => handleApprove(claim._id)}>Approve</button>
// // //                             <button onClick={() => handleReject(claim._id)}>Reject</button>
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     );
// // // };
