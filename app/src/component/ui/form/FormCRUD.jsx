import {HiCheckCircle, HiXCircle} from "react-icons/hi";

const Form = ({children, loading, apiErrors, apiSuccess, action, buttonName}) => {

    return (
            <form className={`flex flex-col w-full gap-4 max-sm:gap-3 rounded-3xl`} onSubmit={action}>
                {apiErrors &&
                    <div className="alert alert-error flex">
                        <HiXCircle className={"text-xl"} />
                        <span className={"max-sm:text-sm"}>{apiErrors}</span>
                    </div>
                }

                {apiSuccess &&
                    <div className="alert alert-success flex">
                        <HiCheckCircle className={"text-xl"} />
                        <span className={"max-sm:text-sm"}>{apiSuccess}</span>
                    </div>
                }

                {children}

                <button className={`btn btn-success ${loading && "opacity-50 pointer-events-none"} mt-4`}>{loading
                    ? <span className="loading loading-spinner loading-sm"></span>
                    : <><HiCheckCircle className={"text-2xl"}/><span>{buttonName}</span></>
                }
                </button>
            </form>
    );
};

export default Form;