import {HiEye} from "react-icons/hi";
import {Link} from "react-router-dom";

const ShowButton = ({path, buttonText= "", buttonClass = "btn-xs"}) => {
    return (
        <Link to={path} className={`btn btn-outline ${buttonClass}`}>
            <HiEye className={"text-lg"}/>
            {buttonText}
        </Link>
    );
};

export default ShowButton;