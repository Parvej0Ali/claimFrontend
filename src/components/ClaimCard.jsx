import React from 'react';
import './ClaimCard.css'; // Import CSS file for styling

const ClaimCard = ({ claim }) => {
    const { _id, amount, status,policyId } = claim;

    // Function to determine the class name based on claim status
    const getStatusClassName = () => {
        switch (status) {
            case 'pending':
                return 'pending';
            case 'approved':
                return 'approved';
            case 'rejected':
                return 'rejected';
            default:
                return '';
        }
    };

    return (
        <div className={`claim-card ${getStatusClassName()}`}>
            <p className="claim-title">Claim ID: {_id}</p>
            <p className="claim-details">PolicyId: {policyId}</p>
            <p className="claim-details">Amount: {amount}</p>
            <p className="claim-details">Status: {status}</p>
        </div>
    );
};

export default ClaimCard;

// import React from 'react';

// const ClaimCard = ({ claim }) => {
//     const { _id, amount, status } = claim;

//     // Function to determine the class name based on claim status
//     const getStatusClassName = () => {
//         switch (status) {
//             case 'pending':
//                 return 'pending-claim';
//             case 'approved':
//                 return 'approved-claim';
//             case 'rejected':
//                 return 'rejected-claim';
//             default:
//                 return '';
//         }
//     };

//     return (
//         <div className={`claim-card ${getStatusClassName()}`}>
//             <h3>Claim ID: {_id}</h3>
//             <p>Amount: {amount}</p>
//             <p>Status: {status}</p>
//         </div>
//     );
// };

// export default ClaimCard;
