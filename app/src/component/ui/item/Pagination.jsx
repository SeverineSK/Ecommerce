import {HiArrowLeft, HiArrowRight, HiChevronLeft, HiChevronRight} from "react-icons/hi";

const Pagination = ({currentPage, setCurrentPage, totalPages, siblingCount}) => {


    const page = [];
    const startPage = Math.max(1, currentPage - siblingCount);
    const endPage = Math.min(totalPages, currentPage + siblingCount);

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    }
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }
    const lastPage = () => {
        setCurrentPage(totalPages);
    }
    const firstPage = () => {
        setCurrentPage(1);
    }

    for (let i = startPage; i <= endPage; i++) {
        page.push(i);
    }

    return (
        <div className={"flex w-full justify-center self-end border-t-[1px] border-base-300 py-6"}>
            {totalPages > 1 &&
                <div className="join">
                    <div className="flex">
                        {currentPage > 1 &&
                            <button onClick={() => previousPage()} className="join-item btn btn-sm bg-base-300 border-0 text-lg px-2"><HiChevronLeft/></button>
                        }

                        {currentPage > siblingCount + 1 &&
                            <>
                                <button onClick={() => firstPage()} className={`join-item btn btn-sm ${currentPage === page ? "btn-active btn-primary" : ""} `}>1</button>
                                <button className={`join-item btn btn-sm max-xs:hidden ${currentPage === page ? "btn-active btn-primary" : ""} `}>...</button>
                            </>
                        }

                        {page.map((page) => (
                            <button key={page} onClick={() => setCurrentPage(page)} className={`join-item btn btn-sm ${currentPage === page ? "btn-active btn-primary" : ""} `}>{page}</button>
                        ))}

                        {currentPage < totalPages - siblingCount &&
                            <>
                                <button className={`join-item btn btn-sm max-xs:hidden ${currentPage === page ? "btn-active btn-primary" : ""} `}>...</button>
                                <button onClick={() => lastPage()} className={`join-item btn btn-sm ${currentPage === page ? "btn-active btn-primary" : ""} `}>{totalPages}</button>
                            </>
                        }

                        {currentPage < totalPages &&
                            <button onClick={() => nextPage()} className="join-item btn btn-sm bg-base-300 border-0 px-2 text-lg"><HiChevronRight/></button>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Pagination;