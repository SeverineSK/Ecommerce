import CartCards from "../../component/cart/CartCards.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../services/context/AuthContext.jsx";
import ProgressBar from "./ProgressBar.jsx";
import Shipping from "../checkout/Shipping.jsx";
import CreditCardForm from "../checkout/CreditCardForm.jsx";

const Cart = () => {

    const [step, setStep] = useState(1);
    const handleStripeCheckout = () => {
        const data = {
            "cart": cart,
            "address": address,
            "rate": selectedRate,
            "credit_card": creditCard,
            "total": parseFloat(total),
        }
        
        console.log("stripe checkout", data);
        // Route::post('/create-payment-session', [PaymentController::class, 'createPaymentSession']);

        fetch ('http://localhost:8000/api/create-payment-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                window.location.href = data.url;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const { cart } = useContext(AuthContext);
    const [selectedRate, setSelectedRate] = useState(null);
    const [address, setAddress] = useState(null);
    const [total, setTotal] = useState(0);
    const [totalWithoutVat, setTotalWithoutVat] = useState(0);
    const [vat] = useState(20);
    const [creditCard, setCreditCard] = useState(null);


    useEffect(() => {
        if (cart) {
            let price = 0;
            cart.forEach(item => {
                let itemPrice = item.price; // prix de base de l'article

                // Ajout des variantes de prix des caractéristiques
                if (item.features && item.features.length > 0) {
                    item.features.forEach(feature => {
                        itemPrice += feature.variantPrice;
                    });
                }

                // Appliquer la quantité
                itemPrice *= item.quantity;

                // Appliquer la remise
                if (item.article.discount > 0) {
                    itemPrice = itemPrice - (itemPrice * item.article.discount / 100);
                }

                // Ajout au total
                price += itemPrice;
            });

            // Calcul du total sans TVA
            setTotalWithoutVat(price.toFixed(2));

            // Calcul du total avec TVA
            let totalPrice = price + (price * vat / 100);

            // Ajout des frais de livraison
            if (selectedRate) {
                totalPrice += parseFloat(selectedRate.rate);
            }

            // Mise à jour du total
            setTotal(totalPrice.toFixed(2));
        }
    }, [cart, selectedRate, vat]);


    console.log(cart);
    console.log(selectedRate);
    console.log(address);
    console.log(creditCard);



    return (
        <div className="grid grid-cols-1 gap-4 h-content lg:grid-cols-3 lg:gap-8 pt-12">

            <div className={"rounded-lg lg:col-span-2 px-6"}>

                <ProgressBar step={step} />

                {step === 1 &&
                    <div className={"h-[40rem] max-md:h-[23rem] pt-6"}>
                        <CartCards />
                    </div>
                }

                {step === 2 &&
                    <div className={"pt-6"}>
                        <Shipping selectedRate={selectedRate}
                                  setSelectedRate={setSelectedRate}
                                  setAddress={setAddress}
                                  address={address}
                        />
                    </div>
                }

                {step === 3 &&
                    <div className={"pt-12"}>
                        <CreditCardForm
                            setCreditCard={setCreditCard}
                            creditCard={creditCard}
                        />
                    </div>
                }
            </div>

            <div className={"rounded-lg pr-12 max-lg:px-6 max-xs:px-6 max-lg:self-end pb-6"}>
                <div className={"flex flex-col gap-2"}>
                    <div className={"flex w-full justify-between uppercase font-semibold"}>
                        <p className={"text-gray-500"}>Subtotal</p>
                        <p className={""}><span className={"mr-1 text-success"}>$</span>{cart ? totalWithoutVat : 0}</p>
                    </div>

                    <div className={"flex w-full justify-between uppercase font-semibold"}>
                        <p className={"text-gray-500"}>Shipping</p>
                        <p className={""}><span className={"mr-1 text-success"}>$</span>{selectedRate ? selectedRate.rate : 0}</p>
                    </div>

                    <div className={"flex w-full justify-between uppercase font-semibold"}>
                        <p className={"text-gray-500"}>VAT</p>
                        <p className={""}>{vat} %</p>
                    </div>
                </div>

                <div className={"w-full h-[2px] bg-base-300 my-2"}></div>

                <div className={"flex w-full justify-between font-black uppercase text-xl"}>
                    <p className={""}>Total</p>
                    <p className={""}><span className={"mr-1 text-success"}>$</span>{cart ? total : 0}</p>
                </div>

                <div className={"mt-12"}>
                    <button onClick={() =>
                        step === 1 && setStep(2)
                        || step === 2 && selectedRate && setStep(3)
                        || step === 3 && creditCard && handleStripeCheckout()
                    } className={"btn btn-block btn-primary"}>
                        {step === 1 && "Proceed to checkout"}
                        {step === 2 && "Go for payment"}
                        {step === 3 && "Pay"}
                    </button>

                    {step > 1 &&
                        <button onClick={() => setStep((prev) => prev - 1)} className={"btn btn-block bg-base-300 hover:bg-gray-700 mt-2"}>
                            Back
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;

