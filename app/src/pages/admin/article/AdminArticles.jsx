import ArticlesTab from "../../../component/admin/article/ArticlesTab.jsx";
import {HiShoppingCart} from "react-icons/hi";
import TitleWithIcon from "../../../component/ui/item/TitleWithIcon.jsx";

const AdminArticles = () => {

    return (
        <>
            <TitleWithIcon title={"All Articles"} Icons={HiShoppingCart}/>
            <ArticlesTab />
        </>
    );
};

export default AdminArticles;