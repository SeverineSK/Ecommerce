import {HiXCircle} from "react-icons/hi";

const Field = ({errorsType, children, Icons, labelName, label = true, isToggleInput = false}) => {
    return (
        <div className={`flex flex-col ${!isToggleInput && "w-full"}`}>
            {label &&
                <label className="label">
                <span className="label-text flex items-center gap-1">
                    <Icons className={"text-white min-w-[20px] h-auto"}/>
                    {labelName}
                </span>
                </label>
            }
            <div className={"flex items-center gap-4"}>
                {children}
            </div>
            {errorsType &&
                <label className="label pb-0">
                    <span className="label-text-alt text-error flex items-center gap-1"><HiXCircle className={"text-lg"}/>{errorsType.message}</span>
                </label>
            }
        </div>
    );
};

export default Field;