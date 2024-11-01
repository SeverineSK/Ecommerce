import {HiCreditCard, HiShoppingBag} from "react-icons/hi";
import {FaShippingFast} from "react-icons/fa";

const ProgressBar = ({step}) => {
    return (
        <div>
            <h2 className="sr-only">Steps</h2>

            <div>
                <div className="overflow-hidden rounded-full bg-gray-300">
                    <div className={`h-2 ${step === 2 ? "w-1/2" : step === 3 ? "w-2/2" : "w-0"} rounded-full bg-primary`}></div>
                </div>

                <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
                    <li className={`flex items-center justify-start text-primary sm:gap-1.5`}>
                        <span className="hidden sm:inline"> Order Summary </span>
                        <HiShoppingBag className="h-6 w-6 sm:h-5 sm:w-5" />
                    </li>

                    <li className={`flex items-center justify-center ${step === 2 || step === 3 ? "text-primary" : null} sm:gap-1.5`}>
                        <span className="hidden sm:inline"> Shipping Details </span>
                        <FaShippingFast className="h-6 w-6 sm:h-5 sm:w-5" />
                    </li>

                    <li className={`flex items-center justify-end ${step === 3 ? "text-primary" : null} sm:gap-1.5`}>
                        <span className="hidden sm:inline"> Payment </span>
                        <HiCreditCard className="h-6 w-6 sm:h-5 sm:w-5" />
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default ProgressBar;