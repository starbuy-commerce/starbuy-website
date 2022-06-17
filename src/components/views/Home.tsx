import CategoryButton from "../button/CategoryButton";
import CategoryDropdown from "../dropdown/CategoryDropdown";
import Navbar from "../Navbar";
import ProductCard from "../card/ProductCard";
import tech from "../../images/category/tech.svg"
import clothes from "../../images/category/clothes.svg"
import books from "../../images/category/books.svg"
import home from "../../images/category/home.svg"
import guitarLogo from "../../images/category/guitar.svg"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { proxied_host } from "../../API"
import Review from "../Review";

const Home = (props: any) => {

    const { category } = useParams();
    const [items, setItems] = useState<any[]>([])
    const { query } = useParams();

    let path = category === undefined && query === undefined
        ? "items" : category !== undefined ? "item/category/" + category
        : query !== undefined ? "item/search/" + query.replaceAll("%20", " ") : "items";

    useEffect(() => {
        fetch(proxied_host + path, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => response.json())
            .then(json => setItems(json))
            .catch(err => console.log(err))
    })

    return (
        <>
            <Navbar fixed={true} bottomBar={true} />
            <div className="mt-32">
                <div className="md:flex gap-6 justify-center hidden">
                    <CategoryButton img={tech} size="w-10 h-10" category="Eletrônico" id={1} />
                    <CategoryButton img={clothes} size="w-10 h-10" category="Vestuário" id={2} />
                    <CategoryButton img={books} size="w-8 h-8" category="Livros" id={4} />
                    <CategoryButton img={guitarLogo} size="w-8 h-8" category="Música" id={7} />
                    <CategoryButton img={home} size="w-8 h-8" category="Casa" id={3} />
                </div>
                
                <div className="md:hidden md:invisible">
                    <CategoryDropdown/>
                </div>

                <div className="flex gap-6 flex-wrap md:pr-24 md:pl-24 md:gap-y-7 mt-12 justify-center z-0">
                    {items.map(json => {
                        const image: string = json.assets[0];
                        return (<ProductCard img={image} name={json.item.title} price={json.item.price.toFixed(2)} id={json.item.identifier} />)
                    })}
                </div>
            </div>
        </>
    );
}

export default Home;