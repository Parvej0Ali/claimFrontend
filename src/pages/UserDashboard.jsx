import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PolicyCard from '../components/PolicyCard';
import PurchasePolicyForm from '../components/PurchasePolicyForm';
import ClaimForm from '../components/ClaimForm';
import ClaimCard from '../components/ClaimCard';
export const UserDashboard = () => {
    const location = useLocation();
    const userId = location.state.userId;
    const username = location.state.username;
    const token=localStorage.getItem('token')
    console.log("token in dashboard",token)
    console.log("this is user dashboard",userId)

    const [userPolicies, setUserPolicies] = useState([]);
    const [userData, setUserData] = useState({});
    const [allPolicies, setAllPolicies] = useState([]);
    const [claims, setClaims] = useState([]);
    const [claimAmount, setClaimAmount] = useState('');
    const [selectedPolicy, setSelectedPolicy] = useState(null);

    
    useEffect(() => {
      const fetchUserPolicies = async () => {
          try {
              const response = await fetch(`https://claim-backend1.vercel.app/api/policies/showPoliciesByUserId/${userId}`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              //const userPoliciesData=response.data.policies;
              setUserData(response.data)
              //console.log("ha ha data ",userPoliciesData)
              console.log("here is your fetch policy ")



              if (!response.ok) {
                  throw new Error('Failed to fetch user policies');
              }
              const data = await response.json();
              console.log('this if from show policy by userid',data)
              setUserPolicies(data);
              console.log(userPolicies)
          } catch (error) {
              console.error('Error fetching user policies:', error);
          }
      };
      const fetchAllPolicies = async () => {
        try {
            const response = await fetch(`https://claim-backend1.vercel.app/api/policies/showAllPolicies`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch all policies');
            }
            const data = await response.json();
            console.log('this is from show all policy')
            setAllPolicies(data);
            
        } catch (error) {
            console.error('Error fetching all policies:', error);
        }
    };

    // fetch claims by userid
    const fetchClaimsByUserId = async () => {
      try {
          const response = await fetch(`https://claim-backend1.vercel.app/api/claims/claimsByUserId/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });

          if (!response.ok) {
              throw new Error('Failed to fetch user claims');
          }

          const data = await response.json();
          setClaims(data);
      } catch (error) {
          console.error('Error fetching user claims:', error);
      }
  };
      if (token) {
        console.log("fetch users policy run")
          fetchUserPolicies();
        console.log("fetch users policy ended")

          fetchAllPolicies();
          fetchClaimsByUserId();
      }
  }, [userId, token]);
  const handleBuyPolicy = async (policyId) => {
    try {
        const response = await fetch(`https://claim-backend1.vercel.app/api/purchase/buyPolicy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId,
                policyId,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to buy policy');
        }
        const data = await response.json();
        setUserPolicies([...userPolicies, data]);
        window.location.reload();
    } catch (error) {
        console.error('Error buying policy:', error);
    }
};


const handleClaimAmountChange = (event) => {
  setClaimAmount(event.target.value);
  console.log(claimAmount)
};

const handleClaim = async () => {
  try {
    // console.log('cajshjasfhkjhjfa' , policyId)
      const response = await fetch(`https://claim-backend1.vercel.app/api/claims/createClaim`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
              userId:userId,
              policyId: selectedPolicy,
              amount: claimAmount,
          }),
      });
      console.log(response)
      if (!response.ok) {
          throw new Error('Failed to create claim');
      }
      // Update claims state after successful claim submission
      const data = await response.json();
      setClaims([...claims, data]);
      setClaimAmount(''); // Clear claim amount after submission
  } catch (error) {
      console.error('Error creating claim:', error);
  }
};

    console.log("at display container ",userPolicies)
    return (
        <div>
            <h1>Welcome to HEALTH INSURANCE, {username}</h1>
            <h2>Your Policies</h2>
            
            <div className="policy-cards">
                {userPolicies.map((policy) => (
                    <PolicyCard key={policy._id} policy={policy} />
                ))}
            </div>
            {/* <h2>Buy Policy</h2>
            <PurchasePolicyForm onBuyPolicy={handleBuyPolicy} /> */}
             <h2>Buy Policy</h2>
            <div className="policy-cards">
                {allPolicies
                   .filter((policy) => !userPolicies.some((userPolicy) => userPolicy.policyId === policy._id))
                    .map((policy) => (
                        <div key={policy._id} className="policy-card">
                            <h3>{policy.policyName}</h3>
                            <p>Total Amount: {policy.totalAmount}</p>
                            <p>Premium Amount: {policy.premiumAmount}</p>
                            <p>Duration: {policy.duration} years</p>
                            <p>PolicyId:{policy._id}</p>
                            <button onClick={() => handleBuyPolicy(policy._id)}>Buy</button>
                        </div>
                    ))}
              
            </div>
{/* show all claims by user id  */}
            <h2>Your Claims</h2>
            <div className="claim-cards">
                {claims.map((claim) => (
                    <ClaimCard key={claim._id} claim={claim} />
                ))}
            </div>

            <h2>Make a Claim</h2>
            <div>
                <select 
                onChange={(event) => setSelectedPolicy(event.target.value)}
                >
                    <option value="">Select Policy to Claim</option>
                    {userPolicies.map((policy) => (
                        <option key={policy._id} >
                            {policy.policyId}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Enter claim amount"
                    value={claimAmount}
                    onChange={handleClaimAmountChange}
                />
                <button onClick={handleClaim}>Claim</button>
            </div>

        </div>
    );
}



// const handleClaimAmountChange = (event) => {
//   setClaimAmount(event.target.value);
// };

// const handlePolicySelect = (policyId) => {
//   setSelectedPolicy(policyId);
// };

// const handleClaim = async () => {
//   try {
//       const response = await fetch(`http://localhost:3000/api/claims/createClaim`, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//               userId,
//               policyId: selectedPolicy,
//               amount: claimAmount,
//           }),
//       });
//       if (!response.ok) {
//           throw new Error('Failed to create claim');
//       }
//       const data = await response.json();
//       console.log('Claim created:', data);
//       // Update claims state or UI as needed
//   } catch (error) {
//       console.error('Error creating claim:', error);
//   }
// };


              // const policiesWithDetails = await Promise.all(userPoliciesData.map(async (policy) => {
              //   const policyId = policy.policyId; // Assuming the policy object has a policyId field
              //   const policyDetailResponse = await fetch(`http://localhost:3000/api/policies/getPolicyById/${userId}`, {
              //     headers: {
              //         Authorization: `Bearer ${token}`,
              //     },
              //   });
              //   const policyDetail = policyDetailResponse.data;
              //   return {userId, ...policy, ...policyDetail };
              // }));
      
              //setUserPolicies(policiesWithDetails);



    // useEffect(() => {
    //     // Fetch user's policies
    //     const fetchUserPolicies = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3000/api/policies/user/${userId}`,
    //             {
    //               headers: {
    //                   Authorization: `Bearer ${token}`,
    //               },
    //           }
    //           );
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch user policies');
    //             }
    //             const data = await response.json();
    //             console.log('here are userpolicybyid',data)
    //             setUserPolicies(data);
    //         } catch (error) {
    //             console.error('Error fetching user policies:', error);
    //         }
    //     };
    //     if(token){
    //       fetchUserPolicies();
    //     }, [userId, token]);}

    //     // Fetch user's claims
    //     const fetchUserClaims = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3000/api/claims/getClaimById/${userId}`);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch user claims');
    //             }
    //             const data = await response.json();
    //             setClaims(data);
    //         } catch (error) {
    //             console.error('Error fetching user claims:', error);
    //         }
    //     };
    //     fetchUserClaims();
    // }, [userId]);

    // const handleBuyPolicy = async (policyId) => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/api/purchase/buyPolicy`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 userId,
    //                 policyId,
    //             }),
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to buy policy');
    //         }
    //         // Refresh user policies after buying a policy
    //         const data = await response.json();
    //         setUserPolicies([...userPolicies, data]);
    //     } catch (error) {
    //         console.error('Error buying policy:', error);
    //     }
    // };

    // const handleClaim = async (claimData) => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/api/claims/createClaim`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(claimData),
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to create claim');
    //         }
    //         // Refresh user claims after creating a claim
    //         const data = await response.json();
    //         setClaims([...claims, data]);
    //     } catch (error) {
    //         console.error('Error creating claim:', error);
    //     }
    // };
    //console.log(policy)


            {/* <h2>Make a Claim</h2>
            <div>
                {userPolicies.length > 0 && (
                    <div>
                        <select onChange={(e) => handlePolicySelect(e.target.value)}>
                            <option value="">Select Policy</option>
                            {userPolicies.map((policy) => (
                                <option key={policy._id} value={policy._id}>
                                    {policy.policyName}
                                </option>
                            ))}
                        </select>
                        {selectedPolicy && (
                            <div>
                                <input
                                    type="number"
                                    placeholder="Enter claim amount"
                                    value={claimAmount}
                                    onChange={handleClaimAmountChange}
                                />
                                <button onClick={handleClaim}>Claim</button>
                            </div>
                        )}
                    </div>
                )}
            </div> */}
            {/* <h2>Make a Claim</h2>
            <ClaimForm userId={userId} policies={userPolicies} onSubmitClaim={handleClaim} />
            <h2>Your Claims</h2>
            <div className="claim-cards">
                {claims.map((claim) => (
                    <div key={claim._id}>
                        <p>Claim ID: {claim._id}</p>
                        <p>Amount: {claim.amount}</p>
                        <p>Status: {claim.status}</p>
                    </div>
                ))}
            </div> */}