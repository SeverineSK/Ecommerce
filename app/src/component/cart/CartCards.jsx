import CartCard from "./CartCard.jsx";
import {useContext} from "react";
import {AuthContext} from "../../services/context/AuthContext.jsx";

const CartCards = () => {

    const { cart } = useContext(AuthContext);

    return (
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
    );
};

export default CartCards;
