import {useForm} from "react-hook-form";
import Fuse from "fuse.js";
import {useEffect, useState} from "react";
import {FiSearch} from "react-icons/fi";
import useArticle from "../../../services/hook/useArticle.jsx";
import {Link} from "react-router-dom";

const Searchbar = ({
    search = null,
    setSearch,
    setCurrentPage,
    filter = null,
    setFilter,
    filterElements,
    filterApiRequest,
    numbersOfItems = null,
    setNumbersOfItems,
    numbersOfItemsName = "Select Number of Items",
    dynamicSearchbar = false,
}) => {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [rows] = useState(Array.from({ length: 10 }, (_, i) => (i + 1) * 5));
    const {readAllArticlesAPIRequest, articles} = useArticle();

    const onSubmit = (data) => {
        if (search !== null) {
            setCurrentPage(1);
            setSearch(data.search);
        }
        if (filter !== null) {
            setCurrentPage(1);
            setFilter(data.filter);
        }
        if (numbersOfItems !== null) {
            setCurrentPage(1);
            setNumbersOfItems(data.numbersOfItems);
        }
        if (dynamicSearchbar) {
            setShowdropdown(false);
        }
    }

    useEffect(() => {
        if (filter !== null) {
            filterApiRequest();
        }
    }, []);

    // ========= dynamicSearch ========== //

    useEffect(() => {
        if (dynamicSearchbar) {
            readAllArticlesAPIRequest("", "", "", "", "");
        }
    }, []);

    const [realTimeSearchResult, setRealTimeSearchResult] = useState([]);
    const [showdropdown, setShowdropdown] = useState(false);

    const fuseOptions = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: ["name"],
    };
    const fuse = (value) => {
        const fuse = new Fuse(articles, fuseOptions);
        return fuse.search(value);
    }

    const handleSearch = (value) => {
        const dynamicResult = fuse(value);
        setRealTimeSearchResult(dynamicResult);

        if (value.length > 0) {
            setShowdropdown(true);
        } else {
            setShowdropdown(false);
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-sm:gap-2 max-sm:flex-col gap-2">

            <div className={"w-full"}>
                <div className={"relative"}>
                    <input
                        type="text"
                        className={`input input-sm input-primary bg-transparent focus:outline-0 focus:ring-2 focus:ring-primary w-full pr-10 transition`}
                        placeholder="Search..."
                        autoComplete="off"
                        {...register("search", {
                            onChange: (e) => {dynamicSearchbar && handleSearch(e.target.value)},
                            required: false,
                        })}
                    />
                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center hover:text-gray-300 transition">
                        <button type="submit">
                            <FiSearch className="text-lg"/>
                        </button>
                    </span>
                </div>
                {dynamicSearchbar && realTimeSearchResult.length > 0 && showdropdown &&
                    <div className="flex flex-col z-[99] mt-2 gap-2 p-2 rounded-xl shadow-md border-[3px] border-primary">
                        {Array.isArray(realTimeSearchResult) &&
                            realTimeSearchResult.slice(0, 5).map((result) => (
                                <Link key={result.refIndex}
                                      to={`categories/${result.item.subcategory.category.slug}/${result.item.subcategory.slug}/${result.item.slug}`}
                                      className="flex p-2 w-full hover:bg-base-200 cursor-pointer rounded-lg transition"
                                >
                                    <div className={"min-h-[3rem] min-w-[3rem] w-[3rem] h-[3rem]"}>
                                        <img className={"object-cover w-full h-full rounded-md overflow-hidden"} src={result.item.picture} alt={result.item.name} />
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-sm font-bold mb-1">{result.item.name}</p>
                                        <p className="text-xs items-center flex"><span className={"text-success mr-[2px]"}>$</span>{result.item.price}</p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                }
            </div>

            {filter !== null &&
                <select defaultValue={""}
                        className="select select-sm select-primary bg-transparent focus:outline-0 focus:ring-2 focus:ring-primary min-w-[12rem] max-w-[12rem] max-sm:max-w-full transition"
                        {...register("filter", {required: false,})}
                >
                    <option value={""}>All Categories</option>
                    {filterElements &&
                        filterElements.map((filter) => (
                            <option key={filter.id} value={filter.slug}>{filter.name}</option>
                        ))
                    }
                </select>
            }

            {numbersOfItems &&
                <select defaultValue={numbersOfItems}
                        className="select select-sm select-primary bg-transparent focus:outline-0 focus:ring-2 focus:ring-primary w-20 max-sm:w-full transition"
                        {...register("numbersOfItems", {required: false,})}
                >
                    <option disabled={true} value={""}>- {numbersOfItemsName} -</option>
                    {rows.map((row, index) => (
                        <option key={index} value={row}>{row}</option>
                    ))}

                </select>
            }
        </form>
    );
};

export default Searchbar;

