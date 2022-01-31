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

const Produto = ({delivery, description}: Props) => {

    const {id} = useParams();

    const [item, setItem] = useState<any>({})
    const [imagem, setImg] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    
    useEffect(() => {
        fetch(proxy + '45.132.242.171:9000/item/' + id, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then(response => response.json())
        .then(json => {
            setItem(json)
            setImg(json.images[0])
            setPrice(json.price)
        }).catch(err => console.log(err))
    }, [])

    if(item == undefined || imagem == undefined || price == undefined) {
        return null;
    }

    return ( 
        
        <div>
            <Navbar fixed={true} />
            <div className="mt-20 ml-5">

                {/* Nome do produto */}
                <p className="text-2xl  font-inter font-bold mt-2 ml-2 mr-2 text-gray-800">{item.title}</p>
                <div className="flex">

                <div className="w-2/6">
                    <img src={imagem} className="p-4 h-full"/>  {/* Consertar a altura!!! */}

                    </div>

                    <div className="w-3/6">
                        {/*COMENTARIO DE EXEMPLO*/}
                        <p className="font-inter text-4xl font-bold text-violet-900 static mt-4 ml-2">R$ {price.toFixed(2)}</p>
                       
                        <div className="flex">
                            <div className="w-1/2">
                            {/* Estimativa de entrega */}
                            <p className="text-sm font-inter font-semibold mt-2 ml-2 mr-2 text-gray-800">Estimativa de entrega: {delivery}</p>
                            </div>

                            <div className="w-1/2 text-left">
                            {/* Botão para adicionar no carrinho */}
                            <button className="text-sm font-inter font-semibold bg-transparent hover:bg-yellow-500 text-yellow-500  hover:text-white py-2 px-3 border border-yellow-500 hover:border-transparent rounded">Adicionar ao carrinho</button>
                            </div>
                        </div>

                        {/* Descrição do produto */}
                        <p className="text-md font-inter text-justify mt-2 ml-2 mr-2 text-gray-800">{item.description}</p>
                    </div>

                    <div className="w-1/6">
                        <br></br>
                        <br></br>
                        <br></br>
                        <p className="text-md font-inter font-bold mt-2 ml-2 mr-2 text-gray-800"></p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Produto