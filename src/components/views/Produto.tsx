//Modesto e July
import Navbar from "../Navbar";

type Props = {
    img: string,
    formated: string,
    price: number,
    delivery: string,
    description: string
}

const Produto = ({img, formated, price, delivery, description}: Props) => {
    return ( 
        
        <div>
            <Navbar fixed={true} />
            <div className="mt-20 ml-5">
                {/* Nome do produto */}
                <p className="text-2xl  font-inter font-bold mt-2 ml-2 mr-2 text-gray-800">{formated}</p>
                <div className="flex">
                    <div className="w-2/6">
                    {/* Imagem do produto */}
                    <img src={img} className="p-4 h-full"/>
                    </div>

                    <div className="w-3/6">
                        {/* Preço do produto */}
                        <p className="font-inter text-4xl font-bold text-violet-900 static mt-4 ml-2">R$ {price}</p>
                       
                        <div className="flex">
                            <div className="w-1/2">
                            {/* Estimativa de entrega */}
                            <p className="text-sm font-inter font-semibold mt-2 ml-2 mr-2 text-gray-800">Estimativa de entrega: {delivery}</p>
                            </div>

                            <div className="w-1/2 text-left">
                            {/* Botão para adicionar no carrinho */}
                            <button className="text-sm font-inter font-semibold bg-transparent hover:bg-yellow-500 text-yellow-500  hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">Adicionar ao carrinho</button>
                            </div>
                        </div>

                        {/* Descrição do produto */}
                        <p className="text-md font-inter text-justify mt-2 ml-2 mr-2 text-gray-800">{description}</p>
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