import React, {useEffect, useState} from "react"
import {useCookies} from "react-cookie";
import Navbar from "../Navbar";
import {get_addresses, get_user} from "../../api/user";
import User from "../../model/User";
import arrow_right from "../../images/arrow-right-white.svg"
import CEPApiResponse from "../../model/CEPApiResponse";
import cross from "../../images/cross.svg"
import UserStorage from "../../model/UserStorage";
import {default_headers} from "../../api/spec";
import {delete_address, post_address} from "../../api/address";

export default function Settings() {
    const [user, setUser] = useState<User>();
    const [cookies, setCookie] = useCookies();
    const [addresses, setAddresses] = useState<any>([])
    const [inputCEP, setInputCEP] = useState<any>()
    const [inputLogradouro, setInputLogradouro] = useState<any>()
    const [inputBairro, setInputBairro] = useState<any>()
    const [inputNumber, setInputNumber] = useState<number>()
    const [inputCidade, setInputCidade] = useState<any>()
    const [inputUF, setInputUF] = useState<any>()
    const [inputComplemento, setInputComplemento] = useState<any>("")
    const [inputNome, setInputNome] = useState<any>("")

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

    const deleteAddress = (address: any) => {
        delete_address(cookies.access_token, address, resp => {
            alert(resp.message)
            if(resp.status) {
                window.location.href = "/settings/"
            }
        })
    }

    const completar = () => {

        fetch("https://viacep.com.br/ws/" + inputCEP + "/json/",
            {method: 'GET', headers: default_headers}
        ).then(resp => resp.json()).then(json => {
            setInputCEP(json.cep.replaceAll("-", ""))
            setInputLogradouro(json.logradouro)
            setInputBairro(json.bairro)
            setInputUF(json.uf)
            setInputCidade(json.localidade)
        })
    }

    const cadastrarEndereco = () => {
        post_address(cookies.access_token, inputCEP, inputNumber!, inputComplemento, inputNome, resp => {
            alert(resp.message)
            if(resp.status) {
                window.location.href = "/settings/"
            }
        })
    }

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
            <div className="ml-20 w-2/3">
                <p className="font-normal mt-8 text-gray-800 mb-1 text-sm">Endereços:</p>
                {(addresses === undefined || addresses === null || addresses.length === 0)
                    ? <p className="text-gray-900 font-light text-md md:text-left text-center">Nenhuma
                        endereço até o momento.</p>
                    : addresses.map((address: any, i: number, addresses: any[]) => {
                        return (
                            <div className={`
                            ${i === 0 ? "md:rounded-t-xl" : "md:border-t-1"}
                            ${i === addresses.length - 1 ? "md:rounded-b-xl" : "md:border-b-0"}
                            p-4 md:border-[1px]
                            border-indigo-400
                        `}>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="font-inter text-sm mb-2 font-semibold text-gray-800">{address.name}</p>
                                        <p className="font-inter text-gray-800 text-xs">{address.info.bairro}, {address.info.logradouro}, {address.number}</p>
                                        <p className="font-inter text-gray-800 text-xs">{address.info.localidade} - {address.info.uf}, {address.info.cep}</p>
                                    </div>
                                    <img src={cross} alt="" className="cursor-pointer w-8 h-8 my-auto mr-4" onClick={() => deleteAddress(address.identifier)}/>
                                </div>
                            </div>
                        );
                    })}
                <p className="text-sm mt-8 mb-2">Adicionar endereço</p>
                <div className="flex gap-4">
                    <div className="flex">
                        <input spellCheck="false" type="number" placeholder="CEP" value={inputCEP} onChange={(e) => setInputCEP(e.target.value)}
                               className="text-gray-600 pl-2 h-8 font-normal text-sm p-1  border-[1px] border-purple-600 rounded-lg rounded-br-none rounded-tr-none w-64 outline-none"/>
                        <div className="rounded-br-lg rounded-tr-lg h-8 w-8 bg-purple-600 hover:cursor-pointer">
                            <img src={arrow_right} onClick={completar} />
                        </div>
                    </div>
                    <input spellCheck="false" disabled={true}  type="text" placeholder="Cidade" value={inputCidade}
                           className="text-gray-600 pl-2 h-8 font-normal text-sm p-1  border-[1px] border-purple-600 rounded-lg w-64 outline-none"/>
                    <input spellCheck="false" disabled={true}  type="text" placeholder="UF" value={inputUF}
                           className="text-gray-600 pl-2 h-8 font-normal text-sm p-1  border-[1px] border-purple-600 rounded-lg w-12 outline-none"/>
                    <input spellCheck="false" disabled={true} type="text" placeholder="Bairro" value={inputBairro}
                    className="text-gray-600 pl-2 h-8 font-normal text-sm p-1  border-[1px] border-purple-600 rounded-lg w-full outline-none"/>
                </div>
                <div className="flex gap-4 mt-4">
                    <input spellCheck="false" disabled={true}  type="text" placeholder="Logradouro" value={inputLogradouro}
                           className="text-gray-600 pl-2 h-8 font-normal text-sm p-1  border-[1px] border-purple-600 rounded-lg w-5/6 outline-none"/>
                    <input spellCheck="false" type="number" placeholder="Número" value={inputNumber} onChange={(e) => setInputNumber(parseInt(e.target.value))}
                           className="text-gray-600 pl-2 h-8 font-normal text-sm p-1  border-[1px] border-purple-600 rounded-lg w-1/6 outline-none"/>
                </div>
                <div className="flex gap-4 mt-4">
                    <input spellCheck="false" type="text" placeholder="Complemento" value={inputComplemento} onChange={(e) => setInputComplemento(e.target.value)}
                           className="text-gray-600 pl-2 h-8 font-normal text-sm p-1 border-[1px] border-purple-600 w-1/2 rounded-lg w-full outline-none"/>
                    <input spellCheck="false" type="text" placeholder="Nome do endereço" value={inputNome} onChange={(e) => setInputNome(e.target.value)}
                           className="text-gray-600 pl-2 h-8 font-normal text-sm p-1 border-[1px] border-purple-600 w-1/2 rounded-lg w-full outline-none"/>
                </div>
                <div className="w-full flex justify-center pt-1 cursor-pointer bg-purple-500 mt-4 h-8 text-sm rounded-lg" onClick={cadastrarEndereco}>
                    <p className="text-md text-center font-light text-white">Adicionar endereço</p>
                </div>
            </div>
        </div>
    )
}