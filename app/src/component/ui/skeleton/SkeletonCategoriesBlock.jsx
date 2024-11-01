const SkeletonCategoriesBlock = () => {
    return (
        <div className="flex flex-wrap justify-center gap-4 pt-6 pb-12 px-6 bg-base-300 m-6 max-xs:mx-3 rounded-xl animate-pulse">
            <div className={"w-full"}>
                <div className={"flex justify-center items-center gap-2 rounded-xl w-full pt-6"}>
                    <div className={"h-[36px] w-[36px] min-w-[36px] min-h-[36px] bg-base-200 rounded-xl"}/>
                    <div className={"w-[20rem] h-[36px] bg-base-200 rounded-xl"}></div>
                </div>
                <span className={"divider"}></span>
            </div>
            <div className={"flex justify-center items-center w-5/12 h-[72px] max-sm:w-full rounded-xl bg-base-200"}></div>
            <div className={"flex justify-center items-center w-5/12 h-[72px] max-sm:w-full rounded-xl bg-base-200"}></div>
            <div className={"flex justify-center items-center w-5/12 h-[72px] max-sm:w-full rounded-xl bg-base-200"}></div>
            <div className={"flex justify-center items-center w-5/12 h-[72px] max-sm:w-full rounded-xl bg-base-200"}></div>
            <div className={"flex justify-center items-center w-5/12 h-[72px] max-sm:w-full rounded-xl bg-base-200"}></div>
            <div className={"flex justify-center items-center w-5/12 h-[72px] max-sm:w-full rounded-xl bg-base-200"}></div>
        </div>
    );
};

export default SkeletonCategoriesBlock;