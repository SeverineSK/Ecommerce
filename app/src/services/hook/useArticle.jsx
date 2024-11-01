import axios from "axios";
import {AuthContext} from "../context/AuthContext.jsx";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

const useArticle = () => {

    const { token } = useContext(AuthContext);
    const [ apiErrors, setApiErrors ] = useState(null);
    const [ apiSuccess, setApiSuccess ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ requestLoading, setRequestLoading ] = useState(false);
    const [ articles, setArticles ] = useState(null);
    const [ articleById, setArticleById ] = useState(null);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ lastPage, setLastPage ] = useState(null);

    const navigate = useNavigate();

    const apiRequest = "http://localhost:8000/api/article"

    const createArticleAPIRequest = (data) => {

        setRequestLoading(true);
        const formData = handleFormData(data);

        axios.post(apiRequest, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setApiErrors(null);
            setApiSuccess(response.data.message);
            setRequestLoading(false);

            setTimeout(() => {
                setApiSuccess(null);
            }, 2000);
        })
        .catch(handleError);
    }

    const createCommentAPIRequest = (data, articleId) => {
        setRequestLoading(true);
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8000/api/comment/${articleId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    setRequestLoading(false);
                    resolve(response);
                })
                .catch((error) => {
                    setRequestLoading(false);
                    handleError(error);
                    reject(error);
                });
        });
    };

    // readOne
    const readOneArticleAPIRequest = (id = null, slug = null) => {
        setLoading(true)
        axios.get(`${apiRequest}/${id || slug}`)
        .then(response => {
            setArticleById(response.data.article);
            setLoading(false);
        })
        .catch(error => {
            console.log(error.response.data);
            setLoading(false);
        })
    }

    // readAll
    const readAllArticlesAPIRequest = (
        search = null,
        category = null,
        subcategory = null,
        paginate = null,
        page = null
    ) => {
        setLoading(true);

        axios.get(`${apiRequest}?search=${search}&category=${category}&subcategory=${subcategory}&paginate=${paginate}&page=${page}`)
        .then(response => {
            setArticles(response.data.articles);
            setCurrentPage(response.data.articles.current_page);
            setLastPage(response.data.articles.last_page);
            setLoading(false)
        })
        .catch(error => {
            console.log(error.response.data);
            setLoading(false);
        })
    }

    //update
    const updateArticleAPIRequest = (data, id) => {
        setRequestLoading(true);
        const formData = handleFormData(data);

        axios.post(`${apiRequest}/${id}`, formData, {
            params: {
                _method: 'PATCH'
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
        })
        .then(response => {
            setApiErrors(null);
            setApiSuccess(response.data.message);
            setRequestLoading(false);

            setTimeout(() => {
                setApiSuccess(null);
            }, 2000);
        })
        .catch(handleError);
    }

    // delete
    const deleteArticleAPIRequest = (id) => {
        setRequestLoading(true);
        axios.delete(`${apiRequest}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setApiErrors(null);
            setApiSuccess(response.data.message);
            setRequestLoading(false);

            setTimeout(() => {
                setApiSuccess(null);
                navigate("/admin/articles")
            }, 2000);
        })
        .catch(error => {
            setApiErrors(error.response.data.message);
            setTimeout(() => {

            }, 2000);
            setRequestLoading(false);
        })
    }

    const handleError = (error) => {
        console.log(error.response.data);
        if (error.response.status === 422) {
            if (error.response.data.errors.picture) {
                setApiErrors(error.response.data.errors.picture);
            }
            if (error.response.data.errors.stock_state) {
                setApiErrors(error.response.data.errors.stock_state);
            }
            if (error.response.data.errors.subcategory_id) {
                setApiErrors(error.response.data.errors.subcategory_id);
            }
        } else {
            setApiErrors("Something went wrong. Please try again later.");
        }
        setRequestLoading(false);
    }

    const handleFormData = (data) => {
        const formData = new FormData();
        if (data.picture[0]) {
            formData.append("picture", data.picture[0]);
        }
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("height", data.height);
        formData.append("width", data.width);
        formData.append("length", data.length);
        formData.append("weight", data.weight);
        formData.append("discount", data.discount);
        if (data.recommended === true) {
            formData.append("recommended", "1");
        } else {
            formData.append("recommended", "0");
        }
        formData.append("stock_state", data.stock_state);
        formData.append("subcategory_id", data.subcategory_id);

        return formData;
    }

    return {
        createArticleAPIRequest,
        readAllArticlesAPIRequest,
        readOneArticleAPIRequest,
        updateArticleAPIRequest,
        deleteArticleAPIRequest,
        createCommentAPIRequest,
        articles, currentPage, setCurrentPage, lastPage, articleById, apiErrors, apiSuccess, loading, requestLoading
    };
};
export default useArticle;
