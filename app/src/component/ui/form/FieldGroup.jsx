const FieldGroup = ({children}) => {
    return (
        <div className={"flex gap-6 max-sm:flex-col max-sm:gap-3"}>
            {children}
        </div>
    );
};

export default FieldGroup;