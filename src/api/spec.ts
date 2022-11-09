export const proxy = 'https://blooming-coast-08475.herokuapp.com/'
export const host = 'https://starbuy-api.herokuapp.com/'
export const proxied_host = proxy + host

export const default_headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
}

export const authorized_headers = (token: string) => {
    return {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + token
    }
}