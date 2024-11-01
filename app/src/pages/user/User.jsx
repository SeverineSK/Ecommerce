import {useContext} from "react";
import {AuthContext} from "../../services/context/AuthContext.jsx";

const User = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="flex w-full h-full items-center justify-center">
            <h1 className="tracking-widest text-gray-500 uppercase">Welcome {user.name}</h1>
        </div>
    );
};

export default User;