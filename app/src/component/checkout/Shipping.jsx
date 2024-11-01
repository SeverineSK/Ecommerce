import ShippingForm from './ShippingForm.jsx'
import ShippingOptions from './ShippingOptions.jsx'
import useCheckout from '../../services/hook/useCheckout.jsx';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../services/context/AuthContext.jsx';

function Shipping({setSelectedRate, setAddress, address}) {

    const { getRates, apiErrors, apiSuccess, requestLoading, rates } = useCheckout();
    const [rememberMe, setRememberMe] = useState(false);
    const [open, setOpen] = useState(true);
    const {cart} = useContext(AuthContext);

    const onSubmit = (data) => {

        const addressForEasypost = {
            "address": data,
            "remember_me": rememberMe,
            "cart": cart,

        }

        getRates(addressForEasypost).then(() => {
            // setOpen(false)
            setAddress(data);
        });
        
    }
    return (
        <div className={"flex gap-2 max-md:flex-col"}>
            <div className={"w-full"}>
                <ShippingForm onSubmit={onSubmit}
                              apiErrors={apiErrors}
                              apiSuccess={apiSuccess}
                              requestLoading={requestLoading}
                              rates={rates}
                              setOpen={setOpen}
                              open={open}
                              address={address}
                >

                    <div className="flex">
                        <input type="checkbox"
                               name='remember_me'
                               checked={rememberMe}
                               onChange={() => {setRememberMe(!rememberMe)}}
                               className={`checkbox checkbox-sm checkbox-primary`}
                        />
                        <span className="ml-2">Remember me</span>
                    </div>

                </ShippingForm>
            </div>
            {Array.isArray(rates) &&
                <div className={"pl-4 w-1/2 max-md:w-full max-md:px-0 max-md:pt-4 rounded-lg"}>
                    <ShippingOptions rates={rates}
                                     setSelectedRate={setSelectedRate}
                    />
                </div>
            }
        </div>
    )
}

export default Shipping