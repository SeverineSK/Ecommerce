import {HiCreditCard} from "react-icons/hi";
import {Link} from "react-router-dom";


const PaymentButton = ({path, buttonText= "", buttonClass = "btn-xs"}) => {
    return (
        <Link to={path} className={`btn btn-outline ${buttonClass}`}>
            <HiCreditCard className={"text-lg"}/>
            {buttonText}
        </Link>
    );
};

export default PaymentButton;