//Paulao e Vasco

// A página está vazia, eu sei! Vou deixar pra modelar dps, to pensando exatamente qual é a melhor maneira de fazer pra q aparece + de um produto
// Acho q teria q pegar o User, contar quantos produtos tem e fazer um if com o CartCard pra aparecer todos, se algm tiver outra ideia deixa aq :)
//- Vasco

import CartCard from "../CartCard";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import path from "path/posix";


type Props = {
    img: string,
    name: string,
    price: number
}

const proxy = 'https://blooming-coast-08475.herokuapp.com/'

const CarrinhoDeCompra = () => {

    const [item, setItem] = useState<any>({})
    const [imagem, setImg] = useState<string>("")
    const [price, setPrice] = useState<number>(0)

    useEffect(() => {
        fetch(proxy + '45.132.242.171:9000/cart' + path, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then(response => response.json())
        .then(json => {
            setImg(json.images[0])
            setPrice(json.price)
        }).catch(err => console.log(err)) 
    }, [])

    return ( 
        <div>

        </div>
    )
}

export default CarrinhoDeCompra