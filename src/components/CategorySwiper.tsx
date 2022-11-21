import ProductCard from "./card/ProductCard";
import {Skeleton} from "@mui/material";
import React from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Swiper, SwiperSlide} from "swiper/react";

export default function CategorySwiper({items, category}: any) {
    return (
        <Swiper
            slidesPerView={3}
            loop={true}
            breakpoints={{
                320: {
                    slidesPerView: 4,
                    spaceBetween: 0
                },
                768: {
                    spaceBetween: 30,
                    slidesPerView: 8,
                },
            }}
        >
            {(items !== null && items.length > 0) ?
                items.filter((item: any) => item.item.category === category).map((item: any) => {
                    const image: string = item.assets === null ? "https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png" : item.assets[0]
                    return (
                        <SwiperSlide className="p-8">
                            <ProductCard img={image} name={item.item.title} price={item.item.price} id={item.item.identifier}/>
                        </SwiperSlide>
                    )
                })
                : ((items === null || items.length === 0)) ?
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
    )
}