import {useContext, useState} from 'react';
import {FaUserCircle} from "react-icons/fa";
import {HiArrowLeft, HiArrowRight} from "react-icons/hi";
import {AuthContext} from "../../services/context/AuthContext.jsx";
import useAuth from "../../services/hook/useAuth.jsx";
import {Link, Outlet, useLocation} from "react-router-dom";
import {FiLogOut} from "react-icons/fi";
import {FaUser} from "react-icons/fa6";

const Layout = ({children}) => {

    const {user} = useContext(AuthContext);
    const {logoutAPIRequest} = useAuth();
    const location = useLocation();
    const currentPath = location.pathname;
    const [isOpen, setIsOpen] = useState(true);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={"flex"}>
            <div className={`flex flex-col justify-between h-content shadow-2xl`}>
                <div>
                    <div className={"flex justify-between p-2"}>
                        {!isOpen && <Link to={"/dashboard"} className={"btn bg-transparent border-0"}>Dashboard</Link>}
                        <div onClick={() => handleOpen()}>
                            {isOpen
                                ? <div className="tooltip" data-tip="Open">
                                    <button className={"btn bg-transparent"}><HiArrowRight className={"text-xl"}/></button>
                                </div>
                                : <div className="tooltip" data-tip="Close">
                                    <button className={"btn bg-transparent"}><HiArrowLeft className={"text-xl"}/></button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={"flex flex-col p-2 gap-2"}>
                        <Link to={"/dashboard/profile"} className={`btn btn-block border-base-300 justify-start normal-case ${currentPath.startsWith("/dashboard/profile") ? "btn-active" : "bg-transparent"}`}>
                            <FaUser className={"text-xl"}/>{!isOpen && <p className={"mt-[2px]"}>Profile</p>}
                        </Link>
                    </div>
                    {/*Add other links here Paul*/}
                </div>

                <div className={`flex-col w-full p-2`}>
                    <div className={"h-[1px] bg-base-300 my-4"}></div>
                    {!isOpen &&
                        <div className={"flex items-center pb-2"}>
                            <button className="btn btn-circle">
                                <FaUserCircle className={"text-3xl"}/>
                            </button>
                            <div className={"flex flex-col items-start text-xs p-2"}>
                                <p>{user.name}</p>
                                <p className={"break-words w-52"}>{user.email}</p>
                            </div>
                        </div>
                    }
                    <div className={"flex"}>
                        <button className={"btn bg-transparent border-base-300 hover:bg-error hover:text-error-content btn-block justify-start normal-case"} onClick={() => logoutAPIRequest()}>
                            <FiLogOut className={"text-xl"}/>
                            {isOpen ? "" : "Logout"}
                        </button>
                    </div>
                </div>
            </div>
            <div className={"p-6 max-sm:px-3 w-full overflow-auto h-content"}>
                {children ? children : <Outlet />}
            </div>
        </div>
    );
};

export default Layout;