import {useState} from "react";

function ShippingOptions({rates, setSelectedRate}) {

    const [selected, setSelected] = useState({});

    const handleSelectRate = (rate) => {
        setSelectedRate(rate);
        setSelected({[rate.id]: true});
    }

    return (
        <div className={"flex flex-col h-[35rem] overflow-y-scroll gap-3"}>
            {Array.isArray(rates) && rates.length > 0 ? rates.map((rate) => (
                <div key={rate.id}
                     onClick={() => handleSelectRate(rate)}
                     className={`gap-2 border-2 border-base-300 hover:border-primary ${selected[rate.id] && "border-primary"} p-4 flex flex-col w-full justify-between bg-transparent rounded-xl transition cursor-pointer`}
                >

                    <div className={"flex justify-between"}>
                        <div>
                            <h2 className="text-xs font-semibold text-gray-400 uppercase">Carrier</h2>
                            <p className="text-md font-semibold">{rate.carrier}</p>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-gray-400 uppercase">Price</div>
                            <p className={"text-md font-semibold"}>
                                <span className={"mr-1 text-success"}>$</span>
                                {rate.rate}
                            </p>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xs font-semibold text-gray-400 uppercase">Service</h2>
                        <p className="text-md font-semibold">{rate.service}</p>
                    </div>


                </div>

            )) : null}
        </div>

    )
}

export default ShippingOptions;