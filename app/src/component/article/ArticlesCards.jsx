import {useEffect, useState} from "react";
import Pagination from "../ui/item/Pagination.jsx";
import useArticle from "../../services/hook/useArticle.jsx";
import useCategory from "../../services/hook/useCategory.jsx";
import Searchbar from "../ui/item/Searchbar.jsx";
import ArticleCard from "../ui/misc/ArticleCard.jsx";
import SkeletonSearchBar from "../ui/skeleton/SkeletonSearchBar.jsx";
import SkeletonArticleCard from "../ui/skeleton/SkeletonArticleCard.jsx";
import NotFound from "../ui/item/NotFound.jsx";

const ArticlesCards = () => {

    const {
        readAllArticlesAPIRequest,
        articles,
        currentPage,
        setCurrentPage,
        lastPage,
        loading
    } = useArticle();

    const {categories, readAllCategoryAPIRequest} = useCategory();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [firstRender, setFirstRender] = useState(true);
    const [numbersOfItems, setNumbersOfItems] = useState(10);

    useEffect(() => {
        readAllArticlesAPIRequest(search, category, "", numbersOfItems, currentPage);
    }, [search, category, numbersOfItems, currentPage]);

    useEffect(() => {
        setTimeout(() => {
            setFirstRender(false);
        }, 1000);
    }, []);

    return (
        <>
            {firstRender
                ? <>
                    <div className={"p-6 max-sm:px-4"}>
                        <SkeletonSearchBar filter={true} numbersOfItems={true} />
                    </div>
                    <div className="flex flex-wrap justify-center pt-5 gap-6 px-6 max-sm:px-4 overflow-scroll">
                    {Array.from(Array(10).keys()).map((item, index) => (
                        <SkeletonArticleCard key={index} />
                    ))}
                    </div>
                </>
                : <>
                    <div className={"p-6 max-sm:px-4"}>
                        <Searchbar search={search}
                                   setSearch={setSearch}
                                   setCurrentPage={setCurrentPage}
                                   filter={category}
                                   setFilter={setCategory}
                                   filterElements={categories}
                                   filterApiRequest={readAllCategoryAPIRequest}
                                   numbersOfItems={numbersOfItems}
                                   setNumbersOfItems={setNumbersOfItems}
                                   numbersOfItemsName={"Select Number of Articles"}
                                   dynamicSearchbar={true}
                        />
                    </div>

                    <div className="flex flex-wrap justify-center pt-5 gap-6 px-6 max-sm:px-4 h-[calc(100vh-11rem)] max-sm:h-[calc(100vh-16rem)] overflow-x-hidden">
                        {articles && articles.data.length > 0
                            ? <>
                                {loading
                                    ? <>
                                        {Array.from(Array(10).keys()).map((item, index) => (
                                            <SkeletonArticleCard key={index} />
                                        ))}
                                    </>
                                    : <>
                                        {articles.data.map(article => (
                                            <ArticleCard key={article.id}
                                                         articlePicture={article.picture}
                                                         articleName={article.name}
                                                         articlePrice={article.price}
                                                         articleStockState={article.stock_state}
                                                         articleRecommended={article.recommended}
                                                         path={`/categories/${article.subcategory.category.slug}/${article.subcategory.slug}/${article.slug}`}
                                            />
                                        ))}
                                        <Pagination currentPage={currentPage}
                                                    setCurrentPage={setCurrentPage}
                                                    totalPages={lastPage}
                                                    siblingCount={2}
                                        />
                                    </>
                                }
                            </>
                            : <NotFound />
                        }
                    </div>
                </>
            }
        </>
    );
};

export default ArticlesCards;
