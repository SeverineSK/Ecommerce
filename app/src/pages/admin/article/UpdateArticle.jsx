import UpdateArticleForm from "../../../component/admin/article/UpdateArticleForm.jsx";
import TitleWithBack from "../../../component/ui/item/TitleWithBack.jsx";

const UpdateArticle = () => {
    return (
        <>
            <TitleWithBack title={"Update Article"} pathBackButton={"../articles"} />
            <UpdateArticleForm />
        </>
    );
};

export default UpdateArticle;