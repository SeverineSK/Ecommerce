import {HiPencilAlt} from "react-icons/hi";
import {Link} from "react-router-dom";

const UpdateButton = ({path, buttonText = "", buttonClass = "btn-xs"}) => {
    return (
        <Link to={path} className={`btn btn-outline btn-info ${buttonClass}`}>
            <HiPencilAlt className={"text-lg"}/>
            {buttonText}
        </Link>
    );
};

export default UpdateButton;