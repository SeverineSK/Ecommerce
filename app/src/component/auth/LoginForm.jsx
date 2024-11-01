import {useForm} from "react-hook-form";
import {HiMail, HiLockClosed, HiAtSymbol, HiEye} from "react-icons/hi";
import useAuth from "../../services/hook/useAuth.jsx";
import Form from "../ui/form/Form.jsx";
import Field from "../ui/form/Field.jsx";
import CustomInput from "../ui/form/CustomInput.jsx";

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginAPIRequest, apiErrors, apiSuccess, loading } = useAuth();

    const onSubmit = (data) => {
        loginAPIRequest(data);
    }

    return (
        <Form action={handleSubmit(onSubmit)}
              formTitle={"Sign In"}
              buttonName={"Sign In"}
              width={"w-[35rem]"}
              apiErrors={apiErrors}
              apiSuccess={apiSuccess}
              loading={loading}
              isLoginForm={true}
        >
            <CustomInput
                Icons={HiAtSymbol}
                error={errors.email}
                ref={register}
                key={"email"}
                type="email"
                placeholder={"Email"}
                {...register("email", {
                    required: {
                        value: true,
                        message: "Email is required"
                    },
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }
                })}
            />
            <CustomInput
                error={errors.password}
                isPasswordInput={true}
                ref={register}
                key={"password"}
                placeholder={"Password"}
                {...register("password", {
                    required: {
                        value: true,
                        message: "Password is required"
                    },
                })}
            />
        </Form>
    );
};
export default LoginForm;
