import React from 'react';
import Form from "../ui/form/Form.jsx";
import {useForm} from "react-hook-form";
import useArticle from "../../services/hook/useArticle.jsx";
import {HiMenuAlt2} from "react-icons/hi";
import Field from "../ui/form/Field.jsx";
import inputClass from "../ui/constant/InputClass.jsx";
import {BiSolidSend} from "react-icons/bi";

const ArticleComments = ({articleId, refreshArticle}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const {TextAreaCommentClass} = inputClass();

    const { createCommentAPIRequest, requestLoading } = useArticle();
    const onSubmit = (data) => {
        createCommentAPIRequest(data, articleId)
            .then(() => {
                refreshArticle();
            })
    }

    return (
        <div>
            <h1 className={"text-md font-bold"}>Comments Section</h1>
            <div className={"h-[2px] w-full bg-base-300 my-4"}></div>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={"flex flex-col gap-4"}
            >
                    <Field Icons={HiMenuAlt2} labelName={"Add comments"} errorsType={errors.comment} >
                    <textarea placeholder={"Type your comment here..."}
                              className={`${TextAreaCommentClass({error: errors.comment})}`}
                              {...register("comment", {
                                  required: {
                                      value: true,
                                      message: "Comment is required"
                                  },
                              })}
                    />
                        <button className={`btn btn-primary ${requestLoading && "opacity-50 pointer-events-none"} text-white`}>{requestLoading
                            ? <span className="loading loading-spinner loading-sm"></span>
                            : <BiSolidSend className={"text-xl"}/>
                        }
                        </button>
                    </Field>
            </form>
        </div>
    );
};

export default ArticleComments;