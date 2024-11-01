// import React from 'react';
import {HiShoppingCart, HiX} from "react-icons/hi";
import {useContext, useEffect} from "react";
import {useState} from "react";
import {AuthContext} from "../../../services/context/AuthContext.jsx";
import Drawer from "../../ui/modal/Drawer.jsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import CartCard from "../../cart/CartCard.jsx";


const CartWidget = () => {

    const { cart} = useContext(AuthContext);
    const [loading] = useState({});
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (cart) {
            let price = 0;
            let quantity = 0;
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
                quantity += item.quantity;
            });

            setTotalPrice(price.toFixed(2));
            setTotalQuantity(quantity);
        }
    }, [cart]);

    return (
        <Drawer
            title={"My Cart"}
            buttonClass={"btn btn-circle btn-active"}
            buttonText={
            <div className={"indicator"}>
                <HiShoppingCart className={"text-3xl"}/>
                <span className="indicator-item badge badge-outline bg-base-300 text-xs pointer-events-none">
                    {cart ? totalQuantity : 0}
                </span>
            </div>
        }>
            {cart != null ?
                <>
                    <span className="text-sm my-6 text-gray-400">{cart ? totalQuantity : 0} Item(s)</span>

                    <div className={`flex flex-col gap-2 h-full overflow-y-scroll w-full}`}>
                        {cart && cart.map((item, index) => (
                            <CartCard
                                key={index}
                                index={index}
                                itemName={item.article.name}
                                itemQuantity={item.quantity}
                                itemPrice={item.article.price}
                                itemPicture={item.article.picture}
                                item = {item}
                            />
                        ))}
                    </div>

                    <div className={"mt-auto"}>
                        <div className={"flex justify-between"}>
                            <p className="text-gray-400 text-sm self-end">Shipping</p>
                            <p className={"text-gray-400 text-sm"}>Calculated at checkout</p>
                        </div>
                        <div className={"h-[2px] w-full bg-base-300 my-2"}></div>

                        <div className={"flex justify-between"}>
                            <p className="text-gray-400 text-sm self-end">Total</p>
                            <p className={"font-bold"}><span className={"mr-1 text-success"}>$</span>{cart ? totalPrice : 0}</p>
                        </div>
                        <div className={"h-[2px] w-full bg-base-300 my-2"}></div>

                        <Link to={"/cart"} className="btn bg-gradient-to-t from-primary-focus to-primary btn-md text-white btn-block mt-6">
                            <HiShoppingCart className={"text-lg"} />
                            View cart
                        </Link>
                    </div>
                </>
                : <div className={"flex justify-center items-center h-full"}>
                    <div className={"flex flex-col items-center gap-3"}>
                        <HiShoppingCart className={"text-8xl"}/>
                        <p className={"text-3xl font-bold"}>Your cart is empty.</p>
                    </div>
                </div>
            }
        </Drawer>
    );
};

export default CartWidget;