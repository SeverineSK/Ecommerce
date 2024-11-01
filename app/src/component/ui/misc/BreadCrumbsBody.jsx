import {HiHome} from "react-icons/hi";
import {Link} from "react-router-dom";

const BreadCrumbsBody = ({children}) => {
    return (
        <div className="flex items-center text-md w-full px-6 pt-6 max-sm:px-4 overflow-hidden">
            <div className="flex items-center h-8 whitespace-nowrap overflow-x-auto">
                <Link to="/">
                    <HiHome className={"text-xl hover:text-primary transition"}/>
                </Link>
                {children}
            </div>
        </div>
    );
};

export default BreadCrumbsBody;