
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ItemWithAssets from "../../model/ItemWithAssets";
import CartCard from "../card/CartCard";

const proxy = 'https://blooming-coast-08475.herokuapp.com/'

const Cart = () => {
    const [cookies, setCookie] = useCookies();
    const [cartItems, setCartItems] = useState<any[]>([])

    useEffect(() => {
        fetch(proxy + 'https://tcc-web-api.herokuapp.com/cart', {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Authorization': "Bearer " + cookies.access_token
            },
        })
            .then(response => response.json())
            .then(json => setCartItems(json))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Navbar bottomBar={true} fixed={false} />
            <div className="">
                <div className="font-inter text-[#4A4A4A]">
                    <h1 className="font-inter font-bold text-2xl ml-20 mt-12 mb-12">MEU CARRINHO</h1>
                    {cartItems === null || cartItems === undefined || cartItems.length == 0 
                        ? 
                        <p className="text-lg font-inter font-medium ml-20">Você não tem nenhum item no seu carrinho</p> 
                        : 
                        <div className="overflow-y-auto">
                            {cartItems.map(cartItem => {
                                return (
                                    <CartCard item={cartItem.item as ItemWithAssets} initial={cartItem.quantity}/>
                                );
                        })}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Cart