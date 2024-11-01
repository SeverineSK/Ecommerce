import {useForm} from "react-hook-form";
import {HiAtSymbol} from "react-icons/hi";
import useAuth from "../../services/hook/useAuth.jsx";
import Form from "../ui/form/Form.jsx";
import CustomInput from "../ui/form/CustomInput.jsx";
import {HiUser} from "react-icons/hi2";
const RegisterForm = () => {

    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const { registerAPIRequest, apiErrors, apiSuccess, loading } = useAuth();

    const onSubmit = (data) => {
        registerAPIRequest(data)
    }

    return (
        <Form action={handleSubmit(onSubmit)}
              formTitle={"Sign Up"}
              buttonName={"Sign Up"}
              width={"w-[36rem]"}
              apiErrors={apiErrors}
              apiSuccess={apiSuccess}
              loading={loading}
              isRegisterForm={true}
        >
            <CustomInput
                Icons={HiUser}
                error={errors.name}
                ref={register}
                key={"name"}
                type="text"
                placeholder={"Name"}
                {...register("name", {
                    required: {
                        value: true,
                        message: "Name is required"
                    },
                    minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters"
                    },
                    maxLength: {
                        value: 40,
                        message: "Name must not be more than 40 characters"
                    }
                })}
            />

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
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    },
                    maxLength: {
                        value: 60,
                        message: "Password must not be more than 60 characters"
                    }
                })}
            />

            <CustomInput
                error={errors.password_confirmation}
                isPasswordInput={true}
                ref={register}
                key={"password_confirmation"}
                placeholder={"Confirm Password"}
                {...register("password_confirmation", {
                    required: {
                        value: true,
                        message: "Password confirmation is required"
                    },
                    validate: value => {
                        return value === getValues().password || "Passwords don't match";
                    }
                })}
            />

        </Form>
    );
};
export default RegisterForm;
