import CartWidget from "./navItems/CartWidget.jsx";
import Profile from "./navItems/Profile.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../services/context/AuthContext.jsx";
import {HiCog, HiHome, HiLockClosed, HiOutlineMenuAlt1, HiViewGrid} from "react-icons/hi";
import {Link, useLocation} from "react-router-dom";
import Megazord from "../../assets/megazord.svg";
import Sound from "../../assets/powerrangers.mp3";

const Header = () => {

    const { isAdmin, isLoggedIn } = useContext(AuthContext);
    const location = useLocation();
    const currentPath = location.pathname;

    const [isPlaying, setIsPlaying] = useState(false);
    const [red, setRed] = useState(false);
    const [blue, setBlue] = useState(false);
    const [green, setGreen] = useState(false);
    const [yellow, setYellow] = useState(false);
    const [pink, setPink] = useState(false);

    const powerRangers = () => {
        if (isPlaying) return;
        const audio = new Audio(Sound);
        audio.play().then(() => {
            setIsPlaying(true);
            console.log("Audio played successfully");
        }).catch((error) => {
            console.error("Error playing audio: ", error);
        });

        setTimeout(() => {
            setRed(true);
        }, 100);
        setTimeout(() => {
            setBlue(true);
        }, 300);
        setTimeout(() => {
            setGreen(true);
        }, 600);
        setTimeout(() => {
            setYellow(true);
        }, 1000);
        setTimeout(() => {
            setPink(true);
        }, 1300);

        setTimeout(() => {
            setRed(false);
            setBlue(false);
            setGreen(false);
            setYellow(false);
            setPink(false);
            setIsPlaying(false);
        }, 2000);
    }

    return (
        <div className="navbar justify-between px-6 max-lg:px-2 h-[6rem]">
            <div className="navbar-start gap-2">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <HiOutlineMenuAlt1 className={"text-3xl"} />
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[40] p-2 shadow-md border-[1px] border-base-300 bg-gradient-to-t from-base-200 to-base-300 rounded-box w-52">
                        <li className={"mb-1"}>
                            <Link to="/" className={"py-2 gap-2 items-end"}>
                                <HiHome className={"text-lg"}/>
                                <p className={"text-xs font-semibold uppercase"}>Home</p>
                            </Link>
                        </li>
                        <li className={"mb-1"}>
                            <Link to="/categories" className={"py-2 gap-2 items-end"}>
                                <HiViewGrid className={"text-lg"}/>
                                <p className={"text-xs font-semibold uppercase"}>Categories</p>
                            </Link>
                        </li>
                        {isLoggedIn &&
                            <li className={`${isAdmin() ? "mb-1" : ""}`}>
                                <Link to="/dashboard" className={"py-2 gap-2 items-center"}>
                                    <HiCog className={"text-lg"}/>
                                    <p className={"text-xs font-semibold uppercase"}>Dashboard</p>
                                </Link>
                            </li>
                        }
                        {isAdmin() &&
                            <li>
                                <Link to="/admin" className={"py-2 gap-2 items-end"}>
                                    <HiLockClosed className={"text-lg"}/>
                                    <p className={"text-xs font-semibold uppercase"}>Admin Dashboard</p>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
                <div className={"flex items-center max-lg:hidden"}>
                    <img src={Megazord} alt="logo" className={`h-[3.5rem] ${isPlaying && "animate-spin"}`}/>
                    <button onClick={powerRangers} className="text-3xl px-6 font-black text-white">
                        <span className={`transition-power ${red && "text-red-500 drop-shadow-[0px_0px_10px_rgba(255,0,0,1)] text-4xl"}`}>M</span>
                        <span className={`transition-power ${blue && "text-blue-600 drop-shadow-[0px_0px_10px_rgba(0,0,255,1)] text-4xl"}`}>EG</span>
                        <span className={`transition-power ${green && "text-green-400 drop-shadow-[0px_0px_10px_rgba(0,255,0,1)] text-4xl"}`}>AZ</span>
                        <span className={`transition-power ${yellow && "text-yellow-300 drop-shadow-[0px_0px_10px_rgba(255,255,0,1)] text-4xl"}`}>O</span>
                        <span className={`transition-power ${pink && "text-pink-400 drop-shadow-[0px_0px_10px_rgba(255,100,255,1)] text-4xl"}`}>RD</span>
                    </button>
                </div>
            </div>

            <div className={"navbar-center lg:hidden"}>
                <div className={"flex items-center"}>
                    <img src={Megazord} alt="logo" className={`h-[3.5rem] ${isPlaying && "animate-spin"}`}/>
                    <button onClick={powerRangers} className="text-3xl px-6 font-black text-white max-sm:hidden">
                        <span className={`transition-power ${red && "text-red-500 drop-shadow-[0px_0px_10px_rgba(255,0,0,1)] text-4xl"}`}>M</span>
                        <span className={`transition-power ${blue && "text-blue-600 drop-shadow-[0px_0px_10px_rgba(0,0,255,1)] text-4xl"}`}>EG</span>
                        <span className={`transition-power ${green && "text-green-400 drop-shadow-[0px_0px_10px_rgba(0,255,0,1)] text-4xl"}`}>AZ</span>
                        <span className={`transition-power ${yellow && "text-yellow-300 drop-shadow-[0px_0px_10px_rgba(255,255,0,1)] text-4xl"}`}>O</span>
                        <span className={`transition-power ${pink && "text-pink-400 drop-shadow-[0px_0px_10px_rgba(255,100,255,1)] text-4xl"}`}>RD</span>
                    </button>
                </div>
            </div>

            <div className="navbar-center max-lg:hidden">
                <div className="flex px-1 gap-2">
                    <Link to="/" className={`btn border-none normal-case ${currentPath === "/" ? "bg-base-300" : "bg-transparent"}`}>
                        <HiHome className={"text-xl"}/>
                        Home
                    </Link>
                    <Link to="/categories" className={`btn border-none normal-case ${currentPath.startsWith("/categories") ? "bg-base-300" : "bg-transparent"}`}>
                        <HiViewGrid className={"text-xl"}/>
                        Categories
                    </Link>
                    {isLoggedIn &&
                        <Link to="/dashboard" className={`btn border-none normal-case ${currentPath.startsWith("/dashboard") ? "bg-base-300" : "bg-transparent"}`}>
                            <HiCog className={"text-xl"}/>
                            Dashboard
                        </Link>
                    }
                    {isAdmin() &&
                        <Link to="/admin" className={`btn border-none normal-case ${currentPath.startsWith("/admin") ? "bg-base-300" : "bg-transparent"}`}>
                            <HiLockClosed className={"text-xl"}/>
                            Admin Dashboard
                        </Link>
                    }
                </div>
            </div>
            <div className="navbar-end gap-4 max-md:w-[50%] lg:w-64 xl:w-[50%]">
                <CartWidget />
                <Profile />
            </div>
        </div>
    );
};

export default Header;