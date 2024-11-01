
const PictureNextToForm = ({children, pictureURL, pictureName}) => {
    return (
        <div className={"flex justify-between flex-wrap"}>

            <div className={"w-6/12 max-sm:w-full mb-6"}>
                <div className={`overflow-hidden rounded-xl ${!pictureURL && "bg-base-300 animate-pulse"}`}>
                    {pictureURL
                        ? <img src={pictureURL} alt={pictureName} className={"w-full"}/>
                        : <div className={"w-full"}>
                            <div className={"h-[500px] w-[500px]"}></div>
                        </div>
                    }
                </div>
            </div>

            <div className={"flex flex-col w-6/12 max-sm:w-full max-sm:pl-0 pl-6"}>
                {children}
            </div>

        </div>
    );
};

export default PictureNextToForm;