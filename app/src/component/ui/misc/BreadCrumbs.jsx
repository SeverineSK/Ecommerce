import {Outlet, useParams} from 'react-router-dom';
import BreadCrumbsBody from "./BreadCrumbsBody.jsx";
import BreadCrumbsLink from "./BreadCrumbsLink.jsx";

function BreadCrumbs({children}) {

    const {category, subcategory, article} = useParams();

    const slugToTitle = (slug) => {
        return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }

    return (
        <>
            <BreadCrumbsBody>
                <BreadCrumbsLink path={"/categories"} Title={"Categories"} />

                {category &&
                    <BreadCrumbsLink path={`/categories/${category}`} Title={slugToTitle(category)} />
                }
                {subcategory &&
                    <BreadCrumbsLink path={`/categories/${category}/${subcategory}`} Title={slugToTitle(subcategory)} />
                }
                {article &&
                    <BreadCrumbsLink path={`/categories/${category}/${subcategory}/${article}`} Title={slugToTitle(article)} />
                }
            </BreadCrumbsBody>

            {children ? children : <Outlet />}
        </>
    );
}

export default BreadCrumbs;
