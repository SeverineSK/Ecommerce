import {FaUserCircle} from "react-icons/fa";
import {useContext} from "react";
import {AuthContext} from "../../../services/context/AuthContext.jsx";
import useAuth from "../../../services/hook/useAuth.jsx";
import AuthModal from "../../auth/AuthModal.jsx";
import {Link} from "react-router-dom";
import {FiLogOut} from "react-icons/fi";
import {FaUser} from "react-icons/fa6";
const Profile = () => {

    const {user, isLoggedIn} = useContext(AuthContext);

    const {logoutAPIRequest} = useAuth();

    return (
        <>
            {isLoggedIn &&
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-circle btn-active">
                        <FaUserCircle className={"text-3xl"}/>
                    </label>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[40] p-2 shadow-md border-[1px] border-base-300 bg-gradient-to-t from-base-200 to-base-300 rounded-box w-52">
                        <p className={"text-sm mt-3 mx-2"}>Hello, <span className={"text-primary font-semibold uppercase"}>{user.name}</span></p>

                        <div className={"w-full h-[1px] bg-white opacity-5 my-2"}></div>

                        <li className={"mb-1"}>
                            <Link to={"/dashboard/profile"} className={"py-2"}>
                                <FaUser className={"text-sm mr-1 ml-[0.5px]"}/>
                                <p>Profile</p>
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => logoutAPIRequest()} className={"py-2 hover:bg-error hover:text-error-content"}>
                                <FiLogOut className={"text-lg"}/>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            }
            <AuthModal />
        </>
    );
};

export default Profile;