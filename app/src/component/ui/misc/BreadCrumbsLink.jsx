import {HiChevronRight} from "react-icons/hi";
import {Link} from "react-router-dom";

const BreadCrumbsLink = ({path, Title}) => {
    return (
        <div className={"flex items-center"}>
            <HiChevronRight className={"opacity-40 text-xl mx-2"}/>
            <Link className={"hover:text-primary transition"} to={path}>
                {Title}
            </Link>
        </div>
    );
};

export default BreadCrumbsLink;