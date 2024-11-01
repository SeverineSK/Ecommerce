import {FiSearch} from "react-icons/fi";

const SkeletonSearchBar = ({filter = false, numbersOfItems = false}) => {
    return (
        <div className="flex w-full gap-2 max-sm:flex-col animate-pulse">

            <div className={"relative w-full"}>
                <div className={`input input-sm bg-base-300 w-full`}>
                    <p className={"text-base-100"}>Search...</p>
                </div>

                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <div>
                        <FiSearch className="text-lg text-base-200"/>
                    </div>
                </span>
            </div>

            {filter &&
                <div className="select select-sm bg-base-300 min-w-[12rem] max-w-[12rem] max-sm:max-w-full text-base-100"></div>
            }

            {numbersOfItems &&
                <div className="select select-sm bg-base-300 w-20 max-sm:w-full text-base-100"></div>
            }
        </div>
    );
};

export default SkeletonSearchBar;