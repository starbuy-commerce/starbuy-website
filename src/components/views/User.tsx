import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserStorage from "../../model/UserStorage";
import Navbar from "../Navbar";
import { proxied_host } from "../../api/spec"
import ProductCard from "../card/ProductCard";

export default function User() {
    
    const [name, setName] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [items, setItems] = useState<any[]>([])
    const [profilePicture, setPfp] = useState<string>("")

    const {username} = useParams();
    const path = username === undefined ? UserStorage.getUsername() : "/" + username;

    useEffect(() => {
        fetch(proxied_host + 'user/' + path + "?includeItems=true", {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => response.json())
        .then(json => {
            setItems(json.items)
            setPfp(json.user.profile_picture);
            setName(json.user.name);
            setCity(json.user.city);
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Navbar fixed={false} bottomBar={false}/>
            <div className="w-full h-24 from-[#6366F1] via-[#6366F1] to-[#7ED8FF] bg-gradient-to-r relative visible">
                <div>
                    <p className="font-inter text-white absolute mt-8 ml-48 font-bold text-xl">
                        {name.toUpperCase()}
                    </p>
                    <p className="font-inter text-white absolute mt-16 ml-48 font-light text-sm">
                        {city.toUpperCase()}
                    </p>
                </div>
            </div>
            <img src={profilePicture} className="rounded-full object-cover border-yellow-400 border-4 w-32 h-32 absolute top-32 ml-10"/>

            <p className="font-inter text-lg text-gray-700 font-semibold md:pl-24 pt-24">Produtos desse usuário:</p>
            <div className="flex gap-6 flex-wrap md:pr-24 md:pl-24 md:gap-y-7 mt-6 justify-center z-0">
                {items === null ? <p>Nenhum item encontrado</p>
                    : items.map(item => {
                        const image: string = item.assets === null ? "https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png" : item.assets[0]
                        return (<ProductCard img={image} name={item.item.title} price={item.item.price} id={item.item.identifier} />)
                    })}
            </div>
        </div>
    )
} 