import React from 'react';

const ClaimForm = ({ onSubmitClaim, policies }) => {
    const [selectedPolicy, setSelectedPolicy] = React.useState('');
    const [claimAmount, setClaimAmount] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitClaim(selectedPolicy, claimAmount);
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={selectedPolicy} onChange={(e) => setSelectedPolicy(e.target.value)}>
                <option value="">Select Policy</option>
                {policies.map((policy) => (
                    <option key={policy._id} value={policy._id}>
                        {policy.policyName}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Enter claim amount"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
            />
            <button type="submit">Claim</button>
        </form>
    );
};

export default ClaimForm;
