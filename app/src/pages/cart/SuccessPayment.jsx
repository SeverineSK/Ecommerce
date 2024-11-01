import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import {Link} from "react-router-dom";  // Import a success icon

const SuccessPayment = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center h-content text-center p-8">
            <FaCheckCircle size={48} className="text-success mb-4"/>  {/* Success icon */}
            <h1 className="text-2xl font-bold text-gray-300 mb-4">Payment Successful</h1>
            <p className="text-gray-400 mb-4">Your payment has been successfully processed.</p>
            <p className="text-gray-400 mb-4">Order Number: #123456</p>
            <div className="flex flex-col space-y-4 w-full max-w-sm">
                <Link to={"/"} className="btn btn-primary">Back to Shop</Link>
                <button className="btn btn-outline">View My Orders</button>
            </div>
        </div>
    );
};

export default SuccessPayment;
