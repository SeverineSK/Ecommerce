import React, { useEffect, useState } from 'react';
import useArticle from "../../services/hook/useArticle.jsx";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import PictureNextToForm from "../ui/form/PictureNextToForm.jsx";
import { HiShoppingCart } from "react-icons/hi";
import {
    HiAdjustments,
    HiCheckCircle,
    HiClock,
    HiInformationCircle, HiMenuAlt2, HiPlus, HiSparkles,
    HiXCircle
} from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../services/context/AuthContext.jsx";
import AddToCartButton from "../ui/button/AddToCartButton.jsx";
import SkeletonArticleDetails from "../ui/skeleton/SkeletonArticleDetails.jsx";
import ArticleComments from "./ArticleComments.jsx";
import moment from "moment/moment.js";

const ArticleDetails = () => {
    const { articleById, readOneArticleAPIRequest } = useArticle();
    const { article } = useParams();
    const [priceWithDiscount, setPriceWithDiscount] = useState(0);
    const [selectedVariants, setSelectedVariants] = useState({});

    const { addToCart, token, isLoggedIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        setLoading(true);


        const features = {
            features: articleById.features.map((feature) => ({
                name: feature.name,
                id: feature.id,
                variantId: parseInt(data[feature.id]),
                variantName: feature.variants.find((variant) => variant.id == data[feature.id]).name,
                variantPrice: feature.variants.find((variant) => variant.id == data[feature.id]).price,
            })),
        };

        const selectedArticle = {
            item: {
                article: articleById,
                features: features.features,
                price: articleById.price,
            },
        }

        setTimeout(() => {
            addToCart(selectedArticle.item, token);
            setLoading(false);
        }, 1000);

        console.log(selectedArticle);
    }

    const handleRadioChange = (featureId, variantPrice) => {
        const updatedSelectedVariants = {
            ...selectedVariants,
            [featureId]: variantPrice,
        };

        console.log(updatedSelectedVariants);
        setSelectedVariants(updatedSelectedVariants);

        let totalPrice = 0;

        Object.values(updatedSelectedVariants).forEach((variantPrice) => {
            totalPrice += variantPrice;
        });


        totalPrice += articleById.price;

        setPriceWithDiscount((totalPrice - (totalPrice * articleById.discount / 100)).toFixed(2));
    }

    useEffect(() => {
        readOneArticleAPIRequest(null, article);
    }, []);

    useEffect(() => {
        if (articleById) {
            setPriceWithDiscount(articleById.price - (articleById.price * articleById.discount / 100));
        }
    }, [articleById]);

    useEffect(() => {
        setTimeout(() => {
            setFirstLoad(false);
        }, 1000);
    }, []);

    return (
        <>
            {firstLoad ? (
                <SkeletonArticleDetails />)
                :
                <div className={"py-6 px-6 max-sm:px-4"}>
                    {articleById && (
                        <PictureNextToForm
                            pictureURL={articleById.picture}
                            pictureName={articleById.name}
                        >
                            <div className={"flex flex-col gap-4"}>
                                {articleById.recommended === 1 && (
                                    <div className={"rounded-lg p-2 inline-flex items-center gap-1 bg-base-200 font-bold"}>
                                        <HiSparkles className={"text-lg text-secondary"} />
                                        <p className={"text-sm"}>Powered By Us</p>
                                    </div>
                                )}
                                <h1 className={"text-3xl max-sm:text-2xl font-bold break-all"}>{articleById.name}</h1>
                            </div>

                            <div className={"h-[2px] bg-base-300 my-4"}></div>

                            <div className={"w-full flex flex-wrap gap-6 justify-between"}>
                                <div className={"text-3xl flex flex-col gap-2"}>
                                    <div className={"flex gap-4"}>
                                        {articleById.discount > 0 && (
                                            <p className={"text-error font-semibold"}>-{articleById.discount} %</p>
                                        )}
                                        <p className={"font-bold"}><span className={"text-success"}>$</span> {priceWithDiscount}</p>
                                    </div>
                                    {articleById.discount > 0 && (
                                        <p className={"text-sm text-gray-400"}>Typical price: <span className={"line-through"}>${articleById.price}</span></p>
                                    )}
                                </div>

                                <div className={"flex gap-2 ml-auto"}>
                                    {articleById.stock_state === "In Stock" && (
                                        <div className="badge badge-success badge-outline p-4 gap-2 font-bold">
                                            <HiCheckCircle className={"text-xl"} />{articleById.stock_state}
                                        </div>
                                    )}
                                    {articleById.stock_state === "Out of Stock" && (
                                        <div className="badge badge-error badge-outline p-4 gap-2 font-bold">
                                            <HiXCircle className={"text-lg"} />{articleById.stock_state}
                                        </div>
                                    )}
                                    {articleById.stock_state === "Pre-Order" && (
                                        <div className="badge badge-warning badge-outline p-4 gap-2 font-bold">
                                            <HiClock className={"text-lg"} />{articleById.stock_state}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={"flex flex-col mb-6 mt-12 gap-4"}>
                                <h2 className={"flex items-center bg-base-200 p-3 rounded-lg justify-start gap-2 normal-case text-sm font-bold"}>
                                    <HiAdjustments className={"text-xl"} />
                                    Features
                                </h2>

                                {articleById.features.length > 0 ? (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className={"flex flex-col w-full gap-6"}>
                                            {articleById.features.map((feature) => (
                                                <div className={""} key={feature.id}>
                                                    <h1 className={"text-xs mb-2 font-bold"}>{feature.name}</h1>
                                                    <div className={"flex flex-wrap gap-2"}>
                                                        {feature.variants.map((variant) => (
                                                            <div className={"rounded-md text-sm p-2 bg-base-300 flex w-full justify-between"} key={variant.id}>
                                                                {/* INPUT*/}
                                                                <input
                                                                    type="radio"
                                                                    className={"form-radio"}
                                                                    value={variant.id}
                                                                    name={String(feature.id)}
                                                                    onClick={() => {
                                                                        handleRadioChange(feature.id, variant.price);
                                                                    }}
                                                                    checked={selectedVariants[`${feature.id}`] === variant.price}
                                                                    {...register(`${feature.id}`, {
                                                                        required: {
                                                                            value: true,
                                                                        }
                                                                    })}
                                                                />
                                                                <div>
                                                                    {variant.name}
                                                                </div>
                                                                <div className={"flex items-center min-w-[4rem] justify-between"}>
                                                                    <HiPlus className={"text-success mr-2"} />
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
                                    </form>
                                ) : (
                                    <p className={"text-sm"}>No features registered for this article...</p>
                                )}
                            </div>

                            <div className={"flex flex-col mb-4 gap-4"}>
                                <h2 className={"flex items-center bg-base-200 p-3 rounded-lg justify-start gap-2 normal-case text-sm font-bold"}>
                                    <HiMenuAlt2 className={"text-xl"} />
                                    Description
                                </h2>
                                <p className={"text-sm leading-relaxed whitespace-pre-line border-white border-opacity-10"}>
                                    {articleById.description}
                                </p>
                            </div>

                            <div className={"flex flex-col gap-4"}>
                                <h2 className={"flex items-center bg-base-200 p-3 rounded-lg justify-start gap-2 normal-case text-sm font-bold"}>
                                    <HiInformationCircle className={"text-xl"} />
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
                                <div className={"h-[2px] bg-base-300 my-4"}></div>
                                <div className={"flex gap-2 flex-wrap"}>
                                    <button onClick={handleSubmit(onSubmit)} className={`btn ${loading && "btn-disabled"} btn-block btn-success btn-outline btn-xl`}>
                                        {loading ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : (
                                            <>
                                                <HiShoppingCart className={"text-2xl"} />
                                                {"Add to cart"}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </PictureNextToForm>
                    )}

                

                    {articleById &&
                        <>
                            <ArticleComments
                                articleId={articleById.id}
                                refreshArticle={() => readOneArticleAPIRequest(null, article)}
                            />

                            <div className={"flex flex-col gap-4 mt-6"}>
                                {articleById.comments.map((comment) => (
                                    <div className={"flex flex-col gap-4 border-2 border-base-300 p-4 rounded-xl"} key={comment.id}>
                                        <div className={"flex gap-4 w-full"}>
                                            <div className={"flex flex-col gap-2 w-full"}>
                                                <div className={"flex items-center gap-2 justify-between w-full"}>
                                                    <p className={"font-bold"}>{comment.user.name}</p>
                                                    <p className={"text-xs text-gray-400"}>{moment(comment.created_at).format('D/MM/YYYY, h:mm a')}</p>
                                                </div>
                                                <p className={"text-sm"}>{comment.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                </div>
            }
        </>
    );
};



            export default ArticleDetails;
