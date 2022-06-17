import React, { useState } from "react"

export default function QuantityController({ initial }: any) {

    const [quantity, setQuantity] = useState(initial)

    function less(quantity: number) {
        if (quantity <= 1) {
            return;
        }
        setQuantity(quantity - 1);
    }

    function increase(quantity: number) {
        setQuantity(quantity + 1);
    }

    return (
        <div className="flex">
            <div onClick={(e) => less(1)} className="hover:cursor-pointer hover:bg-slate-200 flex justify-center w-8 h-8 border-t-[1px] border-l-[1px] border-b-[1px] border-gray-700 rounded-tl-md rounded-bl-md">
                <div className="my-auto">
                    <svg className="fill-slate-500" width="12" height="12" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z" /></svg>
                </div>
            </div>
            <div className="flex justify-center w-8 h-8 border-[1px] border-gray-700">
                <p className="my-auto">{quantity}</p>
            </div>
            <div onClick={(e) => increase(1)} className="hover:cursor-pointer hover:bg-slate-200 flex justify-center w-8 h-8 border-t-[1px] border-r-[1px] border-b-[1px] border-gray-700 rounded-tr-md rounded-br-md">
                <div className="my-auto">
                    <svg className="fill-slate-500" width="12" height="12" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
                </div>
            </div>
        </div>
    );
}