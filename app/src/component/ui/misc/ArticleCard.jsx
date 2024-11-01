import ShowDetailsButton from "../button/ShowDetailsButton.jsx";
import {HiCheckCircle, HiClock, HiSparkles, HiStar, HiThumbUp, HiXCircle} from "react-icons/hi";

const ArticleCard = ({
    articleName,
    articlePicture,
    articlePrice,
    articleStockState,
    articleRecommended,
    path,
}) => {
    return (
        <div className={"group flex flex-col justify-between w-80 max-h-[546.5px] border border-1 border-base-300 rounded-xl p-4 gap-6 shadow-md"}>
            <div className={"flex flex-col gap-3 pb-6"}>
                <div className={"relative overflow-hidden rounded-lg border-2 border-base-200"}>
                    {articleRecommended === 1
                        ? <div className={" absolute rounded-br-lg inline-flex items-center gap-1 z-[20] bg-base-200 pl-2 pr-4 font-bold shadow-lg border-2 border-base-200"}>
                            <HiSparkles className={"text-sm text-secondary"}/>
                            <p className={"text-xs"}>Powered By Us</p>
                        </div>
                        : null
                    }
                    <img
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-72"
                        src={articlePicture}
                        alt={articleName || "Image of article"} // Using the article's name as a fallback for the alt text
                    />
                </div>

                <div className={"w-full font-bold text-lg line-clamp-2"}>{articleName}</div>
            </div>

            <div>
                <div className={"flex justify-between"}>
                    <div className={"uppercase font-bold text-lg text-right"}><span className={"text-success"}>$</span> {articlePrice}</div>
                    <div className={"flex gap-2 items-center max-xs:flex-col max-xs:items-end"}>
                        {articleStockState === "In Stock" &&
                            <div className="badge badge-success badge-outline p-3 gap-2 font-bold">
                                <HiCheckCircle className={"text-lg"}/>{articleStockState}
                            </div>
                        }
                        {articleStockState === "Out of Stock" &&
                            <div className="badge badge-error badge-outline p-3 gap-2 font-bold">
                                <HiXCircle className={"text-lg"}/>{articleStockState}
                            </div>
                        }
                        {articleStockState === "Pre-Order" &&
                            <div className="badge badge-warning badge-outline p-3 gap-2 font-bold">
                                <HiClock className={"text-lg"}/>{articleStockState}
                            </div>
                        }
                    </div>
                </div>
                <div className={"h-[1px] w-full bg-base-300 my-4"}></div>
                <ShowDetailsButton path={path}
                                   buttonText={"Show Details"}
                                   buttonClass={"btn-sm btn-block"}
                />
            </div>
        </div>
    );
};
export default ArticleCard;
