import {useEffect, useState} from "react";
import useCategory from "../../../services/hook/useCategory.jsx";
import useSubCategory from "../../../services/hook/useSubCategory.jsx";

function AdminCategoriesCards() {

    const { categories, readAllCategoryAPIRequest, addCategory, modifyCategory } = useCategory();
    const { addSubCategory, modifySubCategory } = useSubCategory();
    const [categoryList, setCategoryList] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [newSubCategories, setNewSubCategories] = useState([]);


    useEffect(() => {
        readAllCategoryAPIRequest();
    }, []);

    useEffect(() => {
        setCategoryList(categories);
    }, [categories]);


    function handleCategoryNameChange(e, index) {
        const newCategories = [...categoryList];
        if (index === "add" && newCategories["add"] === undefined) {
            // Add a new category
            setNewCategory(e);
            
        } else {
            // Modify an existing category
            newCategories[index].name = e;
        }
        setCategoryList(newCategories);
    }

    function handleSubCategoryNameChange(e, index, subIndex) {
        const newCategories = [...categoryList];
        if (subIndex === "add") {
            // Add a new category
            newSubCategories[index] = e;
            setNewSubCategories(newSubCategories);
            console.log(newSubCategories);
            

        } else {
            // Modify an existing category
            newCategories[index][subIndex].name = e;
        }
        setCategoryList(newCategories);
    }

    async function handleAddCategory() {
        console.log(categoryList);
        
        try {
            const response = await addCategory(newCategory);
            console.log(response);
            if (response.status === 201) {
                let data = await response.json();
                setCategoryList([data.category, ...categoryList]);
                setNewCategory("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleAddSubCategory(index) {
        console.log(categoryList[index].id);
        console.log(newSubCategories[index]);
        try {
            const response = await addSubCategory(categoryList[index].id, newSubCategories[index]);
            if (response.status === 201) {
                let data = await response.json();
                
                const updatedSubcategories = [
                    ...categoryList[index].subcategories,
                    data.subcategory
                ];
    
                const updatedCategoryList = [
                    ...categoryList.slice(0, index),
                    { ...categoryList[index], subcategories: updatedSubcategories },
                    ...categoryList.slice(index + 1)
                ];
    
                setCategoryList(updatedCategoryList);
    
                const updatedNewSubCategories = [...newSubCategories];
                updatedNewSubCategories[index] = "";
                setNewSubCategories(updatedNewSubCategories);
    
                console.log(categoryList);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteCategory(index) {
        const categoryId = categoryList[index].id;
        try {
            const response = await deleteCategory(categoryId);
            if (response.status === 200) {
                const newCategories = [...categoryList];
                newCategories.splice(index, 1);
                setCategoryList(newCategories);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteSubCategory(index, subIndex) {
        const categoryId = categoryList[index].id;
        const subcategoryId = categoryList[index].subcategories[subIndex].id;
        try {
            const response = await deleteSubCategory(categoryId, subcategoryId);
            if (response.status === 200) {
                const newCategories = [...categoryList];
                newCategories[index].subcategories.splice(subIndex, 1);
                setCategoryList(newCategories);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleModifyCategory(index) {
        const categoryId = categoryList[index].id;
        const newName = categoryList[index].name;
        try {
            const response = await modifyCategory(categoryId, newName);
            if (response.status === 200) {
                console.log("Category modified successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleModifySubCategory(index, subIndex) {
        const categoryId = categoryList[index].id;
        const subcategoryId = categoryList[index].subcategories[subIndex].id;
        const newName = categoryList[index].subcategories[subIndex].name;
        try {
            const response = await modifySubCategory(categoryId, subcategoryId, newName);
            if (response.status === 200) {
                console.log("Subcategory modified successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div key="lol" className="card w-4/5 my-5 bg-neutral text-neutral-content mx-auto">
                <div className="card-body items-left text-center ">
                    <h2 className="card-title">Category</h2>
                    <div className="join join-horizontal w-full">
                        <div>
                            <div>
                                <input
                                    className="input input-bordered join-item w-full"
                                    placeholder="Category"
                                    value={newCategory || ""}
                                    onChange={(e) => { handleCategoryNameChange(e.target.value, "add") }}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary join-item rounded-r-full"
                            onClick={() => { handleAddCategory() }}>ADD</button>
                    </div>
                </div>
            </div>

            {Array.isArray(categoryList) && categoryList.map((category, index) => (
                <div key={category.id} className="card w-4/5 my-5 bg-neutral text-neutral-content mx-auto">
                    <div className="card-body items-left text-center">
                        <h2 className="card-title my-2">Category</h2>
                        <div className="join">
                            <div>
                                <div>
                                    <input
                                        className="input input-bordered join-item w-full text-primary"
                                        placeholder="Category"
                                        value={category.name}
                                        onChange={(e) => { handleCategoryNameChange(e.target.value, index) }}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-info join-item rounded-r-full"
                                onClick={() => { handleModifyCategory(index) }}>Modify</button>
                            <button className="btn btn-error join-item rounded-r-full"
                                onClick={() => { handleDeleteCategory(index) }}>Delete</button>
                        </div>

                        <h2 className="card-title ml-5 my-2">Subcategories</h2>
                        <div key={`addSub-${index}`} className="join join-horizontal ml-5">
                            <div>
                                <div>
                                    <input
                                        className="input input-bordered w-full join-item"
                                        placeholder="new subcategory"
                                        value={newSubCategories[index] || ""}
                                        onChange={(e) => { handleSubCategoryNameChange(e.target.value, index, "add") }}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-primary join-item rounded-r-full"
                                onClick={() => { handleAddSubCategory(index) }}>ADD</button>
                        </div>

                        {Array.isArray(category.subcategories) && category.subcategories.map((subCategory, subIndex) => (
                            <div key={subCategory.id} className="join my-2 ml-5">
                                <div>
                                    <div>
                                        <input
                                            className="input input-bordered w-full join-item"
                                            placeholder="Subcategory"
                                            value={subCategory.name}
                                            onChange={(e) => { handleSubCategoryNameChange(e.target.value, index, subIndex) }}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-info join-item rounded-r-full"
                                    onClick={() => { handleModifySubCategory(index, subIndex) }}>Modify</button>
                                <button className="btn btn-error join-item rounded-r-full"
                                    onClick={() => { handleDeleteSubCategory(index, subIndex) }}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}

export default AdminCategoriesCards;
