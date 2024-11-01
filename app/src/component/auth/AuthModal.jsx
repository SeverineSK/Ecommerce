import {useState} from 'react';
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import Modal from "../ui/modal/Modal.jsx";

const AuthModal = () => {

    const [changeForm, setChangeForm] = useState(false);
    const handleChangeForm = () => {
        setChangeForm(!changeForm);
    }

    return (
        <Modal buttonText={"Sign In"}
               buttonClassName={"btn btn-active"}
               modalClassName={"bg-gradient-to-br from-base-100 to-base-200"}
               isAuthModal={true}
        >
            {!changeForm
                ? <LoginForm />
                : <RegisterForm />
            }

            <div>
                <div className={"flex justify-center my-2"}>
                    <span className={"text-gray-400 mr-2"}>{changeForm ? "Already have an account?" : "No account?"}</span>
                    <button onClick={() => handleChangeForm()}
                            className={`link link-primary`}>
                        {changeForm ? "Sign In" : "Sign Up"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AuthModal;