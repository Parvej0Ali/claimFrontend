
import React from 'react';
import "./PolicyCard.css"

const PolicyCard = ({ policy }) => {
    const TotalAmount=policy.claimableAmount
    const Duration=policy.policyId
    const expiry=policy.expiresOn
    const date = new Date(expiry);
    const formattedDate = date.toISOString().split('T')[0];
    console.log("date from policy Card:", formattedDate);

    return (
        <div className="policy-card">
            <h3>PolicyName:{policy.policyId}</h3>
            <p>Claimable Amount:{TotalAmount}</p>
            <p>Policy Duration:{policy.duration}</p>
            <p>Expires On :{formattedDate}</p>
        </div>
    );
};

export default PolicyCard;






























// import React, { useState, useEffect } from 'react';
// import "./PolicyCard.css"
// import { useLocation } from 'react-router-dom';

// const PolicyCard = ({ policy }) => {
//     const [policyName, setPolicyName] = useState('');
//     const location = useLocation();
//     const userId = useLocation.userId;
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         const fetchPolicyName = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3000/api/policies/showAllPolicies`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch policy name');
//                 }
//                 const data = await response.json();
//                 console.log("policycardddddd", data);

//                 const matchedPolicy = data.find(item => item.policyId === policy.policyId);
//                 if (matchedPolicy) {
//                     console.log("this is matched policy")
//                     setPolicyName(matchedPolicy.policyName);
//                 } else {
//                     console.error('Policy not found');
//                 }
//             } catch (error) {
//                 console.error('Error fetching policy name:', error);
//             }
//         };

//         fetchPolicyName();
//     }, [policy.policyId, token]);

//     const TotalAmount = policy.claimableAmount;
//     const Duration = policy.policyId;
//     const expiry = policy.expiresOn;
//     const date = new Date(expiry);
//     const formattedDate = date.toISOString().split('T')[0];

//     return (
//         <div className="policy-card">
//             <h3>PolicyName: {policyName}</h3>
//             <p>Claimable Amount: {TotalAmount}</p>
//             <p>Policy Duration: {Duration}</p>
//             <p>Expires On: {formattedDate}</p>
//         </div>
//     );
// };

// export default PolicyCard;





// import React, { useState, useEffect } from 'react';
// import "./PolicyCard.css"
// import { useLocation } from 'react-router-dom';

// const PolicyCard = ({ policy }) => {
//     const [policyName, setPolicyName] = useState('');
//     const location = useLocation();
//     const userId = useLocation.userId;
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         const fetchPolicyName = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3000/api/policies/showAllPolicies`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch policy name');
//                 }
//                 const data = await response.json();
//                 console.log("policycardddddd", data);

//                 const matchedPolicy = data.find(item => item.policyId === policy.policyId);
//                 if (matchedPolicy) {
//                     console.log("this is matched policy")
//                     setPolicyName(matchedPolicy.policyName);
//                 } else {
//                     //console.error('Policy not found');
//                 }
//             } catch (error) {
//                 console.error('Error fetching policy name:', error);
//             }
//         };

//         fetchPolicyName();
//     }, [policy.policyId, token]);
//     const PolicyName=policyName
//     const TotalAmount = policy.claimableAmount;
//     const Duration = policy.policyId;
//     const expiry = policy.expiresOn;
//     const date = new Date(expiry);
//     const formattedDate = date.toISOString().split('T')[0];

//     return (
//         <div className="policy-card">
//             <h3>PolicyName: {PolicyName}</h3>
//             <p>Claimable Amount: {TotalAmount}</p>
//             <p>Policy Duration: {policy.duration}</p>
//             <p>Expires On: {formattedDate}</p>
//         </div>
//     );
// };

// export default PolicyCard;





// import React, { useState, useEffect } from 'react';
// import "./PolicyCard.css"
// import { useLocation } from 'react-router-dom';


// const PolicyCard = ({ policy }) => {
//     const [policyName, setPolicyName] = useState('');
//     const location = useLocation();
//     const userId=useLocation.userId;
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         const fetchPolicyName = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3000/api/policies/showAllPolicies`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch policy name');
//                 }
//                 const data = await response.json();
//                 console.log("policycardddddd",data)

//                 setPolicyName(data.policyName);
//             } catch (error) {
//                 console.error('Error fetching policy name:', error);
//             }
//         };

//         fetchPolicyName();
//     }, [userId, token]);
    
//     const TotalAmount = policy.claimableAmount;
//     const Duration = policy.policyId;
//     const expiry = policy.expiresOn;
//     const date = new Date(expiry);
//     const formattedDate = date.toISOString().split('T')[0];

//     return (
//         <div className="policy-card">
//             <h3>PolicyName: {policyName}</h3>
//             <p>Claimable Amount: {TotalAmount}</p>
//             <p>Policy Duration: {policy.duration}</p>
//             <p>Expires On: {formattedDate}</p>
//         </div>
//     );
// };

// export default PolicyCard;





