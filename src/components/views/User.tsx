import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserStorage from "../../model/UserStorage";
import Navbar from "../Navbar";

const proxy = 'https://blooming-coast-08475.herokuapp.com/'

const User = () => {

    const [user, setUser] = useState<any>({})

    const {username} = useParams();
    const path = username == undefined ? UserStorage.getUsername() : "/" + username;

    useEffect(() => {
        fetch(proxy + 'https://tcc-web-api.herokuapp.com/user/' + path, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => response.json())
        .then(json => setUser(json))
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Navbar fixed={false} bottomBar={false}/>
            <div className="w-full h-24 from-indigo-600 via-indigo-600 to-indigo-800 bg-gradient-to-r relative visible">
                <div>
                    <p className="font-inter text-white absolute mt-8 ml-48 font-bold text-xl">
                        {user.name.toUpperCase()}
                    </p>
                    <p className="font-inter text-white absolute mt-16 ml-48 font-light text-sm">
                        {user.city.toUpperCase()}
                    </p>
                </div>
            </div>
            <img src={user.profile_picture} className="rounded-full border-yellow-500 border-4 w-32 h-32 absolute top-24 ml-10"/>
        </div>
    )
} 

export default User;