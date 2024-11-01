import { useState } from "react";

function useCheckout() {
    const [apiErrors, setApiErrors] = useState(null);
    const [apiSuccess, setApiSuccess] = useState(null);
    const [requestLoading, setRequestLoading] = useState(false);
    const [rates, setRates] = useState(null);

    const getRates = async (data) => {
        try {
            setRequestLoading(true);
            const response = await fetch('http://localhost:8000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            console.log(responseData);
            setRates(responseData.rates);
            setRequestLoading(false);
            setApiSuccess(responseData.message);
            setTimeout(() => {
                setApiSuccess(null);
            }, 2000);
        } catch (err) {
            console.log(err);
            setRequestLoading(false);
            setApiErrors(err.message || 'Something went wrong, please try again.');
            setTimeout(() => {
                setApiErrors(null);
            }, 2000);
        }

    };

    return {
        getRates,
        apiErrors,
        apiSuccess,
        requestLoading,
        rates
    }

    
}
export default useCheckout;