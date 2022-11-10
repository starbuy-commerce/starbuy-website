import "./carousel.css"

import left from "../../images/arrow-left.svg"
import right from "../../images/arrow-right.svg"
import {useEffect, useState} from "react";

export default function Carousel({children, show, infiniteLoop}: any) {

    const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0)
    const [length, setLength] = useState(children.length)

    const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show)
    const [transitionEnabled, setTransitionEnabled] = useState(true)

    useEffect(() => {
        setLength(children.length)
        setIsRepeating(infiniteLoop && children.length > show)
    }, [children, infiniteLoop, show])

    useEffect(() => {
        if (isRepeating) {
            if (currentIndex === show || currentIndex === length) {
                setTransitionEnabled(true)
            }
        }
    }, [currentIndex, isRepeating, show, length])

    const next = () => {
        if (isRepeating || currentIndex < (length - show)) {
            setCurrentIndex((prevState:any) => prevState + 1)
        }
    }

    const prev = () => {
        if (isRepeating || currentIndex > 0) {
            setCurrentIndex((prevState:any) => prevState - 1)
        }
    }

    const handleTransitionEnd = () => {
        if (isRepeating) {
            if (currentIndex === 0) {
                setTransitionEnabled(false)
                setCurrentIndex(length)
            } else if (currentIndex === length + show) {
                setTransitionEnabled(false)
                setCurrentIndex(show)
            }
        }
    }

    const renderExtraPrev = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[length - 1 - index])
        }
        output.reverse()
        return output
    }

    const renderExtraNext = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[index])
        }
        return output
    }


    return (
        <div className="w-full flex flex-col">
            <div className="flex relative w-full">
                {
                    (isRepeating || currentIndex > 0) &&
                    <div onClick={prev} className=" absolute z-[1] top-[50%] -translate-y-1/2 w-12 h-12 left-12 hover:cursor-pointer">
                        <img src={left} alt=""/>
                    </div>
                }
                <div className="overflow-hidden w-full h-full">
                    <div className={`carousel-content flex gap-x-6 p-8 justify-center transition-all ease-linear show-${show}`}
                         style={{
                             msOverflowStyle: "none",
                             scrollbarWidth: "none",
                             transform: `translateX(-${currentIndex * (100 / show)}%)`,
                             transition: !transitionEnabled ? 'none' : undefined,
                         }}
                         onTransitionEnd={() => handleTransitionEnd()}
                    >
                        {
                            (length > show && isRepeating) &&
                            renderExtraPrev()
                        }
                        {children}
                        {
                            (length > show && isRepeating) &&
                            renderExtraNext()
                        }
                    </div>
                </div>
                {
                    (isRepeating || currentIndex < (length - show)) &&
                    <div onClick={next} className="absolute z-[1] top-[50%] -translate-y-1/2 w-12 h-12 right-12 hover:cursor-pointer">
                        <img src={right} alt=""/>
                    </div>
                }
            </div>
        </div>
    )
}