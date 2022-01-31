import CategoryButton from "../CategoryButton";
import Navbar from "../Navbar";
import ProductCard from "../ProductCard";
import tech from "../../images/category/tech.svg"
import clothes from "../../images/category/clothes.svg"
import books from "../../images/category/books.svg"
import home from "../../images/category/home.svg"
import guitarLogo from "../../images/category/guitar.svg"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const proxy = 'https://blooming-coast-08475.herokuapp.com/'

const Home = () => {

    const {category} = useParams();
    const [items, setItems] = useState<any[]>([])

    let path = category == undefined? "items" : "item/category/" + category 

    useEffect(() => {
        fetch(proxy + '45.132.242.171:9000/' + path, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => response.json())
        .then(json => setItems(json))
        .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Navbar fixed={true} />
            <div className="mt-28">
                <div className="flex gap-6 justify-center">
                    <CategoryButton img={tech} size="w-10 h-10" category="Eletrônico" id={1} />
                    <CategoryButton img={clothes} size="w-10 h-10" category="Vestuário" id={2} />
                    <CategoryButton img={books} size="w-8 h-8" category="Livros" id={4}/>
                    <CategoryButton img={guitarLogo} size="w-8 h-8" category="Música" id={7} />
                    <CategoryButton img={home} size="w-8 h-8" category="Casa" id={3} />
                </div>

                <div className="flex gap-6 flex-wrap md:pr-24 md:pl-24 md:gap-y-7 mt-12 justify-center">
                    {items.map(json => {
                        const image: string = json.images[0];
                        return (<ProductCard img={image} name={json.title} price={json.price.toFixed(2)}/>)
                    })}
                </div>
            </div>
        </>
    );
}

export default Home;