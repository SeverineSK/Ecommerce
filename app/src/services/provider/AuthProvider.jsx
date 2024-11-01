import { AuthContext } from "../context/AuthContext.jsx";
import { useState } from 'react';
import axios from "axios";

function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));

    const logIn = (token, user) => {
        setIsLoggedIn(true);
        setToken(token);
        setUser(user);


        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        //wait for api to respond
        getCartFromServer(token);
        // wait for cart to be set
        setTimeout(() => {
            addToCartFromServer(cart, token);
        }, 2000);


    };

    const logOut = () => {
        setIsLoggedIn(false);
        setToken(null);
        setUser(null);

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const isAdmin = () => {
        return user?.roles === "admin";
    }

    //expected JSON format for cart:
    //{
    //    "cart": [
    //     array of items
    //        {
    //            "article" :  object,
    //            "quantity" : number
    //           "price" : number,
    //            "features" : array,
    //        }
    //
    //            }
    //        }
    //    ]
    //}


    const getCartFromLocalStorage = () => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            setCart(JSON.parse(cart));
        }
    };


    const addTocartFromLocalStorage = (item, init = false) => {
        const cart = localStorage.getItem('cart');
        console.log("test")
        console.log(item)
        if (cart) {
            const cartParsed = JSON.parse(cart);
            const cartRecordIndex = cartParsed.findIndex(
                (cartRecord) => cartRecord.article.id === item.article.id &&
                    cartRecord.features.length === item.features.length &&
                    cartRecord.features.every((feature, index) =>
                        feature.variantId === item.features[index].variantId
                    )
            );

            if (cartRecordIndex !== -1) {
                // If the same item with the same features exists, increment quantity
                if (!init) {
                    cartParsed[cartRecordIndex].quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cartParsed));
                    setCart(cartParsed);
                } else {
                    localStorage.setItem('cart', JSON.stringify(cartParsed));
                    setCart(cartParsed);
                }

            } else {
                // Create a new cart record if it doesn't exist
                if (!init) {
                    item.quantity = 1;
                    cartParsed.push(item);
                    localStorage.setItem('cart', JSON.stringify(cartParsed));
                    setCart(cartParsed);}
                else {
                    cartParsed.push(item);
                    localStorage.setItem('cart', JSON.stringify(cartParsed));
                    setCart(cartParsed);

                }


            }
        } else {
            // Create a new cart with quantity if the cart is empty
            if (!init) {
                item.quantity ? (item.quantity += 1) : (item.quantity = 1);
                localStorage.setItem('cart', JSON.stringify([item]));
                setCart([item]);
            } else {

                localStorage.setItem('cart', JSON.stringify([item]));
                setCart([item]);
            }
        }

        // console.log(cart);
        if (!init) {
            addToCartFromServer(cart, token);
        }
    };






    const removeFromCartFromLocalStorage = (item) => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            const cartParsed = JSON.parse(cart);
            const cartRecordIndex = cartParsed.findIndex(
                (cartRecord) => cartRecord.article.id === item.article.id &&
                    cartRecord.features.length === item.features.length &&
                    cartRecord.features.every((feature, index) =>
                        feature.variantId === item.features[index].variantId
                    )
            );

            if (cartRecordIndex !== -1) {
                // If the same item with the same features exists, decrement the quantity
                cartParsed[cartRecordIndex].quantity -= 1;

                // Remove the feature if the quantity reaches 0
                if (cartParsed[cartRecordIndex].quantity === 0) {
                    cartParsed.splice(cartRecordIndex, 1);
                }



                localStorage.setItem('cart', JSON.stringify(cartParsed));
                setCart(cartParsed);
            }
        }
        // console.log(cart);

    };




    const getCartFromServer = (token) => {
        axios.get("http://localhost:8000/api/cart", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                response.data.cart.forEach(item => {
                    addTocartFromLocalStorage(item, true);
                });
                // localStorage.setItem('cart', JSON.stringify(response.data.cart));
            })
            .catch(error => {
                console.log(error);
            })
    }

    const addToCartFromServer = (cart, token) => {
        if (cart === null || !cart) {
            getCartFromServer(token);
            return;
        }
        console.log(cart);
        //check if cart is not json.stringified
        if (typeof cart === "string") {
            cart = JSON.parse(cart);
        }

        axios.post("http://localhost:8000/api/cart", {
            cart: cart
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                console.log("added to cart");
                getCartFromServer(token);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const removeFromCartFromServer = (cartRecordId) => {
        axios.delete(`http://localhost:8000/api/cart/${cartRecordId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                getCartFromServer(token)
            })
            .catch(error => {
                console.log(error);
            })
    }



    const getCart = (token) => {
        isLoggedIn ? getCartFromServer(token) : getCartFromLocalStorage();
    }

    const addToCart = (cart) => {
        addTocartFromLocalStorage(cart);
    }

    const removeFromCart = (id) => {
        removeFromCartFromLocalStorage(id);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, token, user, logIn, logOut, addToCart, removeFromCart, cart, setCart }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;
