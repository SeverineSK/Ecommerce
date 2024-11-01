import {HiX} from "react-icons/hi";
import {useContext, useState} from "react";
import {AuthContext} from "../../services/context/AuthContext.jsx";

const CartCard = ({
    itemName,
    itemQuantity,
    index,
    itemPicture,
    item,
}) => {
    const calculateItemPriceWithFeatures = (item) => {
        let itemPrice = item.price;

        if (item.features && item.features.length > 0) {
            item.features.forEach(feature => {
                itemPrice += feature.variantPrice;
            });
        }
        return itemPrice.toFixed(2);
    };

    const { removeFromCart } = useContext(AuthContext);
    const [loading, setLoading] = useState({});
    const handleDeleteItemFromCart = (item, index) => {
        setLoading({...loading, [index]: true});
        console.log(loading)
        setTimeout(() => {
            removeFromCart(item);
            setLoading({...loading, [index]: false});
        }, 1000);
    };

    return (
        <div className="flex justify-between py-2 rounded-md">
            <div className={"flex gap-2"}>
                <img className={"object-cover h-16 w-16 rounded-md"} src={itemPicture} alt="pic"/>
                <div className="relative z-40 -mt-2 -ml-6">
                    <button onClick={() => handleDeleteItemFromCart(item, index)} className={`${loading[index] && "btn-disabled"} flex items-center justify-center rounded-full w-6 h-6 bg-gray-100 p-1 cursor-pointer hover:bg-gray-300 transition drop-shadow-md`}>
                        {loading[index]
                            ? <span className="loading loading-dots loading-xs text-base-100"></span>
                            : <HiX className={"text-sm text-base-100"} />}
                    </button>
                </div>

                <div className={"flex flex-col gap-1 pr-4"}>
                    <div className="text-sm break-all line-clamp-1">{itemName}</div>
                    <div className="text-sm">x {itemQuantity}</div>
                    {item.features.map((feature, index) => (
                        <div key={index} className="text-sm">{feature.name}:{feature.variantName} (+{feature.variantPrice})</div>
                    ))}
                </div>
            </div>
            <div className={"font-bold text-sm"}><span className={"text-success mr-1"}>$</span>{(calculateItemPriceWithFeatures(item) * item.quantity).toFixed(2)}</div>
        </div>
    );
};

export default CartCard;
