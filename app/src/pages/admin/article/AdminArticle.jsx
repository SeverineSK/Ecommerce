import TitleWithBack from "../../../component/ui/item/TitleWithBack.jsx";
import ArticleDetails from "../../../component/admin/article/ArticleDetails.jsx";

const AdminArticle = () => {
    return (
        <>
            <TitleWithBack title={"Show Article"} pathBackButton={"../articles"} />
            <ArticleDetails />
        </>
    );
};

export default AdminArticle;