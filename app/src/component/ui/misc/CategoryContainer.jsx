const CategoryContainer = ({Icon, title, children}) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 pt-6 pb-12 px-6 bg-base-200 m-6 max-xs:mx-3 rounded-xl">
            <div className={"w-full"}>
                <h1 className={"w-full flex justify-center pt-6 text-3xl max-sm:text-xl font-bold items-center gap-2"}>
                    <Icon className={"min-w-[20px]"}/>
                    {title}
                </h1>
                <span className={"divider"}></span>
            </div>
            {children}
        </div>
    );
};

export default CategoryContainer;