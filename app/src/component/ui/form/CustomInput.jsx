import {forwardRef, useState} from "react";
import {HiEye, HiEyeOff, HiXCircle} from "react-icons/hi";

const CustomInput = forwardRef(({isPasswordInput = false, size = "w-full", Icons, error, ...props}, ref) => {

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className={"w-full"}>
            <div className={`relative ${size}`}>
                <input ref={ref}
                       className={`relative w-full input bg-transparent input-bordered focus:outline-0 focus:ring-2 ${error ? "input-error ring-error" : "input-primary ring-primary"} pr-10 transition`}
                       type={isPasswordInput && showPassword ? "text" : "password"}
                       {...props}
                />
                <div
                    onClick={toggleShowPassword}
                    className={`absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500 transition ${isPasswordInput ? "cursor-pointer hover:text-gray-100" : "pointer-events-none"}`}
                >
                {Icons &&
                    <Icons className={"text-xl"}/>
                }
                {isPasswordInput ?
                    showPassword ? <HiEyeOff className={"text-xl"}/> : <HiEye className={"text-xl"}/> : null
                }
                </div>
            </div>
            {error &&
                <label className="label pb-0">
                    <span className="label-text-alt text-error flex items-center gap-1"><HiXCircle className={"text-lg"}/>{error.message}</span>
                </label>
            }
        </div>
    );
});

export default CustomInput;