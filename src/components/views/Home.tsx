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
            query_category(parseInt(category), (resp: ItemWithAssets[]) => setItems(resp))
            return
        }

        if (query !== undefined) {
            query_items(query, (resp: ItemWithAssets[]) => setItems(resp))
            return
        }

    }, [])

    return (
        <>
            <Navbar fixed={true} bottomBar={true}/>
            <div className="mt-32 mb-10">
                <p className="text-center font-rubik mb-12 text-xl text-gray-700 font-normal"><span
                    className="text-indigo-600 font-bold">Explore</span> nossos produtos:</p>
                <div className="md:flex gap-6 justify-center hidden">
                    <CategoryButton img={tech} size="w-6 h-6" category="Eletrônico" id={1} />
                    <CategoryButton img={clothes} size="w-6 h-6" category="Vestuário" id={2} />
                    <CategoryButton img={home} size="w-6 h-6" category="Casa" id={3} />
                    <CategoryButton img={books} size="w-5 h-5" category="Livros" id={4} />
                    <CategoryButton img={ruler} size="w-5 h-5" category="Papelaria" id={5} />
                    <CategoryButton img={joystick} size="w-6 h-6" category="Jogos" id={6} />
                    <CategoryButton img={guitarLogo} size="w-6 h-6" category="Música" id={7} />
                </div>

                <div className="md:hidden md:invisible">
                    <CategoryDropdown/>
                </div>

                <Swiper
                    spaceBetween={50}
                    slidesPerView={6}
                    loop={true}
                >
                    {(received && items.length > 0) ?
                        items.map(item => {
                            const image: string = item.assets[0];
                            return (
                                <SwiperSlide className="p-8">
                                    <ProductCard img={image} name={item.item.title} price={item.item.price} id={item.item.identifier} />
                                </SwiperSlide>
                            )
                        })
                    : (received && items.length === 0) ?
                        <p>Nenhum item encontrado</p>
                    :
                            <div className="flex gap-x-16 mx-auto mt-12">
                                <Skeleton variant="rectangular" animation="wave" width={210} height={310}/>
                                <Skeleton variant="rectangular" animation="wave" width={210} height={310}/>
                                <Skeleton variant="rectangular" animation="wave" width={210} height={310}/>
                                <Skeleton variant="rectangular" animation="wave" width={210} height={310}/>
                                <Skeleton variant="rectangular" animation="wave" width={210} height={310}/>
                            </div>
                    }

                </Swiper>
                );
            </div>
        </>
    );
}

export default Home;