import {HiShoppingCart} from "react-icons/hi";
import {useContext, useState} from "react";
import {AuthContext} from "../../../services/context/AuthContext.jsx";

const AddToCartButton = ({articleId, buttonText = "", buttonClass = "btn-xs", onClick}) => {

    const { addToCart } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleAddToCart = (articleId) => {
        setLoading(true);
        setTimeout(() => {
            addToCart(articleId);
            setLoading(false);
        }, 1000);

        // todo for not logged in users
    }

    return (
        <button onClick={onClick} className={`btn ${loading && "btn-disabled"} btn-outline ${buttonClass}`}>
            {loading
                ? <span className="loading loading-spinner loading-sm"></span>
                : <>
                    <HiShoppingCart className={"text-2xl"}/>
                    {buttonText}
                </>

            }
        </button>
    );
};

export default AddToCartButton;