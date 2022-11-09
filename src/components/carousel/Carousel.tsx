import "./carousel.css"

import left from "../../images/arrow-left.svg"
import right from "../../images/arrow-right.svg"
import {useEffect, useState} from "react";

export default function Carousel(props: any) {

    const {children, show} = props

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)

    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => prevState + 1)
            return
        }
        setCurrentIndex(0);
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    return (
        <div className="w-full flex flex-col">
            <div className="flex relative w-full">
                {
                    currentIndex < (length - 1) &&
                    <div onClick={next} className="absolute z-[1] top-[50%] -translate-y-1/2 w-12 h-12 right-12 hover:cursor-pointer">
                        <img src={right} alt=""/>
                    </div>
                }
                <div className="overflow-hidden w-full h-full">
                    <div className={`carousel-content flex gap-x-6 p-8 justify-center transition-all ease-linear show-${show}`}
                         style={{
                             msOverflowStyle: "none",
                             scrollbarWidth: "none",
                             transform: `translateX(-${currentIndex * (100 / show)}%)`
                         }}
                    >
                        {children}
                    </div>
                </div>
                {
                    currentIndex > 0 &&
                    <div onClick={prev} className=" absolute z-[1] top-[50%] -translate-y-1/2 w-12 h-12 left-12 hover:cursor-pointer">
                        <img src={left} alt=""/>
                    </div>
                }
            </div>
        </div>
    )
}