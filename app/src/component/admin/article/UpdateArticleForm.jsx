import {useForm} from "react-hook-form";
import useArticle from "../../../services/hook/useArticle.jsx";
import {
    HiCurrencyDollar,
    HiMenuAlt2,
    HiPhotograph,
    HiShoppingCart, HiThumbUp, HiTrendingUp, HiViewGridAdd
} from "react-icons/hi";
import Field from "../../ui/form/Field.jsx";
import FieldGroup from "../../ui/form/FieldGroup.jsx";
import FormCRUD from "../../ui/form/FormCRUD.jsx";
import PictureNextToForm from "../../ui/form/PictureNextToForm.jsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import LoadingSpinner from "../../ui/skeleton/LoadingSpinner.jsx";
import useCategory from "../../../services/hook/useCategory.jsx";
import inputClass from "../../ui/constant/InputClass.jsx";
import {TbDimensions, TbWeight} from "react-icons/tb";
import {MdDiscount} from "react-icons/md";

const UpdateArticleForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { categories, readAllCategoryAPIRequest} = useCategory();
    const { updateArticleAPIRequest, readOneArticleAPIRequest, articleById, apiErrors, apiSuccess, loading, requestLoading} = useArticle();
    const { id } = useParams();

    useEffect(() => {
        readAllCategoryAPIRequest()
    }, []);
    useEffect(() => {
        readOneArticleAPIRequest(id);
    }, [id]);

    const onSubmit = (data) => {
        updateArticleAPIRequest(data, id);
    }

    const {TextInputClass, NumberInputClass, TextAreaClass, FileInputClass, SelectInputClass} = inputClass();

    return (
        <>
            {!loading ?
                <div>
                    {articleById && categories && categories.length > 0 &&
                        <PictureNextToForm pictureURL={articleById.picture}
                                           pictureName={articleById.name}
                        >
                            <FormCRUD action={handleSubmit(onSubmit)}
                                      buttonName={"Confirm Changes"}
                                      apiErrors={apiErrors}
                                      apiSuccess={apiSuccess}
                                      loading={requestLoading}
                            >
                                <FieldGroup>

                                    <Field Icons={HiShoppingCart} labelName={"Name"} errorsType={errors.name}>
                                        <input
                                            type="text"
                                            className={TextInputClass({error: errors.name})}
                                            placeholder="Name"
                                            defaultValue={articleById.name}
                                            {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: "Name is required"
                                                },
                                                minLength: {
                                                    value: 1,
                                                    message: "Name must be at least 1 characters long"
                                                },
                                                maxLength: {
                                                    value: 60,
                                                    message: "Name must not be longer than 60 characters"
                                                }
                                            })}
                                        />
                                    </Field>

                                    <Field Icons={HiCurrencyDollar} labelName={"Price"} errorsType={errors.price} >
                                        <input type="number" min="0.00" max="999999.99" step="0.01"
                                               defaultValue={articleById.price}
                                               placeholder="Price"
                                               className={NumberInputClass({error: errors.price})}
                                               {...register("price", {
                                                   required: {
                                                       value: true,
                                                       message: "Price is required"
                                                   },
                                                   min: {
                                                       value: 0,
                                                       message: "Price must be at least 0"
                                                   },
                                                   max: {
                                                       value: 999999.99,
                                                       message: "Price must not be longer than 999999.99"
                                                   },
                                                   pattern: {
                                                       value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                                       message: "Price must be a number"
                                                   }
                                               })}
                                        />
                                    </Field>
                                </FieldGroup>

                                <Field Icons={HiPhotograph} labelName={"Picture"} >
                                    <input type="file"
                                           placeholder="picture"
                                           className={FileInputClass()}
                                           {...register("picture", {})}
                                    />
                                </Field>

                                <FieldGroup>
                                    <Field Icons={TbDimensions} labelName={"Width"} errorsType={errors.width} >
                                        <input type="number" min="0.00" max="999.99" step="0.01"
                                               placeholder="Width"
                                               defaultValue={articleById.width}
                                               className={NumberInputClass({error: errors.width})}
                                               {...register("width", {
                                                   required: {
                                                       value: true,
                                                       message: "Width is required"
                                                   },
                                                   min: {
                                                       value: 0,
                                                       message: "Width must be at least 0"
                                                   },
                                                   max: {
                                                       value: 999.99,
                                                       message: "Width must not be longer than 999.99"
                                                   },
                                               })}
                                        />
                                    </Field>
                                    <Field Icons={TbDimensions} labelName={"Height"} errorsType={errors.height} >
                                        <input type="number" min="0.00" max="999.99" step="0.01"
                                               placeholder="Height"
                                               defaultValue={articleById.height}
                                               className={NumberInputClass({error: errors.height})}
                                               {...register("height", {
                                                   required: {
                                                       value: true,
                                                       message: "Height is required"
                                                   },
                                                   min: {
                                                       value: 0,
                                                       message: "Height must be at least 0"
                                                   },
                                                   max: {
                                                       value: 999.99,
                                                       message: "Height must not be longer than 999.99"
                                                   },
                                               })}
                                        />
                                    </Field>
                                </FieldGroup>

                                <FieldGroup>
                                    <Field Icons={TbDimensions} labelName={"Length"} errorsType={errors.length} >
                                        <input type="number" min="0.00" max="999.99" step="0.01"
                                               placeholder="Length"
                                               defaultValue={articleById.length}
                                               className={NumberInputClass({error: errors.length})}
                                               {...register("length", {
                                                   required: {
                                                       value: true,
                                                       message: "Length is required"
                                                   },
                                                   min: {
                                                       value: 0,
                                                       message: "Length must be at least 0"
                                                   },
                                                   max: {
                                                       value: 999.99,
                                                       message: "Length must not be longer than 999.99"
                                                   },
                                               })}
                                        />
                                    </Field>
                                    <Field Icons={TbWeight} labelName={"Weight"} errorsType={errors.weight} >
                                        <input type="number" min="0.00" max="999.99" step="0.01"
                                               placeholder="Weight"
                                               defaultValue={articleById.weight}
                                               className={NumberInputClass({error: errors.weight})}
                                               {...register("weight", {
                                                   required: {
                                                       value: true,
                                                       message: "Weight is required"
                                                   },
                                                   min: {
                                                       value: 0,
                                                       message: "Weight must be at least 0"
                                                   },
                                                   max: {
                                                       value: 999.99,
                                                       message: "Weight must not be longer than 999.99"
                                                   },
                                               })}
                                        />
                                    </Field>
                                </FieldGroup>

                                <Field Icons={HiMenuAlt2} labelName={"Description"} errorsType={errors.description} >
                                    <textarea placeholder={"Description"}
                                              defaultValue={articleById.description}
                                              className={TextAreaClass({error: errors.description})}
                                              {...register("description", {
                                                  required: {
                                                      value: true,
                                                      message: "Description is required"
                                                  },
                                                  minLength: {
                                                      value: 1,
                                                      message: "Description must be at least 1 characters long"
                                                  },
                                              })}
                                    />
                                </Field>

                                <FieldGroup>
                                    <Field Icons={MdDiscount} labelName={"Discount"} errorsType={errors.discount} >
                                        <input type="number" min="0" max="100" step="1"
                                               placeholder="Discount"
                                               defaultValue={articleById.discount}
                                               className={NumberInputClass({error: errors.discount})}
                                               {...register("discount", {
                                                   required: {
                                                       value: true,
                                                       message: "Discount is required"
                                                   },
                                                   min: {
                                                       value: 0,
                                                       message: "Discount must be at least 0"
                                                   },
                                                   max: {
                                                       value: 999.99,
                                                       message: "Discount must not be longer than 100"
                                                   },
                                               })}
                                        />
                                    </Field>
                                    <Field isToggleInput={true} Icons={HiThumbUp} labelName={"Recommended"} errorsType={errors.recommended} >
                                        <input type="checkbox" defaultChecked={articleById.recommended} className="toggle toggle-lg toggle-success"
                                               {...register("recommended", {})}
                                        />
                                    </Field>
                                </FieldGroup>

                                <FieldGroup>
                                    {/*<Field Icons={HiCube} labelName={"Stock"} errorsType={errors.stock} >*/}
                                    {/*    <input type="number" min="0" max="999" step="1"*/}
                                    {/*           placeholder="Stock"*/}
                                    {/*           defaultValue={articleById.stock}*/}
                                    {/*           className={NumberInputClass({error: errors.stock})}*/}
                                    {/*           {...register("stock", {*/}
                                    {/*               required: {*/}
                                    {/*                   value: true,*/}
                                    {/*                   message: "Stock is required"*/}
                                    {/*               },*/}
                                    {/*               min: {*/}
                                    {/*                   value: 0,*/}
                                    {/*                   message: "Stock must be at least 0"*/}
                                    {/*               },*/}
                                    {/*               max: {*/}
                                    {/*                   value: 999,*/}
                                    {/*                   message: "Stock must not be longer than 999"*/}
                                    {/*               },*/}
                                    {/*               pattern: {*/}
                                    {/*                   value: /^[0-9]+$/,*/}
                                    {/*                   message: "Stock must be an integer number"*/}
                                    {/*               }*/}
                                    {/*           })}*/}
                                    {/*    />*/}
                                    {/*</Field>*/}
                                    <Field Icons={HiTrendingUp} labelName={"State"} errorsType={errors.stock_state} >
                                        <select defaultValue={articleById.stock_state}
                                                className={SelectInputClass({error: errors.stock_state})}
                                                {...register("stock_state", {
                                                    required: {
                                                        value: true,
                                                        message: "State is required"
                                                    },
                                                })}>
                                            <option disabled={true} value={""}>Select a state</option>
                                            <option value={"In Stock"}>In Stock</option>
                                            <option value={"Out of Stock"}>Out of Stock</option>
                                            <option value={"Pre-Order"}>Pre-Order</option>
                                        </select>
                                    </Field>
                                </FieldGroup>


                                <Field Icons={HiViewGridAdd} labelName={"Subcategory"} errorsType={errors.subcategory_id} >
                                    <select defaultValue={articleById.subcategory_id}
                                            className={SelectInputClass({error: errors.subcategory_id})}
                                            {...register("subcategory_id", {
                                                required: {
                                                    value: true,
                                                    message: "Subcategory is required"
                                                },
                                            })}>
                                        <option disabled={true} value={""}>Select Subcategory</option>
                                        {categories.map((category) => (
                                            <optgroup key={category.id} label={category.name}>
                                                {category.subcategories.map((subCategory) => (
                                                    <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </Field>
                            </FormCRUD>
                        </PictureNextToForm>
                    }
                </div>
                : <LoadingSpinner/>
            }
        </>
    );
};

export default UpdateArticleForm;