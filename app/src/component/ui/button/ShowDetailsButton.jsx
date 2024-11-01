import {HiInformationCircle} from "react-icons/hi";
import {Link} from "react-router-dom";

const ShowDetailsButton = ({path, buttonText = "", buttonClass = "btn-xs"}) => {

    return (
        <Link to={path} className={`btn btn-outline ${buttonClass}`}>
            <HiInformationCircle className={"text-xl"}/>
            {buttonText}
        </Link>
    );
};

export default ShowDetailsButton;