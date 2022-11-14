import User from "../model/User";
import {authorized_headers, default_headers, proxied_host} from "./spec";
import Address from "../model/Address";

export interface Login { username: string, password: string}
export interface AuthResponse { status: boolean, message: string, user: User, jwt: string } 
export function login(info: Login, callback: (resp: AuthResponse) => void) {
    fetch(proxied_host + "login", {
        method: 'POST', headers: default_headers, body: JSON.stringify(info)
    }).then(resp => resp.json()).then(json => callback(json as AuthResponse))
}

export interface IncomingUser { name: string, email: string, city: string, birthdate: string, seller: boolean, profile_picture: string, password: string, username:string}
export function register_user(incoming: IncomingUser, callback: (resp: AuthResponse) => void) {
    fetch(proxied_host + "register", {
        method: 'POST', headers: default_headers, body: JSON.stringify(incoming)
    }).then(resp => resp.json()).then(json => callback(json as AuthResponse))
}

export function get_user(username: string, callback: (resp: {user: User, rating: number}) => void) {
    fetch(proxied_host + "user/" + username, {
        method: 'GET', headers: default_headers
    }).then(resp => resp.json()).then(json => callback(json as {user: User, rating: number}))
}

export function get_addresses(username: string, token: string, callback: (resp: Address[]) => void) {
    fetch(proxied_host + "user/address", {
        method: 'GET', headers: authorized_headers(token)
    }).then(resp => resp.json()).then(json => callback(json as Address[]))
}