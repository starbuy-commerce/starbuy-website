import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import addToCart from '../../images/add-to-cart.svg';
import buyNow from '../../images/buy-now.svg';
import { useCookies } from "react-cookie";

type Props = {
    img: string,
    formated: string,
    price: number,
    delivery: string,
    description: string
}

const proxy = 'https://blooming-coast-08475.herokuapp.com/'

export default function Item() {

    const {id} = useParams();

    const [imagem, setImagem] = useState<string>("")
    const [preco, setPreco] = useState<number>(0)
    const [description, setDesc] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [cookies, setCookie] = useCookies();
    
    useEffect(() => {
        fetch(proxy + 'https://tcc-web-api.herokuapp.com/item/' + id + "?reviews=true", {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then(response => response.json())
        .then(json => {
            setTitle(json.item.item.title)
            setImagem(json.item.assets[0]);
            setPreco(json.item.item.price);
            setDesc(json.item.item.description);
        })
        .catch(err => console.log(err))
    }, [])

    function postCart() {
        fetch(proxy + 'https://tcc-web-api.herokuapp.com/cart/', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Authorization:': "Bearer " + cookies.access_token
            },
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            setTitle(json.item.item.title)
            setImagem(json.item.assets[0]);
            setPreco(json.item.item.price);
            setDesc(json.item.item.description);
        })
        .catch(err => console.log(err))
    }

    return ( 
        
        <div>
            <Navbar fixed={true} bottomBar={true}/>
            <div className="mt-28 bg-yellow-100 p-5">
                <div className="flex p-5 bg-white rounded-lg">
                    <div className="w-2/6 rounded-lg border-yellow-400 ml-12 mr-12">
                        <img src={imagem} className="p-4"/>
                    </div>
                    <div className="w-3/6">
                    <p className="text-2xl font-inter font-semibold ml-2 mr-2 text-gray-800">{title}</p>
                        <p className="font-inter text-4xl font-normal text-gray-800 static mt-8 ml-2">R$ {preco.toFixed(2)}</p>
                        <div className="flex">
                            <div className="w-1/2">
                                <p className="text-sm font-inter font-semibold mt-2 ml-2 mr-2 text-gray-800">Estimativa de entrega: Seila</p>
                            </div>
                        </div>

                        <p className="text-md font-inter text-justify mt-8 ml-2 mr-2 text-gray-800">{description}</p>
                        <div className="float-right flex mt-6">
                            <div onClick={postCart} className="mr-4 text-sm font-inter font-semibold bg-transparent text-indigo-500 py-2 px-3 border border-indigo-500 rounded hover:cursor-pointer">
                                <div className="flex">
                                    <img src={addToCart} alt="" />
                                    <span className="ml-2">Adicionar ao carrinho</span>
                                </div>
                            </div>
                            <div className="text-sm font-inter font-semibold bg-transparent text-indigo-500 py-2 px-3 border border-indigo-500 rounded hover:cursor-pointer">
                                <div className="flex">
                                    <img src={buyNow} alt="" />
                                    <span className="ml-2">Comprar agora</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}