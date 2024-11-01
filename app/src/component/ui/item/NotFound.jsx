import notFound from "../../../assets/notFound.svg";
const NotFound = () => {
    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            <img className={"w-[500px] max-xs:w-[300px] max-sm:w-[400px] pointer-events-none"} src={notFound} alt={'img'}/>
            <p className={"text-4xl max-xs:text-3xl font-bold text-primary pb-4"}>No Results Found</p>
            <p className={"text-xl text-center max-sm:text-lg"}>Please try again with another</p>
            <p className={"text-xl text-center max-sm:text-lg"}>keywords or maybe use generic term</p>
        </div>
    );
};

export default NotFound;