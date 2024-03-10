import React, { useState } from 'react';

const PurchasePolicyForm = ({ onBuyPolicy }) => {
    const [policyId, setPolicyId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onBuyPolicy(policyId);
        setPolicyId('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Policy ID:
                <input type="text" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
            </label>
            <button type="submit">Buy Policy</button>
        </form>
    );
};

export default PurchasePolicyForm;
