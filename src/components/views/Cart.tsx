import Navbar from "../Navbar";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import CartCard from "../card/CartCard";
import {get_cart} from "../../api/cart";
import CartItem from "../../model/CartItem";
import {Skeleton} from "@mui/material";

const Cart = () => {
    const [cookies] = useCookies();
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [received, setReceived] = useState(false)

    useEffect(() => get_cart(cookies.access_token, (resp: CartItem[]) => {
        setReceived(true)
        setCartItems(resp)
    }), [])

    return (
        <div>
            <Navbar bottomBar={true} fixed={false}/>
            <div className="">
                <div className="font-inter text-[#4A4A4A]">
                    <h1 className="font-inter font-bold text-2xl ml-20 mt-12 mb-12">MEU CARRINHO</h1>
                    {received && cartItems.length === 0
                        ?
                        <p className="text-lg font-inter font-medium ml-20">Você não tem nenhum item no seu carrinho</p>
                        : received && cartItems.length > 0 ?
                            <div className="overflow-y-auto">
                                {cartItems.map(cartItem => {
                                    return (
                                        <CartCard item={cartItem.item} initial={cartItem.quantity}/>
                                    );
                                })}
                            </div>
                            :
                            <div className="flex flex-col justify-center gap-y-8">
                                <Skeleton variant="rectangular" className="rounded-lg" animation="wave" width={1200} height={140}/>
                                <Skeleton variant="rectangular" className="rounded-lg" animation="wave" width={1200} height={140}/>
                                <Skeleton variant="rectangular" className="rounded-lg" animation="wave" width={1200} height={140}/>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart