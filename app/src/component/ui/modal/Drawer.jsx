import {useEffect, useState} from "react";
import {HiX} from "react-icons/hi";
import {useLocation} from "react-router-dom";

const Drawer = ({buttonText, buttonClass, title, children}) => {

    const [isDrawerShowed, setIsDrawerShowed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const location = useLocation();

    useEffect(() => {
        isDrawerShowed
            ? document.body.classList.add('overflow-hidden')
            : document.body.classList.remove('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isDrawerShowed]);

    useEffect(() => {
        if (isDrawerShowed && location.pathname !== "/") {
            handleCloseDrawer();
        }
    }, [location]);

    const handleOpenDrawer = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsDrawerShowed(true);
        }, 10);
    }

    const handleCloseDrawer = () => {
        setIsDrawerShowed(false);
        setTimeout(() => {
            setIsAnimating(false);
        }, 300)
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                handleCloseDrawer();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);



    return (
        <>
            <button onClick={handleOpenDrawer} className={buttonClass}>{buttonText}</button>
            {isAnimating &&
                <div className={`backdrop-blur-sm bg-base-100 bg-opacity-40 fixed top-0 left-0 w-full h-screen z-[99] transition-opacity duration-300 ${isDrawerShowed ? "opacity-100" : "opacity-0"}`}></div>
            }
            <div className={`fixed w-96 max-sm:w-full p-4 ${isDrawerShowed ? "translate-x-0 sm:border-l-2 sm:border-base-300" : "translate-x-full"} backdrop-blur-xl bg-base-100 bg-opacity-80 h-full top-0 right-0 z-[99] transition-transform`}>

                <div className={"flex flex-col w-full h-full"}>
                    <div className={"flex items-center justify-between"}>
                        <h1 className={"text-2xl font-bold"}>{title}</h1>
                        <button onClick={handleCloseDrawer} className="btn btn-sqaure btn-outline">
                            <HiX className={"text-lg"} />
                        </button>
                    </div>
                    {children}
                </div>

            </div>
        </>
    );
};

export default Drawer;