import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    user: null,
    logIn: (token, user) => {},
    logOut: () => {},
    isAdmin: () => {},
    cart: [],
    setCart: () => {},
    getCart: (token) => {},
    addToCart: (item) => {},
    removeFromCart: (item) => {},
});