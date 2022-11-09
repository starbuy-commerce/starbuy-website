import CategoryButton from "../button/CategoryButton";
import CategoryDropdown from "../dropdown/CategoryDropdown";
import Navbar from "../Navbar";
import ProductCard from "../card/ProductCard";
import tech from "../../images/category/tech.svg"
import clothes from "../../images/category/clothes.svg"
import books from "../../images/category/books.svg"
import home from "../../images/category/home.svg"
import guitarLogo from "../../images/category/guitar.svg"
import ruler from "../../images/ruler.svg"
import joystick from "../../images/joystick.svg"
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Review from "../Review";
import {proxied_host} from "../../api/spec";
import {get_items, query_category, query_items} from "../../api/item";
import {Response} from "../../model/Response";
import ItemWithAssets from "../../model/ItemWithAssets";
import Carousel from "../carousel/Carousel";

const Home = () => {

    const {category} = useParams();
    const [items, setItems] = useState<ItemWithAssets[]>([])
    const {query} = useParams();

    useEffect(() => {
        if (category === undefined && query === undefined) {
            get_items((resp: ItemWithAssets[]) => setItems(resp))
            return
        }

        if (category !== undefined) {
            query_category(parseInt(category), (resp: ItemWithAssets[]) => setItems(resp))
            return
        }

        if (query !== undefined) {
            query_items(query, (resp: ItemWithAssets[]) => setItems(resp))
            return
        }

    }, [category, query])

    return (
        <>
            <Navbar fixed={true} bottomBar={true}/>
            <div className="mt-32 mb-10">
                <p className="text-center font-rubik mb-12 text-xl text-gray-700 font-normal"><span
                    className="text-indigo-600 font-bold">Explore</span> nossos produtos:</p>
                {/*<div className="md:flex gap-6 justify-center hidden">
                    <CategoryButton img={tech} size="w-6 h-6" category="Eletrônico" id={1} />
                    <CategoryButton img={clothes} size="w-6 h-6" category="Vestuário" id={2} />
                    <CategoryButton img={home} size="w-6 h-6" category="Casa" id={3} />
                    <CategoryButton img={books} size="w-5 h-5" category="Livros" id={4} />
                    <CategoryButton img={ruler} size="w-5 h-5" category="Papelaria" id={5} />
                    <CategoryButton img={joystick} size="w-6 h-6" category="Jogos" id={6} />
                    <CategoryButton img={guitarLogo} size="w-6 h-6" category="Música" id={7} />
                </div>*/}

                <div className="md:hidden md:invisible">
                    <CategoryDropdown/>
                </div>

                <Carousel show={5}>
                    {items === null ? <p>Nenhum item encontrado</p>
                        : items.map(item => {
                            const image: string = item.assets[0];
                            return (<ProductCard img={image} name={item.item.title} price={item.item.price} id={item.item.identifier} />)
                        })}
                </Carousel>
            </div>
        </>
    );
}

export default Home;