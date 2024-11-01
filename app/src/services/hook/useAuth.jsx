import axios from "axios";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const useAuth = () => {

    //TODO: add the cart to the user
    const { logIn, logOut, token, addToCart } = useContext(AuthContext);
    const [ apiErrors, setApiErrors ] = useState(null);
    const [ apiSuccess, setApiSuccess ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const loginRequest = "http://localhost:8000/api/login"
    const registerRequest = "http://localhost:8000/api/register"
    const logoutRequest = "http://localhost:8000/api/logout"

    const loginAPIRequest = (data) => {
        setLoading(true);

        axios.post(loginRequest, {
            email: data.email,
            password: data.password
        })
        .then(response => {
            logIn(response.data.access_token, response.data.user);
            if (response.data.user.cart) {
               addToCart(response.data.user.cart);
            }
            setApiErrors(null);
            setApiSuccess(response.data.message);
            setLoading(false);

            setTimeout(() => {
                setApiSuccess(null);
                // navigate("/")
            }, 2000);

        }).catch(handleError);
    }

    const registerAPIRequest = (data) => {
        setLoading(true);

        axios.post(registerRequest, {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation
        })
        .then(response => {
            logIn(response.data.access_token, response.data.user);
            setApiErrors(null);
            setApiSuccess(response.data.message);
            setLoading(false);

            setTimeout(() => {
                setApiSuccess(null);
                navigate("/")
            }, 2000);

        }).catch(handleError);
    }

    const logoutAPIRequest = () => {
        axios.post(logoutRequest, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            logOut();
        }).catch(error => {
            console.log(error.response);
            console.log("Token expired");
            logOut();
        })
    }

    const handleError = (error) => {
        if (error.response.status === 422) {
            setApiErrors(error.response.data.errors.email || error.response.data.errors.password_confirmation);
        } else if (error.response.status === 401) {
            setApiErrors(error.response.data.message);
        } else {
            setApiErrors("Something went wrong. Please try again later.");
        }
        setLoading(false);
    }

    return { loginAPIRequest, registerAPIRequest, logoutAPIRequest, apiErrors, apiSuccess, loading };
};

export default useAuth;
