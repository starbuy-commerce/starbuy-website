import {Response} from "../model/Response";
import {authorized_headers, proxied_host} from "./spec";
import CartItem from "../model/CartItem";

export function post_address(token: string, cep: string, number: number, complement: string, name: string, callback: (resp: Response) => void) {
    console.log(JSON.stringify({
        cep: cep,
        number: number,
        complement: complement,
        name: name
    }))
    fetch(proxied_host + "user/address", {
        method: 'POST', headers: authorized_headers(token), body: JSON.stringify({
            cep: cep,
            number: number,
            complement: complement,
            name: name
        })
    }).then(resp => resp.json()).then(json => callback(json as Response))
}

export function delete_address(token: string, address: string, callback: (resp: Response) => void) {
    fetch(proxied_host + "user/address/" + address, {
        method: 'DELETE', headers: authorized_headers(token)
    }).then(resp => resp.json()).then(json => callback(json as Response))
}