import ItemWithAssets from "../model/ItemWithAssets";
import { Response } from "../model/Response";
import Review from "../model/Review";
import { authorized_headers, default_headers, proxied_host } from "./spec";

export interface ItemWithAverage { item: ItemWithAssets, average: number }
export function get_item(item: string, callback: (resp: ItemWithAverage) => void) {
    fetch(proxied_host + "item/" + item, {
        method: 'GET', headers: default_headers
    }).then(resp => resp.json()).then(json => callback(json as ItemWithAverage))
}

export interface ItemWithReviews { item: ItemWithAssets, reviews: Review[], average: number }
export function get_item_with_reviews(item: string, callback: (resp: ItemWithReviews) => void) {
    fetch(proxied_host + "item/" + item + "?reviews=true", {
        method: 'GET', headers: default_headers
    }).then(resp => resp.json()).then(json => callback(json as ItemWithReviews))
}

export function get_items(callback: (resp: ItemWithAssets[]) => void) {
    fetch(proxied_host + "items", {
        method: 'GET', headers: default_headers
    }).then(resp => resp.json()).then(json => callback(json as ItemWithAssets[]))
}

export function query_items(query: string, callback: (resp: ItemWithAssets[]) => void) {
    fetch(proxied_host + "item/search/" + query.replaceAll(" ", "%20"), {
        method: 'GET', headers: default_headers
    }).then(resp => resp.json()).then(json => callback(json as ItemWithAssets[]))
}

export function query_category(category: number, callback: (resp: ItemWithAssets[]) => void) {
    fetch(proxied_host + "item/category/" + category, {
        method: 'GET', headers: default_headers
    }).then(resp => resp.json()).then(json => callback(json as ItemWithAssets[]))
}

export function delete_item(item: string, token: string, callback: (resp: Response) => void) {
    fetch(proxied_host + "item/" + item, {
        method: 'DELETE', headers: authorized_headers(token)
    }).then(resp => resp.json()).then(json => callback(json as Response))
}

interface RawItem { title: string, price: number, stock: number, category: number, description: string, image: string }
export function post_item(token: string, item: RawItem, callback: (resp: Response) => void) {
    const value = {
        item: {
            identifier: "",
            title: item.title,
            seller: "",
            price: item.price,
            stock: item.stock,
            category: item.category,
            description: item.description
        },
        assets: [
            item.image
        ]
    };
    console.log(item)
    console.log(JSON.stringify(value))
    fetch(proxied_host + "item", {
        method: 'POST', headers: authorized_headers(token), body: JSON.stringify(value)})
        .then(resp => resp.json()).then(json => callback(json as Response))
}