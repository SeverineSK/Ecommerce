import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

const useCategory = () => {

    const { token } = useContext(AuthContext);
    const [ categories, setCategories ] = useState([]);
    const [ categoryById, setCategoryById ] = useState(null);
    const [ apiErrors, setApiErrors ] = useState(null);
    const [ apiSuccess, setApiSuccess ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    // const [ requestLoading, setRequestLoading ] = useState(false);

    const apiRequest = "http://localhost:8000/api/category"

    const readAllCategoryAPIRequest = () => {

        setLoading(true);

        axios.get(`${apiRequest}`)
        .then(response => {
            setCategories(response.data.categories);
            setLoading(false);
        })
        .catch(error => {
            console.log(error.response.data);
            setCategories(null);
            setLoading(false);
        })
    }
    const readOneCategoryAPIRequest = (id = null, slug = null) => {
        setLoading(true)
        axios.get(`${apiRequest}/${id || slug}`)
            .then(response => {
                setCategoryById(response.data.category);
                setLoading(false);
            })
            .catch(error => {
                console.log(error.response.data);
                setLoading(false);
            })
    }

    const addCategory = async (name) => {
        setLoading(true);
        const response = await axios.post(`${apiRequest}`, {
            name: name
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setLoading(false);
        return response;
    }

    const modifyCategory = async (id, name) => {
        setLoading(true);
        const response = await axios.patch(`${apiRequest}/${id}`, {
            name: name
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setLoading(false);
        return response;
    }

    return { readAllCategoryAPIRequest, readOneCategoryAPIRequest, addCategory, modifyCategory, categories, categoryById, loading, apiErrors, apiSuccess };
};

export default useCategory;
