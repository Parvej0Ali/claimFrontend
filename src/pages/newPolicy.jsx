import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const NewPolicy = () => {
    
    const [policy, setPolicy] = useState({
        policyName: "",
        duration: "",
        premiumAmount: "",
        totalAmount: "",
        paymentFrequency: "Every Month"
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setPolicy(prevPolicy => ({
            ...prevPolicy,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/policies/createPolicy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(policy)
            });
            if (response.ok) {
                // Policy created successfully
                alert('Policy created successfully');
                navigate('/admin',{ state: {userId:userId}}); // Navigate to admin page or any other desired location
            } else {
                // Policy creation failed
                throw new Error('Failed to create policy');
            }
        } catch (error) {
            console.error('Error creating policy:', error);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="NewPolicy grid-two-cols">
                        <div className="container">
                            <div className="NewPolicy form">
                                <h1 className="main headind mb-3">Create New Policy</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="policyName">Policy Name</label>
                                        <input
                                            type="text"
                                            id="policyName"
                                            name="policyName"
                                            value={policy.policyName}
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="duration">Duration (in years)</label>
                                        <input
                                            type="number"
                                            id="duration"
                                            name="duration"
                                            value={policy.duration}
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="premiumAmount">Premium Amount</label>
                                        <input
                                            type="number"
                                            id="premiumAmount"
                                            name="premiumAmount"
                                            value={policy.premiumAmount}
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="totalAmount">Total Amount</label>
                                        <input
                                            type="number"
                                            id="totalAmount"
                                            name="totalAmount"
                                            value={policy.totalAmount}
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="paymentFrequency">Payment Frequency</label>
                                        <select
                                            id="paymentFrequency"
                                            name="paymentFrequency"
                                            value={policy.paymentFrequency}
                                            onChange={handleInput}
                                            required
                                        >
                                            <option value="Every Month">Every Month</option>
                                            <option value="Once in Four Months">Once in Four Months</option>
                                            <option value="Once in a Year">Once in a Year</option>
                                            <option value="Every Year">Every Year</option>
                                        </select>
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">
                                        Create Policy
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