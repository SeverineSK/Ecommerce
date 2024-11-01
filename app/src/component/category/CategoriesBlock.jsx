import CategoryCard from "../ui/misc/CategoryCard.jsx";
import {useEffect, useState} from 'react';
import useCategory from "../../services/hook/useCategory.jsx";
import {HiViewGrid} from "react-icons/hi";
import CategoryContainer from "../ui/misc/CategoryContainer.jsx";
import SkeletonCategoriesBlock from "../ui/skeleton/SkeletonCategoriesBlock.jsx";
import SkeletonCategoryCard from "../ui/skeleton/SkeletonCategoryCard.jsx";

function CategoriesBlock() {

    const {readAllCategoryAPIRequest, categories, loading } = useCategory();
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        readAllCategoryAPIRequest();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setFirstRender(false);
        }, 1000);
    }, []);



    return (
        <div>
            { firstRender
                ? <SkeletonCategoriesBlock />
                : <CategoryContainer title={"All Categories"} Icon={HiViewGrid}>
                    {loading
                        ? <>
                            {Array.from(Array(8).keys()).map((item, index) => (
                                <SkeletonCategoryCard key={index}/>
                            ))}
                        </>
                        : <>
                            {categories
                                ? categories.map((category) => (
                                    <CategoryCard
                                        key={category.id}
                                        path={`/categories/${category.slug}`}
                                        name={category.name}
                                    />
                                ))
                                : <div className="text-center">No Categories found ...</div>
                            }
                        </>
                        }
                </CategoryContainer>
            }
        </div>
    )
}

export default CategoriesBlock;