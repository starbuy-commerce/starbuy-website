import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Navbar from "../Navbar";
import delivery from "../../images/delivery.svg"

const Orders = () => {

    const proxy = 'https://blooming-coast-08475.herokuapp.com/'
    const [cookies, setCookie] = useCookies();
    const [orders, setOrders] = useState([])

    /*useEffect(() => {
        fetch(proxy + 'https://tcc-web-api.herokuapp.com/purchases/', {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Authorization:': "Bearer " + cookies.access_token
            },
        })
        .then(response => response.json())
        .then(json => setOrders(json))
        .catch(err => console.log(err))
    }, [])*/

    return (
        <div className="font-inter text-[#4A4A4A]">
            {/*Teste*/}
            <Navbar bottomBar={false} fixed={false}/>
            <h1 className="font-inter font-bold text-2xl ml-32 mt-12 mb-12">MEUS PEDIDOS</h1>
            <div className="w-3/4 h-2/5 border-[1px] border-yellow-400 mx-auto rounded-lg">
                <div className="flex ">
                    <img className="h-48 w-48 ml-8 my-auto" src="https://images.kabum.com.br/produtos/fotos/114588/teclado-mecanico-gamer-husky-blizzard-rgb-switch-gateron-red-abnt2-rosa-tc-hbl-ro_1619467416_gg.jpg" alt="" />
                    <div className="text-md font-medium ml-10 text-md">
                        <p className="font-bold mr-4 mt-2">Teclado Mecânico Gamer Husky Gaming Blizzard, Rosa, 60%, Switch Gateron Red, ABNT2, RGB - HGMO002 - Comprado em: 22/02/2022</p>
                        <p className="mt-4">Preço: R$ 345.00</p>
                        <p>Quantidade: 1 unidade(s)</p>
                        <p>Endereço de entrega: Trampo</p>
                        <div className="flex mt-4">
                            <p>Status: 
                                <span className="text-green-400 font-bold"> ENVIADO</span>
                            </p>
                            <svg className="w-6 h-6 fill-green-400 ml-2" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M5 11v1h8v-7h-10v-1c0-.552.448-1 1-1h10c.552 0 1 .448 1 1v2h4.667c1.117 0 1.6.576 1.936 1.107.594.94 1.536 2.432 2.109 3.378.188.312.288.67.288 1.035v4.48c0 1.089-.743 2-2 2h-1c0 1.656-1.344 3-3 3s-3-1.344-3-3h-4c0 1.656-1.344 3-3 3s-3-1.344-3-3h-1c-.552 0-1-.448-1-1v-6h-2v-2h7v2h-3zm3 5.8c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm10 0c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm-3-2.8h-10v2h.765c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h5.53c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h1.765v-4.575l-1.711-2.929c-.179-.307-.508-.496-.863-.496h-4.426v6zm1-5v3h5l-1.427-2.496c-.178-.312-.509-.504-.868-.504h-2.705zm-16-3h8v2h-8v-2z"/></svg>
                            <p className="ml-8">Entrega estimada para 22 de abril de 2022</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Orders