import {useEffect, useState} from 'react';
import { HiTrash } from "react-icons/hi";
import {HiX} from "react-icons/hi";

const DeleteButtonAndConfirmBox = (
    {
        item,
        modalName,
        buttonText= "",
        buttonClass = "btn-xs",
        modalClassName,
        deleteApiRequest,
        onAfterDelete,
        closeButton = true,
    }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isDeleted,  setIsDeleted] = useState(false);

    useEffect(() => {
        isOpen
            ? document.body.classList.add('overflow-hidden')
            : document.body.classList.remove('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    const handleOpenModal = () => {
        setSelected(item);
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
    const handleDeleteItem = () => {
        deleteApiRequest(selected.id)
        setIsDeleted(true);
        handleCloseModal();
    }
    useEffect(() => {
        if (!isOpen && !isAnimating && isDeleted) {
            if (onAfterDelete) {
                onAfterDelete();
            }
            setSelected(null);
            setIsDeleted(false);
        }
    }, [isOpen, isAnimating, isDeleted]);

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
            <button onClick={handleOpenModal} className={`btn btn-outline btn-error ${buttonClass}`}>
                <HiTrash className={"text-lg"}/>
                {buttonText}
            </button>

            {isAnimating &&
                <div className={`backdrop-blur-sm bg-base-100 bg-opacity-40 fixed top-0 left-0 w-full h-screen z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                    <div className={`flex h-full justify-center items-center transition-transform duration-300 ${isOpen ? "translate-y-0 scale-100" : "translate-y-12 scale-75"}`}>
                        <div className={`w-11/12 max-w-2xl p-6 rounded-2xl shadow-2xl bg-base-200 ${modalClassName}`}>
                            {closeButton &&
                                <div className={"flex justify-end"}>
                                    <button onClick={handleCloseModal} className="absolute btn btn-circle btn-sm btn-outline">
                                        <HiX className={"text-lg"} />
                                    </button>
                                </div>
                            }
                            {selected && (
                                <>
                                    <div className="badge badge-outline">{modalName} ID: {selected.id}</div>
                                    <div className="divider"></div>
                                    <div className={"flex gap-4"}>
                                        <HiTrash className={"text-6xl text-error"} />
                                        <div>
                                            <h3 className="font-bold text-lg">Are you sure?</h3>
                                            <p className="py-2 text-sm">You will not be able to recover this {modalName}!</p>
                                        </div>
                                    </div>
                                    <div className="modal-action">
                                        <button onClick={handleCloseModal} className="btn">Cancel</button>
                                        <button className="btn btn-error" onClick={handleDeleteItem}>Yes, delete it!</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default DeleteButtonAndConfirmBox;

