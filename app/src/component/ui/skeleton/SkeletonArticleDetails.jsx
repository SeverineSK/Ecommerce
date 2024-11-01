import PictureNextToForm from "../form/PictureNextToForm.jsx";

const SkeletonArticleDetails = () => {
    return (
        <div className={"py-6 px-6 max-sm:px-4"}>
            <PictureNextToForm>
                <div className={"flex flex-col gap-4"}>
                    <div className={"w-[75%] h-12 rounded-lg bg-base-300 animate-pulse"}></div>
                </div>

                <div className={"h-[2px] bg-base-300 my-4"}></div>

                <div className={"w-full flex flex-wrap gap-6 justify-between"}>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"flex gap-4"}>
                            <div className={"w-52 h-12 rounded-lg bg-base-300 animate-pulse"}></div>
                        </div>
                    </div>

                    <div className={"flex gap-2 ml-auto"}>
                        <div className={"w-40 h-12 rounded-lg bg-base-300 animate-pulse"}></div>
                    </div>
                </div>

                <div className={"flex flex-col mb-6 mt-12 gap-4"}>
                    <div className={"flex h-10 bg-base-300 animate-pulse p-3 rounded-lg justify-start gap-2"}></div>
                    <div className={"w-[50%] h-6 rounded-lg bg-base-300 animate-pulse"}></div>
                    <div className={"flex w-full gap-6"}>
                        <div className={"w-[33%] h-12 rounded-lg bg-base-300 animate-pulse"}></div>
                        <div className={"w-[33%] h-12 rounded-lg bg-base-300 animate-pulse"}></div>
                        <div className={"w-[33%] h-12 rounded-lg bg-base-300 animate-pulse"}></div>
                    </div>
                </div>

                <div className={"flex flex-col mb-6 gap-4"}>
                    <div className={"flex h-10 bg-base-300 animate-pulse p-3 rounded-lg justify-start gap-2"}></div>
                    <div className={"w-[100%] h-4 rounded-lg bg-base-300 animate-pulse"}></div>
                    <div className={"w-[100%] h-4 rounded-lg bg-base-300 animate-pulse"}></div>
                    <div className={"w-[75%] h-4 rounded-lg bg-base-300 animate-pulse"}></div>
                </div>

                <div className={"flex flex-col gap-4"}>
                    <div className={"flex h-10 bg-base-300 animate-pulse p-3 rounded-lg justify-start gap-2"}></div>
                    <div className={"w-[100%] h-24 rounded-lg bg-base-300 animate-pulse"}></div>
                </div>

                <div className={"h-[2px] bg-base-300 my-4"}></div>
                <div className={"flex h-12 bg-base-300 animate-pulse p-3 rounded-lg justify-start gap-2"}></div>
            </PictureNextToForm>
        </div>
    );
};
export default SkeletonArticleDetails;

