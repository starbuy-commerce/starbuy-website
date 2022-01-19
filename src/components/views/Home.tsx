import CategoryButton from "../CategoryButton";
import Navbar from "../Navbar";
import ProductCard from "../ProductCard";
import tech from "../../images/category/tech.svg"
import clothes from "../../images/category/clothes.svg"
import books from "../../images/category/books.svg"
import home from "../../images/category/home.svg"
import guitarLogo from "../../images/category/guitar.svg"
import bass from "../../images/test/bass.jpg"
import ampli from "../../images/test/ampli.jpg"
import guitar from "../../images/test/guitar.jpg"
import notebook from "../../images/test/notebook.png"
import { useState, useEffect } from "react";

interface User {
    username: string,
    email: string,
    name: string,
    registration: string,
    birthdate: string,
    cellphones: Array<string>,
    seller: boolean,
    gender: number
}

interface Item {
    identifier: string,
    seller: User,
    title: string,
    price: number,
    stock: number,
    category: number,
    tags: Array<string>,
    images: Array<string>
}

const proxy = 'https://blooming-coast-08475.herokuapp.com/'

const Home = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(proxy + 'http://localhost:9000/products', {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => response.json())
        .then(json => {
            console.log("uwu")
            setItems(json);
            console.log(json);
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <>
            <Navbar fixed={true} />
            <div className="mt-28">
                <div className="flex gap-6 justify-center">
                    <CategoryButton img={tech} size="w-10 h-10" category="Eletrônico" />
                    <CategoryButton img={clothes} size="w-10 h-10" category="Vestuário" />
                    <CategoryButton img={books} size="w-8 h-8" category="Livros" />
                    <CategoryButton img={guitarLogo} size="w-8 h-8" category="Música" />
                    <CategoryButton img={home} size="w-8 h-8" category="Casa" />
                </div>

                <div className="flex gap-6 flex-wrap md:pr-24 md:pl-24 md:gap-y-7 mt-12 justify-center">
                    {items.map(item => {
                        alert(item)
                        let product: Item = JSON.parse(item);
                    })}
                    <ProductCard img={bass} name="Contrabaixo Fender 032 8900 Squier Modified Jaguar Bass 538" price={2899.00} />
                    <ProductCard img={ampli} name="AMPLIFICADOR COMBO FENDER MUSTANG I V2 8 POL 20W RMS C/ EFEITO" price={1890.00} />
                    <ProductCard img={guitar} name="Fender Classic Series '72 Telecaster Thinline Electric Guitar Natural" price={1230.00} />
                    <ProductCard img={notebook} name="ASUS ROG Zephyrus S17 (2020) Laptop para jogos, 17,3' 300Hz IPS Type FHD, NVIDIA GeForce RTX 2080S, Intel Core i7-10875H, 32GB DDR4, 1TB PCIe SSD, Per-Key RGB KB, Thunderbolt 3, Windows 10, GX701LXS-XS78" price={59340.00} />
                </div>
            </div>
        </>
    );
}

export default Home;