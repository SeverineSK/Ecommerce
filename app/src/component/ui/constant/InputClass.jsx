const InputClass = () => {

    const TextInputClass = ({error}) => {
        return `w-full input input-sm bg-transparent input-bordered focus:outline-0 focus:ring-2 transition ${error ? "input-error ring-error" : "input-primary ring-primary"}`
    }
    const TextAreaClass = ({error}) => {
        return `w-full textarea bg-transparent textarea-bordered focus:outline-0 focus:ring-2 transition ${error ? "textarea-error ring-error h-[8.4rem]" : "textarea-primary ring-primary h-[6.2rem]"}`
    }

    const TextAreaCommentClass = ({error}) => {
        return `w-full textarea bg-transparent textarea-bordered focus:outline-0 focus:ring-2 transition ${error ? "textarea-error ring-error h-[1rem]" : "textarea-primary ring-primary h-[1rem]"}`
    }

    const NumberInputClass = ({error}) => {
        return `w-full input input-sm bg-transparent input-bordered focus:outline-0 focus:ring-2 transition ${error ? "input-error ring-error" : "input-primary ring-primary"}`
    }

    const FileInputClass = () => {
        return `file-input file-input-sm file-input-bordered file-input-primary bg-transparent focus:outline-0 focus:ring-2 ring-primary transition w-full`
    }

    const SelectInputClass = ({error}) => {
        return `w-full select select-sm select-bordered select-primary bg-transparent focus:outline-0 focus:ring-2 transition ${error ? "select-error ring-error" : "select-primary ring-primary"}`
    }

    return {
        TextInputClass,
        TextAreaClass,
        TextAreaCommentClass,
        NumberInputClass,
        FileInputClass,
        SelectInputClass
    }
};

export default InputClass;