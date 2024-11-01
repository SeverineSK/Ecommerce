import { useForm } from "react-hook-form";
import Field from "../ui/form/Field.jsx";
import FieldGroup from "../ui/form/FieldGroup.jsx";
import FormCRUD from "../ui/form/FormCRUD.jsx";
import {FaAddressBook, FaCity} from "react-icons/fa";
import {TbZip} from "react-icons/tb";


function ShippingForm({ children = null, onSubmit, apiErrors, apiSuccess, requestLoading, setOpen, open, address}) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className="collapse collapse-plus bg-transparent border-2 border-base-300">
            <input onChange={() => setOpen(!open)} type="checkbox" name="my-accordion-3" checked={open} />
            <div className="collapse-title text-xl font-medium">
                Shipping address
            </div>
            <div className="collapse-content">
                <FormCRUD action={handleSubmit(onSubmit)}
                          buttonName={"Add this address"}
                          apiErrors={apiErrors}
                          apiSuccess={apiSuccess}
                          loading={requestLoading}
                >
                    <FieldGroup>
                        <Field Icons={FaAddressBook} labelName={"Address"} errorsType={errors.street1} >
                            <input type="text"
                                   defaultValue={address && address.street1}
                                   placeholder="Address"
                                   className={`input input-bordered input-sm w-full ${errors.street1 ? "input-error" : "input-primary"}`}
                                   {...register("street1", {
                                       required: {
                                           value: true,
                                           message: "Adress is required"
                                       },
                                       minLength: {
                                           value: 1,
                                           message: "Adress must be at least 1 characters long"
                                       },
                                       maxLength: {
                                           value: 60,
                                           message: "Adress must not be longer than 60 characters"
                                       }
                                   })}
                            />
                        </Field>

                        <Field Icons={FaAddressBook} labelName={"Address 2"} errorsType={errors.address2} >
                            <input type="text"
                                   defaultValue={address && address.street2}
                                   placeholder="Address 2"
                                   className={`input input-sm input-bordered w-full ${errors.address2 ? "input-error" : "input-primary"}`}
                                   {...register("street2", {})}
                            />
                        </Field>
                    </FieldGroup>


                    <FieldGroup>
                        <Field Icons={FaCity} labelName={"City"} errorsType={errors.city} >
                            <input type="text"
                                   defaultValue={address && address.city}
                                   placeholder="City"
                                   className={`input input-bordered input-sm w-full ${errors.city ? "input-error" : "input-primary"}`}
                                   {...register("city", {
                                       required: {
                                           value: true,
                                           message: "City is required"
                                       },
                                       minLength: {
                                           value: 1,
                                           message: "City must be at least 1 characters long"
                                       },
                                       maxLength: {
                                           value: 60,
                                           message: "City must not be longer than 60 characters"
                                       }
                                   })}
                            />
                        </Field>
                        <Field Icons={FaCity} labelName={"State"} errorsType={errors.state} >
                            <input type="text"
                                   defaultValue={address && address.state}
                                   placeholder="State"
                                   className={`input input-bordered input-sm w-full ${errors.state ? "input-error" : "input-primary"}`}
                                   {...register("state", {
                                       required: {
                                           value: true,
                                           message: "State is required"
                                       },
                                       minLength: {
                                           value: 1,
                                           message: "State must be at least 1 characters long"
                                       },
                                       maxLength: {
                                           value: 60,
                                           message: "State must not be longer than 60 characters"
                                       }
                                   })}
                            />
                        </Field>

                        <Field Icons={TbZip} labelName={"Zip"} errorsType={errors.zip} >
                            <input type="text"
                                   defaultValue={address && address.zip}
                                   placeholder="Zip"
                                   className={`input input-sm input-bordered w-full ${errors.zip ? "input-error" : "input-primary"}`}
                                   {...register("zip", {
                                       required: {
                                           value: true,
                                           message: "Zip is required"
                                       },
                                       minLength: {
                                           value: 1,
                                           message: "Zip must be at least 1 characters long"
                                       },
                                       maxLength: {
                                           value: 60,
                                           message: "Zip must not be longer than 60 characters"
                                       }
                                   })}
                            />
                        </Field>

                        <Field Icons={FaCity} labelName={"Country"} errorsType={errors.country} >
                            <input type="text"
                                   defaultValue={address && address.country}
                                   placeholder="Country"
                                   className={`input input-sm input-bordered w-full ${errors.country ? "input-error" : "input-primary"}`}
                                   {...register("country", {
                                       required: {
                                           value: true,
                                           message: "Country is required"
                                       },
                                       minLength: {
                                           value: 1,
                                           message: "Country must be at least 1 characters long"
                                       },
                                       maxLength: {
                                           value: 60,
                                           message: "Country must not be longer than 60 characters"
                                       }
                                   })}
                            />
                        </Field>
                    </FieldGroup>
                    {children}
                </FormCRUD>
            </div>
        </div>

    )
}

export default ShippingForm;