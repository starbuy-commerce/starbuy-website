import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserStorage from "../../model/UserStorage";
import Navbar from "../Navbar";
import { proxied_host } from "../../api/spec"
import ProductCard from "../card/ProductCard";
import {get_user_received_reviews, ReviewsWithAverage} from "../../api/review";
import {Rating} from "@mui/material";
import {update_profile_picture} from "../../api/user";
import {useCookies} from "react-cookie";


export default function User() {
    
    const [name, setName] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [items, setItems] = useState<any[]>([])
    const [profilePicture, setPfp] = useState<string>("")
    const [rating, setRating] = useState(0)
    const [cookies, setCookie] = useCookies();

    const {username} = useParams();
    const path = username === undefined ? UserStorage.getUsername() : "/" + username;

    const changeImage = () => {
        if(username !== undefined) {
            return
        }
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
            var file = input.files![0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (readerEvent: any) => {
                update_profile_picture(readerEvent.target.result, cookies.access_token, resp=> {
                    alert(resp.message)
                    if(resp.status) {
                        window.location.href = "/user"
                    }
                })
            }
        };
        input.click();
    }

    useEffect(() => {
        get_user_received_reviews(username === undefined ? UserStorage.getUsername() : username, (resp: ReviewsWithAverage) => {
            setRating(resp.average);
        });
    }, [])

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
                    <div className="flex gap-4 font-inter text-white absolute mt-8 ml-48 font-bold text-xl">
                        <p>
                            {name.toUpperCase()}
                        </p>
                        <Rating className="mt-1 fill-yellow-300" precision={0.5} name="read-only" value={rating}
                                sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: '#fde047',
                                    }
                                }}
                                readOnly size="small"/>
                    </div>
                    <p className="font-inter text-white absolute mt-16 ml-48 font-light text-sm">
                        {city.toUpperCase()}
                    </p>
                </div>
            </div>
            <img src={profilePicture} onClick={changeImage}
                 className={`${username === undefined ? "cursor-pointer": ""}
                 rounded-full object-cover border-yellow-400 border-4 w-32 h-32 absolute top-32 ml-10`}/>

            <p className="font-inter text-lg text-gray-700 font-semibold md:pl-24 pt-24">Produtos desse usuário:</p>
            <div className="flex gap-6 flex-wrap md:pr-24 md:pl-24 md:gap-y-7 mt-6 mb-12 justify-center z-0">
                {items === null || items.length === 0 ? <p>Nenhum item encontrado</p>
                    : items.map(item => {
                        const image: string = item.assets === null ? "https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png" : item.assets[0]
                        return (<ProductCard img={image} name={item.item.title} price={item.item.price} id={item.item.identifier} />)
                    })}
            </div>
        </div>
    )
} 