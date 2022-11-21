import CategoryButton from "../button/CategoryButton";
import CategoryDropdown from "../dropdown/CategoryDropdown";
import Navbar from "../Navbar";
import 'swiper/css';
import ProductCard from "../card/ProductCard";
import tech from "../../images/category/tech.svg"
import clothes from "../../images/category/clothes.svg"
import books from "../../images/category/books.svg"
import home from "../../images/category/home.svg"
import guitarLogo from "../../images/category/guitar.svg"
import ruler from "../../images/ruler.svg"
import joystick from "../../images/joystick.svg"
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Review from "../Review";
import {proxied_host} from "../../api/spec";
import {get_items, query_category, query_items} from "../../api/item";
import {Response} from "../../model/Response";
import ItemWithAssets from "../../model/ItemWithAssets";
import {Swiper, SwiperSlide} from "swiper/react";
import {Skeleton} from "@mui/material";

import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CategorySwiper from "../CategorySwiper";

const Home = () => {

    const {category} = useParams();
    const [items, setItems] = useState<any[]>([])
    const [received, setReceived] = useState<boolean>(false)
    const {query} = useParams();

    useEffect(() => {
        if (category === undefined && query === undefined) {
            get_items((resp: ItemWithAssets[]) => {
                setItems(resp)
                setReceived(true)
            })
            return
        }

        if (category !== undefined) {
            query_category(parseInt(category), (resp: ItemWithAssets[]) => {
                setItems(resp)
                setReceived(true)
            })
            return
        }

        if (query !== undefined) {
            query_items(query, (resp: ItemWithAssets[]) => {
                setItems(resp)
                setReceived(true)
            })
            return
        }

    }, [])

    return (
        <>
            <Navbar fixed={true} bottomBar={true}/>
            <div className="mt-32 mb-10">
                <p className="text-center font-rubik mb-2 text-4xl text-gray-700 font-normal"><span
                    className="text-purple-500 font-extrabold">Bem-vindo à</span> <span className="text-yellow-300 font-extrabold">Starbuy</span></p>
                <p className="text-center font-rubik mb-12 text-sm">Compre e venda produtos online de maneira prática e lucrativa.</p>
                <div className="md:flex gap-6 justify-center hidden">
                    <CategoryButton img={tech} size="w-6 h-6" category="Eletrônico" id={1}/>
                    <CategoryButton img={clothes} size="w-6 h-6" category="Vestuário" id={2}/>
                    <CategoryButton img={home} size="w-6 h-6" category="Casa" id={3}/>
                    <CategoryButton img={books} size="w-5 h-5" category="Livros" id={4}/>
                    <CategoryButton img={ruler} size="w-5 h-5" category="Papelaria" id={5}/>
                    <CategoryButton img={joystick} size="w-6 h-6" category="Jogos" id={6}/>
                    <CategoryButton img={guitarLogo} size="w-6 h-6" category="Música" id={7}/>
                </div>

                <div className="md:hidden md:invisible">
                    <CategoryDropdown/>
                </div>

                {
                    (category === undefined && query === undefined) ?
                        <div>
                            <p className="font-light mt-4 font-inter ml-12 text-lg">Explore eletrônicos:</p>
                            <CategorySwiper items={items} category={1}/>
                            <p className="font-light mt-4 font-inter ml-12 text-lg">Explore vestuário:</p>
                            <CategorySwiper items={items} category={2}/>
                            <p className="font-light mt-4 font-inter ml-12 text-lg">Explore produtos para casa:</p>
                            <CategorySwiper items={items} category={3}/>
                            <p className="font-light mt-4 font-inter ml-12 text-lg">Explore livros:</p>
                            <CategorySwiper items={items} category={4}/>
                            <p className="font-light mt-4 font-inter ml-12 text-lg">Explore papelaria:</p>
                            <CategorySwiper items={items} category={5}/>
                            <p className="font-light mt-4 font-inter ml-12 text-lg">Explore jogos:</p>
                            <CategorySwiper items={items} category={6}/>
                            <p className="font-light mt-4 font-inter ml-12 text-lg">Explore música:</p>
                            <CategorySwiper items={items} category={7}/>
                        </div>
                        :
                        <div className="flex gap-6 flex-wrap md:pr-24 md:pl-24 md:gap-y-7 mt-12 justify-center z-0">
                            {items === null ? <p>Nenhum item encontrado</p>
                                : items.map(item => {
                                    const image: string = item.assets === null ? "https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png" : item.assets[0]
                                    return (<ProductCard img={image} name={item.item.title} price={item.item.price} id={item.item.identifier} />)
                                })}
                        </div>
                }
                );
            </div>
        </>
    );
}

export default Home;