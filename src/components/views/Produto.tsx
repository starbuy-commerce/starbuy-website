import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

type Props = {
    img: string,
    formated: string,
    price: number,
    delivery: string,
    description: string
}

const proxy = 'https://blooming-coast-08475.herokuapp.com/'

const Produto = () => {

    const {id} = useParams();

    const [imagem, setImagem] = useState<string>("")
    const [preco, setPreco] = useState<number>(0)
    const [description, setDesc] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    
    useEffect(() => {
        fetch(proxy + 'https://tcc-web-api.herokuapp.com/item/' + id, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then(response => response.json())
        .then(json => {
            setImagem(json.assets[0]);
            setPreco(json.item.price);
            setDesc(json.item.description);
        })
        .catch(err => console.log(err))
    }, [])

    return ( 
        
        <div>
            <Navbar fixed={true} bottomBar={true}/>
            <div className="mt-20 ml-5">
                <p className="text-2xl  font-inter font-bold mt-2 ml-2 mr-2 text-gray-800">{title}</p>
                <div className="flex">
                <div className="w-2/6">
                    <img src={imagem} className="p-4 h-full"/>
                    </div>
                    <div className="w-3/6">
                        <p className="font-inter text-4xl font-bold text-violet-900 static mt-4 ml-2">R$ {preco.toFixed(2)}</p>
                        <div className="flex">
                            <div className="w-1/2">
                                <p className="text-sm font-inter font-semibold mt-2 ml-2 mr-2 text-gray-800">Estimativa de entrega: Seila</p>
                            </div>
                            <div className="w-1/2 text-left">
                                <button className="text-sm font-inter font-semibold bg-transparent hover:bg-yellow-500 text-yellow-500  hover:text-white py-2 px-3 border border-yellow-500 hover:border-transparent rounded">Adicionar ao carrinho</button>
                            </div>
                        </div>

                        <p className="text-md font-inter text-justify mt-2 ml-2 mr-2 text-gray-800">{description}</p>
                    </div>

                    <div className="w-1/6">
                        <br></br>
                        <br></br>
                        <br></br>
                        <p className="text-md font-inter font-bold mt-2 ml-2 mr-2 text-gray-800"></p>
                    </div>
                </div>
            </div>`

        </div>
    )
}

export default Produto