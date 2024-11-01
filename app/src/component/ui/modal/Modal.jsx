import {useContext, useEffect, useState} from 'react';
import {HiX} from "react-icons/hi";
import {AuthContext} from "../../../services/context/AuthContext.jsx";

const Modal = ({children, closeButton = true, buttonClassName, buttonText, modalClassName, isAuthModal}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const {isLoggedIn} = useContext(AuthContext);

    useEffect(() => {
        isOpen
            ? document.body.classList.add('overflow-hidden')
            : document.body.classList.remove('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    useEffect(() => {
        if (isAuthModal && isLoggedIn) {
            setTimeout(() => {
                handleCloseModal();
            }, 1000);
        }
    }, [isLoggedIn]);

    const handleOpenModal = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsOpen(true);
        }, 10);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
        setTimeout(() => {
            setIsAnimating(false);
        }, 300)
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <>
            {isAuthModal
                ? !isLoggedIn && <button onClick={handleOpenModal} className={`${buttonClassName}`}>{buttonText}</button>
                : <button onClick={handleOpenModal} className={`${buttonClassName}`}>{buttonText}</button>
            }
            {isAnimating &&
                <div className={`backdrop-blur-sm bg-base-100 bg-opacity-40 fixed top-0 left-0 w-full h-screen z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                    <div className={`flex h-full justify-center items-center transition-transform duration-300 ${isOpen ? "translate-y-0 scale-100" : "translate-y-12 scale-75"}`}>
                        <div className={`w-11/12 max-w-2xl p-6 rounded-2xl shadow-2xl ${modalClassName}`}>
                            {closeButton &&
                                <div className={"flex justify-end"}>
                                    <button onClick={handleCloseModal} className="absolute btn btn-circle btn-sm btn-outline">
                                        <HiX className={"text-lg"} />
                                    </button>
                                </div>
                            }
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;
