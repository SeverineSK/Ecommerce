import useArticle from "../../../services/hook/useArticle.jsx";
import PictureNextToForm from "../../ui/form/PictureNextToForm.jsx";
import {
    HiAdjustments, HiCheckCircle, HiClock,
    HiCube, HiDocumentSearch,
    HiInformationCircle, HiMenuAlt2, HiPlus, HiSparkles, HiViewGrid, HiViewGridAdd, HiXCircle
} from "react-icons/hi";
import {useParams} from "react-router-dom";
import DeleteButtonAndConfirmBox from "../../ui/button/DeleteButtonAndConfirmBox.jsx";
import UpdateButton from "../../ui/button/UpdateButton.jsx";
import {useEffect} from "react";
import LoadingSpinner from "../../ui/skeleton/LoadingSpinner.jsx";
import moment from "moment/moment.js";
import {HiMiniClock} from "react-icons/hi2";
import Field from "../../ui/form/Field.jsx";
import {TbFileDescription} from "react-icons/tb";

const ArticleDetails = () => {

    const { articleById, deleteArticleAPIRequest, readOneArticleAPIRequest, apiErrors, apiSuccess, loading } = useArticle();
    const { id } = useParams();

    useEffect(() => {
        readOneArticleAPIRequest(id);
    }, []);

    const priceWithDiscount = () => {
        if (articleById) {
            return articleById.price - (articleById.price * articleById.discount / 100);
        }
    }

    return (
        <>
            {!loading
                ? <div>
                    {articleById &&
                        <PictureNextToForm pictureURL={articleById.picture}
                                           pictureName={articleById.name}
                        >
                            <div className={"flex flex-col gap-2"}>

                                {apiErrors &&
                                    <div className="alert alert-error flex mb-6">
                                        <HiXCircle className={"text-xl"} />
                                        <span className={"max-sm:text-sm"}>{apiErrors}</span>
                                    </div>
                                }

                                {apiSuccess &&
                                    <div className="alert alert-success flex mb-6">
                                        <HiCheckCircle className={"text-xl"} />
                                        <span className={"max-sm:text-sm"}>{apiSuccess}</span>
                                    </div>
                                }

                                {articleById.recommended === 1
                                    ? <div className={"rounded-lg p-2 mb-2 inline-flex items-center gap-1 bg-base-200 font-bold"}>
                                        <HiSparkles className={"text-lg text-secondary"}/>
                                        <p className={"text-sm"}>Powered By Us</p>
                                    </div>
                                    : null
                                }
                                <div className={"flex justify-between flex-wrap gap-2 pb-2"}>
                                    <div className={"badge bg-base-300 p-3 gap-1"}>
                                        <HiDocumentSearch className={"text-lg"}/>
                                        {articleById.id}
                                    </div>
                                    <div className={"flex gap-2 flex-wrap max-lg:w-full max-xl:flex-col"}>
                                        <div className={"badge bg-base-300 p-3 gap-1 max-lg:w-full"}>
                                            <HiMiniClock className={"text-lg"}/>
                                            Created At {moment(articleById.created_at).format('D/MM/YYYY, h:mm a')}
                                        </div>
                                        <div className={"badge bg-base-300 p-3 gap-1 max-lg:w-full"}>
                                            <HiClock className={"text-lg"}/>
                                            Updated At <div>{moment(articleById.updated_at).format('D/MM/YYYY, h:mm a')}</div>
                                        </div>
                                    </div>
                                </div>
                                <h1 className={"text-3xl font-bold break-all"}>{articleById.name}</h1>

                                <div>
                                    <div>
                                        <div className={"flex items-center gap-1"}>
                                            <HiViewGrid className={"text-xl"}/>
                                            {articleById.subcategory.category.name}
                                        </div>
                                    </div>
                                    <div className={"border-l-[2px] border-base-300 pl-4 my-2"}>
                                        <div className={"flex items-center gap-1"}>
                                            <HiViewGridAdd className={"text-xl"}/>
                                            {articleById.subcategory.name}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={"h-[2px] bg-base-300 my-6"}></div>

                            <div className={"w-full flex flex-wrap gap-6 justify-between"}>
                                <div className={"text-3xl flex flex-col gap-2"}>
                                    <div className={"flex gap-4"}>
                                        {articleById.discount > 0 &&
                                            <p className={"text-error font-semibold"}>-{articleById.discount} %</p>
                                        }
                                        <p className={"font-bold"}><span className={"text-success"}>$</span> {priceWithDiscount()}</p>
                                    </div>
                                    {articleById.discount > 0 &&
                                        <p className={"text-sm text-gray-400"}>Typical price: <span className={"line-through"}>${articleById.price}</span></p>
                                    }
                                </div>

                                <div className={"flex gap-2 ml-auto"}>
                                    {articleById.stock_state === "In Stock" &&
                                        <div className="badge badge-success badge-outline p-4 gap-2 font-bold">
                                            <HiCheckCircle className={"text-xl"}/>{articleById.stock_state}
                                        </div>
                                    }
                                    {articleById.stock_state === "Out of Stock" &&
                                        <div className="badge badge-error badge-outline p-4 gap-2 font-bold">
                                            <HiXCircle className={"text-lg"}/>{articleById.stock_state}
                                        </div>
                                    }
                                    {articleById.stock_state === "Pre-Order" &&
                                        <div className="badge badge-warning badge-outline p-4 gap-2 font-bold">
                                            <HiClock className={"text-lg"}/>{articleById.stock_state}
                                        </div>
                                    }

                                    {articleById.total_stock === 0 &&
                                        <div className={"badge badge-outline badge-error p-4 flex gap-2 font-bold"}>
                                            <HiCube className={"text-xl"}/>
                                            <p>{articleById.total_stock}</p>
                                        </div>
                                    }
                                    {articleById.total_stock > 0 && articleById.stock < 10 &&
                                        <div className={"badge badge-outline badge-warning p-4 flex gap-2 font-bold"}>
                                            <HiCube className={"text-xl"}/>
                                            <p>{articleById.total_stock}</p>
                                        </div>
                                    }
                                    {articleById.total_stock >= 10 &&
                                        <div className={"badge badge-outline badge-success p-4 flex gap-2 font-bold"}>
                                            <HiCube className={"text-xl"}/>
                                            <p>{articleById.total_stock}</p>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className={"flex flex-col mb-6 mt-12 gap-4"}>
                                <h2 className={"flex items-center bg-base-200 p-3 rounded-lg justify-start gap-2 normal-case text-sm font-bold"}>
                                    <HiAdjustments className={"text-xl"}/>
                                    Features
                                </h2>

                                {articleById.features.length > 0
                                    ? <div className={"flex flex-col w-full gap-6"}>
                                        {articleById.features.map((feature) => (
                                            <div className={""} key={feature.id}>
                                                <h1 className={"text-xs mb-2 font-bold"}>{feature.name}</h1>
                                                <div className={"flex flex-wrap gap-2"}>
                                                    {feature.variants.map((variant) => (
                                                        <div className={"rounded-md text-sm p-2 bg-base-300 flex w-full justify-between"} key={variant.id}>
                                                            <div>
                                                                {variant.name}
                                                            </div>
                                                            <div className={"flex items-center min-w-[4rem] justify-between"}>
                                                                <HiPlus className={"text-success mr-2"}/>
                                                                <div>
                                                                    <span className={"text-sm mr-1"}>$</span>
                                                                    <span>{variant.price}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    : <p className={"text-sm"}>No features registered for this article...</p>
                                }
                            </div>

                            <div className={"flex flex-col mb-4 gap-4"}>
                                <h2 className={"flex items-center bg-base-200 p-3 rounded-lg justify-start gap-2 normal-case text-sm font-bold"}>
                                    <HiMenuAlt2 className={"text-xl"}/>
                                    Description
                                </h2>
                                <p className={"text-sm leading-relaxed whitespace-pre-line border-white border-opacity-10"}>
                                    {articleById.description}
                                </p>
                            </div>

                            <div className={"flex flex-col gap-4"}>
                                <h2 className={"flex items-center bg-base-200 p-3 rounded-lg justify-start gap-2 normal-case text-sm font-bold"}>
                                    <HiInformationCircle className={"text-xl"}/>
                                    Product information
                                </h2>

                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className={"bg-base-200 border-t-[1px] border-base-300 text-gray-300"}>Item Weight</td>
                                                <td className={"border-t-[1px] border-base-300"}>{articleById.weight} pounds</td>
                                            </tr>
                                            <tr>
                                                <td className={"bg-base-200 border-t-[1px] border-b-[1px] border-base-300 text-gray-300"}>Item Dimensions LxWxH</td>
                                                <td className={"border-t-[1px] border-b-[1px] border-base-300"}>{articleById.length} x {articleById.width} x {articleById.height} inches</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className={"flex flex-col"}>
                                <div className={"h-[2px] bg-base-300 my-6"}></div>
                                <div className={"flex gap-2 flex-wrap"}>
                                    <UpdateButton path={`/admin/articles/${articleById.id}/update`}
                                                  buttonText={"Update this article"}
                                                  buttonClass={"btn-sm max-md:btn-block"}
                                    />

                                    <DeleteButtonAndConfirmBox item={articleById}
                                                               modalName={"Article"}
                                                               buttonText={"Delete this article"}
                                                               buttonClass={"btn-sm max-md:btn-block"}
                                                               deleteApiRequest={deleteArticleAPIRequest}
                                    />
                                </div>
                            </div>
                        </PictureNextToForm>
                    }
                </div>
                : <LoadingSpinner />
            }
        </>
    );
};

export default ArticleDetails;