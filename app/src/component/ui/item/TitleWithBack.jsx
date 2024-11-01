import {Link} from "react-router-dom";
import {HiArrowCircleLeft} from "react-icons/hi";

const TitleWithBack = ({title, pathBackButton}) => {
    return (
        <div className={"flex items-center w-full bg-gradient-to-r from-base-300 to-base-200 p-4 mb-6 rounded-xl gap-4"}>
            <Link to={`${pathBackButton}`}><HiArrowCircleLeft className={"text-3xl"}/> </Link>
            <h1 className={"flex gap-2 font-bold uppercase"}>
                {title}
            </h1>
        </div>
    );
};

export default TitleWithBack;