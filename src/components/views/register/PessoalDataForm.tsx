import {FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper} from "@mui/material";
import { QontoConnector, QontoStepIcon } from "./Stepper";
import Dropdown from "../../dropdown/Dropdown";
import {useEffect, useState} from "react";

export default function PessoalDataForm({ name, email, surname, birthdate, cellphone, setSurname, setName, setEmail, setCity, setBirthdate, setCellphone, estado, setEstado, municipio, setMunicipio }: any) {
    const [estados, setEstados] = useState([]);
    const [municipios,setMunicipios] = useState([]);

    useEffect(() => {
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados", {
            method: "GET"
        }).then(response => response.json()).then(array => {
            setEstados(array.map((val: any) => { return {label: val.sigla, value: val.id}}))
        })
    }, [])

    useEffect(() => {
        if(estado === undefined) {
            return
        }
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + estado.label + "/distritos", {
            method: "GET"
        }).then(response => response.json()).then(array => {
            setMunicipios(array.map((val: any) => { return {label: val.nome, value: val.id}}))
        })
    }, [estado])

    return (
        <div className="">
            <div className="w-full">
                <div className="md:flex gap-4 mb-2">
                    <div className="w-full md:w-1/2">
                        <p className="font-inter text-xs mb-2">Nome:</p>
                        <input value={name} onChange={(e: any) => setName(e.target.value)} className={`w-full border-[1px] h-8 rounded-md border-indigo-400 outline-none font-inter font-normal text-xs text-gray-700 p-1`} />
                    </div>
                    <div className="md:w-1/2 w-full">
                        <p className="font-inter text-xs mb-2">Sobrenome:</p>
                        <input value={surname} onChange={(e: any) => setSurname(e.target.value)} className={`w-full border-[1px] h-8 rounded-md border-indigo-400 outline-none font-inter font-normal text-xs text-gray-700 p-1`} />
                    </div>
                </div>
                <div className="md:mt-0 mt-2">
                    <div className="w-full mb-2">
                        <p className="font-inter text-xs mb-2">Data de nascimento:</p>
                        <input type="date" value={birthdate} onChange={(e: any) => setBirthdate(e.target.value)} className={`w-full border-[1px] h-8 rounded-md border-indigo-400 outline-none font-inter font-normal text-xs text-gray-700 p-1`} />
                    </div>
                    <p className="font-inter text-xs mb-2">E-mail:</p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-1 pl-2 rounded-md outline-none border-[1px] border-indigo-500 text-xs w-full h-8"
                    />
                    <p className="font-inter text-xs mb-2 mt-2">Celular:</p>
                    <input
                        type="number"
                        value={cellphone}
                        onChange={(e) => setCellphone(e.target.value)}
                        className="p-1 pl-2 rounded-md outline-none border-[1px] border-indigo-500 text-xs w-full h-8"
                    />
                </div>
                <div className="w-full mt-8 md:flex w-full">
                    <div className="w-full">
                        <p className="font-inter text-xs">Estado/Municipio:</p>
                        <div className="flex gap-6">
                            <div className="w-1/4">
                                <FormControl sx={{ m: 1, minWidth: 1 }} size="small">
                                    <InputLabel id="uf-label">UF</InputLabel>
                                    <Select
                                        labelId="uf-label"
                                        value={estado}
                                        label="UF"
                                        onChange={(e:any) => setEstado(e.target.value)}
                                    >
                                        {estados.map((est: any) => <MenuItem value={est}>{est.label}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w-3/4">
                                <FormControl sx={{ m: 1, minWidth: 1, maxHeight: 12 }} size="small">
                                    <InputLabel id="municipio-label">Municipio</InputLabel>
                                    <Select
                                        labelId="municipio-label"
                                        value={municipio}
                                        label="Municipio"
                                        onChange={(e: any) => {
                                            setMunicipio(e.target.value)
                                        }}
                                    >
                                        {municipios.map((municipio: any) => <MenuItem value={municipio}>{municipio.label}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}