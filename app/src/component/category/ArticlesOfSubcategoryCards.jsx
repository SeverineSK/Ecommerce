import {useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import ArticleCard from "../ui/misc/ArticleCard.jsx";
import Searchbar from "../ui/item/Searchbar.jsx";
import SkeletonArticleCard from "../ui/skeleton/SkeletonArticleCard.jsx";
import SkeletonSearchBar from "../ui/skeleton/SkeletonSearchBar.jsx";
import NotFound from "../ui/item/NotFound.jsx";
import useArticle from "../../services/hook/useArticle.jsx";
import Pagination from "../ui/item/Pagination.jsx";

function ArticlesOfSubcategoryCards() {

    const {
        readAllArticlesAPIRequest,
        articles,
        currentPage,
        setCurrentPage,
        lastPage,
        loading
    } = useArticle();

    const [search, setSearch] = useState('');
    const { category } = useParams();
    const { subcategory } = useParams();
    const [firstRender, setFirstRender] = useState(true);
    const [numbersOfItems, setNumbersOfItems] = useState(10);

    useEffect(() => {
        readAllArticlesAPIRequest(search, category, subcategory, numbersOfItems, currentPage);
    }, [search, category, subcategory, numbersOfItems, currentPage]);

    useEffect(() => {
        setTimeout(() => {
            setFirstRender(false);
        }, 1000);
    }, []);

    if(articles && articles.length > 0) {
        console.log(articles)
    }


    return (
        <>
            {firstRender
                ? <>
                    <div className={"p-6 max-sm:px-4"}>
                        <SkeletonSearchBar numbersOfItems={true} />
                    </div>
                    <div className="flex flex-wrap pt-5 justify-center gap-6 px-6 max-sm:px-4 overflow-scroll">
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
                                   numbersOfItems={numbersOfItems}
                                   setNumbersOfItems={setNumbersOfItems}
                                   numbersOfItemsName={"Select Number of Articles"}
                            />
                    </div>

                    <div className="flex flex-wrap justify-center pt-5 gap-6 px-6 max-sm:px-4 h-[calc(100vh-14.5rem)] max-sm:h-[calc(100vh-18rem)] overflow-x-hidden">
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
                                                         path={`/categories/${category}/${subcategory}/${article.slug}`}
                                                         articleRecommended={article.recommended}
                                            />
                                        ))}
                                    </>
                                }
                                <Pagination currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalPages={lastPage}
                                            siblingCount={2}
                                />
                            </>
                            : <NotFound />
                        }
                    </div>
                </>
            }
        </>
    );
}
export default ArticlesOfSubcategoryCards;