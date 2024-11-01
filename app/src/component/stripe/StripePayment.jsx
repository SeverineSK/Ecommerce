import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaymentButton from '../ui/button/PaymentButton';


const CartPage = () => {
    return (
        
        <div className={"flex gap-2 flex-wrap"}>
        <PaymentButton 
                      buttonText={"Payment"}
                      buttonClass={"btn-block btn-success"}
                    //   path={"/"}
                    />
        </div>
    );
  };






  
// function StripePayment() {
                    
                    //   const [price, setPayment] = useState([]);
                    //   const [loading, setLoading] = useState(true);
                    //   const [error, setError] = useState(false);
                    
                    //   useEffect(() => {
                    //     async function fetchCart() {
                    //       try {
                    //         const response = await fetch('http://localhost:8000/api/createPaymentSession', {
                    //           method: 'POST',
                    //           headers: {
                    //             'Accept': 'application/json',
                    //           },
                    //         });
                    
                    
                    //         window.location.href = response.data;
                    //       } catch (error) {
                    //         console.error('Error creating session:', error);
                    //       }
                    //     }
                    //     fetchCart();
                    //   }, []);
                    
                      // return (
                    
                      // )
                    
                    // };
                    
                    
                    //   return (
                    //      onClick={handlePayment} className={`btn btn-outline ${buttonClass}`}>
                    //       <HiCreditCard className={"text-lg"} />
                    //       {buttonText}
                        
                    //          <div className={"flex gap-2 flex-wrap"}>
                    //                   <PaymentButton 
                    //                                buttonText={"Payment"}
                    //                                buttonClass={"btn-block btn-success"}
                    //                              //   path={"/"}
                    //                  />
                    //                  </div>
                    //   );
                    // };
                    
                    // export default PaymentButton;
                    
                    
                    
                    // import React from "react";
                    // import PaymentButton from "../ui/button/PaymentButton";
                    
                    
                    
                    
export default CartPage;