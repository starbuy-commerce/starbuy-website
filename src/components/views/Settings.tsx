import React, {useEffect, useState} from "react"
import {useCookies} from "react-cookie";
import UserStorage from "../../model/UserStorage";
import Navbar from "../Navbar";
import {default_headers, proxied_host} from "../../api/spec"
import {get_addresses, get_user} from "../../api/user";
import User from "../../model/User";
import arrow_right from "../../images/arrow-right-white.svg"
import {Address} from "cluster";
import Review from "../Review";
import Rating from "@mui/material/Rating";
import CEPApiResponse from "../../model/CEPApiResponse";

export default function Settings() {
    const [user, setUser] = useState<User>();
    const [cookies, setCookie] = useCookies();
    const [addresses, setAddresses] = useState<any>([])

    useEffect(() => {
        get_user(UserStorage.getUsername(), resp => {
            setUser(resp.user)
        })
    }, [])

    useEffect(() => {
        get_addresses(UserStorage.getUsername(), cookies.access_token, resp => {
            const fullAddresses: any[] = [];
            if (resp !== null) {
                resp.forEach(r => {
                    fetch("https://viacep.com.br/ws/" + r.cep + "/json/",
                        {method: 'GET', headers: default_headers}
                    ).then(resp => resp.json()).then(json => {
                        fullAddresses.push(
                            {
                                identifier: r.identifier,
                                name: r.name,
                                info: json as CEPApiResponse,
                                number: r.number
                            }
                        )
                    })
                })
                setAddresses(fullAddresses)
            }
        })
    }, [])

    return (
        <div className="font-inter">
            <Navbar fixed={true} bottomBar={true}/>
            <div className="flex relative ml-20 mt-32">
                <div className="font-inter">
                    <p className="font-normal mb-1 text-sm">Nome:</p>
                    <div className="flex">
                        <input spellCheck="false" type="text" placeholder={user?.name}
                               className="text-gray-600 pl-2 h-8 font-normal text-sm p-1  border-[1px] border-purple-600 rounded-lg rounded-br-none rounded-tr-none w-64 outline-none"/>
                        <div className="rounded-br-lg rounded-tr-lg h-8 w-8 bg-purple-600 hover:cursor-pointer">
                            <img src={arrow_right} alt="Atualizar nome"/>
                        </div>
                    </div>
                </div>
                <div className="ml-20 font-inter">
                    <p className="font-normal text-gray-800 mb-1 text-sm">E-mail:</p>
                    <div className="flex">
                        <input spellCheck="false" type="text" placeholder={user?.email}
                               className="text-gray-600 pl-2 h-8 font-normal text-sm p-1  border-[1px] border-purple-600 rounded-lg rounded-br-none rounded-tr-none w-64 outline-none"/>
                        <div className="rounded-br-lg rounded-tr-lg h-8 w-8 bg-purple-600 hover:cursor-pointer">
                            <img src={arrow_right} alt="Atualizar nome"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-20">
                <p className="font-normal mt-8 text-gray-800 mb-1 text-sm">Endereços:</p>
                {(addresses === undefined || addresses === null || addresses.length === 0)
                    ? <p className="text-gray-900 font-light text-md md:text-left text-center">Nenhuma
                        endereço até o momento.</p>
                    : addresses.map((address: any, i: number, addresses: any[]) => {
                        return (
                            <div className={`
                            ${i === 0 ? "md:rounded-t-xl" : "md:border-t-0"}
                            ${i === addresses.length - 1 ? "md:rounded-b-xl" : "md:border-b-0"}
                            p-4 md:border-[1px]
                            border-indigo-400
                        `}>
                                <p className="font-inter text-gray-800">{address.name}</p>
                                <p className="font-inter text-gray-800 text-xs">{address.info.logradouro}, {address.info.number}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}