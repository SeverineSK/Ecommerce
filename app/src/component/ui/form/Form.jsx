import {HiCheckCircle, HiXCircle} from "react-icons/hi";

const Form = ({children, loading, apiErrors, apiSuccess, action, width, formTitle, buttonName}) => {

    return (
        <form className={`flex flex-col ${width} gap-6 px-4 py-4 max-sm:px-0 w-full rounded-3xl`} onSubmit={action}>

            <h1 className={"text-white text-3xl font-bold self-center mb-4"}>{formTitle}</h1>

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

            <button className={`btn btn-primary ${loading && "opacity-50 pointer-events-none"} text-white`}>{loading
                ? <span className="loading loading-spinner loading-sm"></span>
                : <span>{buttonName}</span>
            }
            </button>
        </form>
    );
};

export default Form;