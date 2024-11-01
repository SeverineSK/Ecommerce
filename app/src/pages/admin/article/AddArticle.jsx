import AddArticleForm from "../../../component/admin/article/AddArticleForm.jsx";
import TitleWithBack from "../../../component/ui/item/TitleWithBack.jsx";

const AddArticle = () => {
    return (
        <>
            <TitleWithBack title={"Create Article"} pathBackButton={"../articles"} />
            <AddArticleForm/>
        </>
    );
};

export default AddArticle;