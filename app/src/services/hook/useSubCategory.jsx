import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

const useSubCategory = () => {

    const { token } = useContext(AuthContext);
    const [ subCategories, setSubCategories ] = useState([]);
    const [ subCategoryById, setSubCategoryById ] = useState(null);
    const [ apiErrors, setApiErrors ] = useState(null);
    const [ apiSuccess, setApiSuccess ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const apiRequest = "http://localhost:8000/api/subcategory"

    const readAllSubCategoryAPIRequest = () => {

        setLoading(true);

        axios.get(`${apiRequest}`)
        .then(response => {
            setSubCategories(response.data.subcategories);
            setLoading(false);
        })
        .catch(error => {
            console.log(error.response.data);
            setSubCategories(null);
            setLoading(false);
        })
    }

    const readOneSubCategoryAPIRequest = (id = null, slug = null) => {
        setLoading(true)
        axios.get(`${apiRequest}/${id || slug}`)
            .then(response => {
                setSubCategoryById(response.data.subcategory);
                setLoading(false);
            })
            .catch(error => {
                console.log(error.response.data);
                setLoading(false);
            })
    }

    const addSubCategory = async (categoryId, name) => {
        setLoading(true);
        const response = await axios.post(`${apiRequest}`, {
            category_id: categoryId,
            name: name
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setLoading(false);
        return response;
    }

    const modifySubCategory = async (id, name) => {
        setLoading(true);
        const response = await axios.put(`${apiRequest}/${id}`, {
            name: name
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setLoading(false);
        return response;
    }

    return { readAllSubCategoryAPIRequest, readOneSubCategoryAPIRequest, addSubCategory, modifySubCategory, subCategories, subCategoryById, loading, apiErrors, apiSuccess };
};

export default useSubCategory;
