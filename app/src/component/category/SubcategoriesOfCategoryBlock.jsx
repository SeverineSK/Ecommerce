import {useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import CategoryCard from "../ui/misc/CategoryCard.jsx";
import useCategory from "../../services/hook/useCategory.jsx";
import {HiViewGridAdd} from "react-icons/hi";
import CategoryContainer from "../ui/misc/CategoryContainer.jsx";
import SkeletonCategoriesBlock from "../ui/skeleton/SkeletonCategoriesBlock.jsx";
import SkeletonCategoryCard from "../ui/skeleton/SkeletonCategoryCard.jsx";
import SkeletonArticleCard from "../ui/skeleton/SkeletonArticleCard.jsx";

function SubcategoriesOfCategoryBlock() {

    const {readOneCategoryAPIRequest, categoryById, loading } = useCategory();
    const [firstRender, setFirstRender] = useState(true);

    const { category } = useParams();

    useEffect(() => {
        readOneCategoryAPIRequest(null, category);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setFirstRender(false);
        }, 1000);
    }, []);

    return (
        <div>
            {firstRender
                ? <SkeletonCategoriesBlock />
                : <CategoryContainer title={"All Subcategories"} Icon={HiViewGridAdd}>
                    {loading
                        ? <>
                            {Array.from(Array(8).keys()).map((item, index) => (
                                <SkeletonCategoryCard key={index}/>
                            ))}
                        </>
                        : <>
                            {categoryById
                                ? categoryById.subcategories.map((subcategory) => (
                                    <CategoryCard
                                        key={subcategory.id}
                                        path={`/categories/${categoryById.slug}/${subcategory.slug}`}
                                        name={subcategory.name}
                                    />
                                ))
                                : <div className="text-center">No Subcategories found ...</div>
                            }
                        </>
                    }
                </CategoryContainer>
            }
        </div>
    )
}

export default SubcategoriesOfCategoryBlock;