import { useForm } from "react-hook-form";
import CustomInput from "../ui/form/CustomInput.jsx";
import { HiCalendar, HiCreditCard, HiUser } from "react-icons/hi";
import FormCRUD from "../ui/form/FormCRUD.jsx";
import {FaCcVisa} from "react-icons/fa";
import {SiMastercard} from "react-icons/si";
import FieldGroup from "../ui/form/FieldGroup.jsx";
import {useState} from "react";

const CreditCardForm = ({creditCard, setCreditCard}) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [open, setOpen] = useState(true);

    const onSubmit = (data) => {
        setCreditCard(data);
        setOpen(false);
    }

    const hideCardNumber = () => {
        // **** 4 LAST DIGITS
        return "**** " + creditCard.card_number.slice(-4);
    }

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
        setValue("card_number", value);
    }

    const handleCardDateChange = (e) => {
        const isDeleting = (e.nativeEvent.inputType === "deleteContentBackward");
        let value = e.target.value.replace(/\//g, '');
        if (!isDeleting) {
            value = value.replace(/(\d{2})/g, '$1/').trim();
        }
        if (value.length <= 5) {
            setValue("card_date", value);
        }
    };

    return (
        <div className="collapse collapse-plus bg-transparent border-2 border-base-300">
            <input onChange={() => setOpen(!open)} type="checkbox" name="my-accordion-3" checked={open} />
            <div className="collapse-title text-xl font-medium">
                {creditCard
                    ? <div className={"flex items-center gap-2"}>
                        <FaCcVisa className={"text-2xl"}/>
                        <p className={"text-md"}>Visa</p>
                        <p className={"text-md"}>{hideCardNumber()}</p>
                    </div>
                    : "Credit Card"
                }
            </div>
            <div className="collapse-content">
                <FormCRUD buttonName={"Add this Card"} action={handleSubmit(onSubmit)}>
                    <div className={"flex justify-end"}>
                        <div className={"flex gap-3 text-xl"}>
                            <FaCcVisa/>
                            <SiMastercard/>
                        </div>
                    </div>
                    <CustomInput
                        Icons={HiUser}
                        error={errors.card_holder}
                        type={"text"}
                        defaultValue={creditCard && creditCard.card_holder}
                        placeholder={"Card holder"}
                        {...register("card_holder", {
                            required: {
                                value: true,
                                message: "Card holder is required"
                            },
                        })}
                    />

                    <CustomInput
                        Icons={HiCreditCard}
                        error={errors.card_number}
                        defaultValue={creditCard && creditCard.card_number}
                        type={"text"}
                        maxLength={19}
                        placeholder={"Enter your card number"}
                        {...register("card_number", {
                            onChange: handleCardNumberChange,
                            required: {
                                value: true,
                                message: "Card number is required"
                            },
                            pattern: {
                                value: /\d{4} \d{4} \d{4} \d{4}/,
                                message: "Entered value does not match card number format"
                            }
                        })}
                    />

                    <FieldGroup>
                        <CustomInput
                            Icons={HiCalendar}
                            error={errors.card_date}
                            defaultValue={creditCard && creditCard.card_date}
                            type={"text"}
                            maxLength={5}
                            placeholder={"MM/YY"}
                            {...register("card_date", {
                                onChange: handleCardDateChange,
                                required: {
                                    value: true,
                                    message: "Card date is required"
                                },
                                pattern: {
                                    value: /^(0[1-9]|1[0-2])\/?([2-9][3-9])$/,
                                    message: "Invalid date format"
                                }
                            })}
                        />

                        <CustomInput
                            error={errors.card_cvc}
                            isPasswordInput={true}
                            placeholder={"CVV"}
                            defaultValue={creditCard && creditCard.card_cvc}
                            maxLength={3}
                            {...register("card_cvc", {
                                required: {
                                    value: true,
                                    message: "Card CVV is required"
                                },
                                pattern: {
                                    value: /\d{3}/,
                                    message: "Entered value does not match CVC format"
                                }
                            })}
                        />
                    </FieldGroup>
                </FormCRUD>
            </div>
        </div>
    );
};
export default CreditCardForm;
