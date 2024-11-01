import {Link} from "react-router-dom";

function CategoryCard({name, path}) {
    return (
        <Link to={path} className={"flex justify-center items-center w-5/12 max-sm:w-full rounded-xl bg-base-100 hover:bg-base-300 transition shadow-md"}>
            <p className="text-md max-sm:text-sm font-bold break-words p-6">{name}</p>
        </Link>
    )
}

export default CategoryCard;