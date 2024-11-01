const TitleWithIcon = ({title, Icons}) => {
    return (
        <div className={"flex items-center w-full bg-gradient-to-r from-base-300 to-base-200 p-4 mb-6 rounded-xl gap-4"}>
            <Icons className={"text-3xl"}/>
            <h1 className={"flex gap-2 font-bold uppercase"}>
                {title}
            </h1>
        </div>
    );
};

export default TitleWithIcon;