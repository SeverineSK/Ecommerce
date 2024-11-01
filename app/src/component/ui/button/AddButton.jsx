import {HiPlusCircle} from "react-icons/hi";
import {Link} from "react-router-dom";

const AddButton = ({path, buttonText= "", buttonClass = "btn-xs"}) => {
    return (
        <Link to={path} className={`btn btn-success btn-outline ${buttonClass}`}>
            <HiPlusCircle className={"text-lg"}/>
            {buttonText}
        </Link>
    );
};

export default AddButton;