import useArticle from "../../../services/hook/useArticle.jsx";
import {
    HiCheckCircle, HiClock, HiCube,
    HiCurrencyDollar, HiCursorClick, HiDocumentSearch, HiEye,
    HiPhotograph,
    HiShoppingCart, HiThumbUp,
    HiTrendingUp,
    HiViewGrid, HiXCircle,
} from "react-icons/hi";
import moment from "moment";
import {HiMiniClock} from "react-icons/hi2";
import DeleteButtonAndConfirmBox from "../../ui/button/DeleteButtonAndConfirmBox.jsx";
import UpdateButton from "../../ui/button/UpdateButton.jsx";
import ShowButton from "../../ui/button/ShowButton.jsx";
import {useEffect, useState} from "react";
import LoadingSpinner from "../../ui/skeleton/LoadingSpinner.jsx";
import Searchbar from "../../ui/item/Searchbar.jsx";
import useCategory from "../../../services/hook/useCategory.jsx";
import AddButton from "../../ui/button/AddButton.jsx";
import Pagination from "../../ui/item/Pagination.jsx";
import NotFound from "../../ui/item/NotFound.jsx";
import {MdDiscount} from "react-icons/md";
import {TbDimensions, TbWeight} from "react-icons/tb";

const ArticlesTab = () => {

    const {
        readAllArticlesAPIRequest,
        updateArticleAPIRequest,
        deleteArticleAPIRequest,
        articles,
        currentPage,
        setCurrentPage,
        lastPage,
        apiSuccess,
        apiErrors,
        loading
    } = useArticle();

    const {categories, readAllCategoryAPIRequest} = useCategory();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [numbersOfItems, setNumbersOfItems] = useState(10);

    const handleRefresh = () => {
        readAllArticlesAPIRequest(search, category, "", numbersOfItems, currentPage);
    };

    const handleCheckboxChange = (e, article) => {
        const isChecked = e.target.checked;
        updateArticleAPIRequest({...article, picture: [], recommended: isChecked}, article.id);
    };

    useEffect(() => {
        handleRefresh();
    }, [search, category, numbersOfItems, currentPage]);

    const Columns = () => (
        <tr>
            <th><div className={"flex items-center gap-2"}><HiDocumentSearch className={"text-lg"}/>Id</div></th>
            <th><div className={"flex items-center gap-2"}><HiPhotograph className={"text-lg"}/>Picture</div></th>
            <th><div className={"flex items-center gap-2"}><HiShoppingCart className={"text-lg"}/>Name</div></th>
            <th><div className={"flex items-center gap-2"}><HiCurrencyDollar className={"text-lg"}/>Price</div></th>
            <th><div className={"flex items-center gap-2"}><TbDimensions className={"text-lg"}/>Width</div></th>
            <th><div className={"flex items-center gap-2"}><TbDimensions className={"text-lg"}/>Height</div></th>
            <th><div className={"flex items-center gap-2"}><TbDimensions className={"text-lg"}/>Length</div></th>
            <th><div className={"flex items-center gap-2"}><TbWeight className={"text-lg"}/>Weight</div></th>
            <th><div className={"flex items-center gap-2"}><HiCube className={"text-lg"}/>Stock</div></th>
            <th><div className={"flex items-center gap-2"}><MdDiscount className={"text-lg"}/>Discount</div></th>
            <th><div className={"flex items-center gap-2"}><HiTrendingUp className={"text-lg"}/>State</div></th>
            <th><div className={"flex items-center gap-2"}><HiEye className={"text-lg"}/>View</div></th>
            <th><div className={"flex items-center gap-2"}><HiViewGrid className={"text-lg"}/>Category</div></th>
            <th><div className={"flex items-center gap-2"}><HiMiniClock className={"text-lg"}/>Created At</div></th>
            <th><div className={"flex items-center gap-2"}><HiClock className={"text-lg"}/>Updated At</div></th>
            <th><div className={"flex items-center gap-2"}><HiThumbUp className={"text-lg"}/>Recommended</div></th>
            <th><div className={"flex items-center gap-2"}><HiCursorClick className={"text-lg"}/>Action</div></th>
        </tr>
    );

    return (
        <div className={"min-w-[200px]"}>

            <div className={"flex w-full max-sm:flex-col gap-2 mb-6"}>
                <AddButton path={"/admin/articles/add"}
                           buttonText={"Add Article"}
                           buttonClass={"btn-sm max-sm:w-full"}
                />

                <Searchbar search={search}
                           setSearch={setSearch}
                           setCurrentPage={setCurrentPage}
                           filter={category}
                           setFilter={setCategory}
                           filterElements={categories}
                           filterApiRequest={readAllCategoryAPIRequest}
                           numbersOfItems={numbersOfItems}
                           setNumbersOfItems={setNumbersOfItems}
                           numbersOfItemsName={"Select Number of Rows"}
                />
            </div>



            {apiErrors &&
                <div className="alert alert-error flex my-4">
                    <HiXCircle className={"text-xl"} />
                    <span className={"max-sm:text-sm"}>{apiErrors}</span>
                </div>
            }

            {apiSuccess &&
                <div className="alert alert-success flex my-4">
                    <HiCheckCircle className={"text-xl"} />
                    <span className={"max-sm:text-sm"}>{apiSuccess}</span>
                </div>
            }
            {loading
                ? <LoadingSpinner/>
                : articles && articles.data.length > 0
                    ? <div className="overflow-x-auto overflow-y-scroll h-[calc(100vh-25.5rem)] max-sm:h-[calc(100vh-33rem)]">
                        <table className="table table-zebra table-xs">
                            <thead>
                            <Columns/>
                            </thead>
                            <tbody>
                            {articles && articles.data.map(article => (
                                <tr key={article.id}>
                                    <td>
                                        <div>{article.id}</div>
                                    </td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={article.picture} alt={article.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>{article.name}</div>
                                    </td>
                                    <td>
                                        <div><span className={"text-success"}>$</span> {article.price}</div>
                                    </td>
                                    <td>
                                        <div>{article.width}</div>
                                    </td>
                                    <td>
                                        <div>{article.height}</div>
                                    </td>
                                    <td>
                                        <div>{article.length}</div>
                                    </td>
                                    <td>
                                        <div>{article.weight}</div>
                                    </td>
                                    <td>
                                        <div>{article.total_stock}</div>
                                    </td>
                                    <td>
                                        <div>{article.discount} %</div>
                                    </td>
                                    <td>
                                        {article.stock_state === "In Stock" &&
                                            <div className="flex items-center text-success gap-2 justify-start font-medium">
                                                <HiCheckCircle className={"text-lg"}/>{article.stock_state}
                                            </div>
                                        }
                                        {article.stock_state === "Out of Stock" &&
                                            <div className="flex items-center text-error gap-2 w-[8.3rem] justify-start font-medium">
                                                <HiXCircle className={"text-lg"}/>{article.stock_state}
                                            </div>
                                        }
                                        {article.stock_state === "Pre-Order" &&
                                            <div className="flex items-center text-warning gap-2 justify-start font-medium">
                                                <HiClock className={"text-lg"}/>{article.stock_state}
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        {article.counter_visits}
                                    </td>
                                    <td>
                                        <div className={"pt-2"}>
                                            <div>{article.subcategory.category.name}</div>
                                        </div>
                                        <div className={"border-l-[1px] border-base-300 pl-4 my-2"}>
                                            <div>{article.subcategory.name}</div>
                                        </div>
                                    </td>

                                    <td>
                                        <div>{moment(article.created_at).format('dddd Do MMMM YYYY, h:mm a')}</div>
                                    </td>

                                    <td>
                                        <div>{moment(article.updated_at).format('dddd Do MMMM YYYY, h:mm a')}</div>
                                    </td>

                                    <td>
                                        <div className={"flex justify-center"}>
                                            <input onChange={(e) => handleCheckboxChange(e, article)} type="checkbox" defaultChecked={article.recommended} className="toggle toggle-success" />
                                        </div>
                                    </td>

                                    <td>
                                        <div className={"flex gap-2"}>
                                            <ShowButton path={`/admin/articles/${article.id}`}/>

                                            <UpdateButton path={`/admin/articles/${article.id}/update`}/>

                                            <DeleteButtonAndConfirmBox item={article}
                                                                       modalName={"Article"}
                                                                       deleteApiRequest={deleteArticleAPIRequest}
                                                                       closeButton={true}
                                                                       modalClassName={""}
                                                                       onAfterDelete={handleRefresh}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                            <Columns/>
                            </tfoot>
                        </table>
                    </div>
                : <NotFound text={"No Articles found ..."} />
            }
            <div className={"pt-3"}>
                <Pagination currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={lastPage}
                            siblingCount={1}
                />
            </div>
        </div>
    );
};

export default ArticlesTab;