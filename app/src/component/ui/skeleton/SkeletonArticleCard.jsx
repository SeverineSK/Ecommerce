const SkeletonArticleCard = () => {
    return (
        <div className={"flex flex-col justify-between w-80 bg-base-300 rounded-xl animate-pulse p-4 gap-4"}>
            <div className={"flex flex-col gap-4"}>
                <div className={"w-full h-48 bg-base-200 rounded-xl"}></div>
                <div className={"w-full h-7 bg-base-200 rounded-xl"}></div>
            </div>
            <div className={"flex flex-col gap-4"}>
                <div className={"flex justify-between gap-6"}>
                    <div className={"w-7/12 h-7 bg-base-200 rounded-xl"}></div>
                    <div className={"w-5/12 h-7 bg-base-200 rounded-xl"}></div>
                </div>
                <div className={"w-full h-8 bg-base-200 rounded-lg"}></div>
            </div>
        </div>
    );
};

export default SkeletonArticleCard;