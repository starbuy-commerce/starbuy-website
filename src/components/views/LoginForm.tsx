import shopping from '../../images/shopping.jpg'
import cookie, { useCookies } from "react-cookie";
import { useEffect, useState } from 'react';
import UserStorage from '../../model/UserStorage';

const proxy = 'https://blooming-coast-08475.herokuapp.com/'

export default function LoginForm() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cookies, setCookie] = useCookies();
    const [error, setError] = useState<string>("")    

    function handleUsernameChange(event: { target: HTMLInputElement; }) {
        setUsername(() => event.target.value)
    }

    function handlePasswordChange(event: { target: HTMLInputElement; }) {
        setPassword(() => event.target.value)
    }

    const handleLogin = () => {
        if(username === "" || password === "")  {
            setError("Digite suas credenciais");
            return
        }

        fetch(proxy + 'https://tcc-web-api.herokuapp.com/login', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ username: username, password: password })
        }).then(response => response.json())
            .then(json => {
                if (json.hasOwnProperty('error')) {
                    setError(json.error);
                    setPassword("");
                    setUsername("");
                } else {
                    setCookie('access_token', json.jwt, { path: '/' });
                    UserStorage.setEmail(json.user.email);
                    UserStorage.setUsername(json.user.username);
                    UserStorage.setName(json.user.name);
                    UserStorage.setCity(json.user.city);
                    UserStorage.setPfp(json.user.profile_picture);
                    window.location.href = "/"
                    setError("");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="md:flow-root">
                <div className="md:h-screen bg-white md:float-left">
                    <div className="m-4 md:m-28 md:mt-20">
                        <div>
                            <div>
                                <span className="font-rubik font-extrabold text-3xl md:text-4xl text-gray-800">Bem-vindo de volta<br /></span>
                                <span className="font-rubik font-bold text-3xl md:text-4xl text-gray-800">a </span>
                                <span className="font-rubik font-extrabold text-5xl md:text-6xl text-purple-600">Starbuy!</span>
                            </div>
                            <p className="font-rubik font-bold md:max-w-lg text-sm text-gray-600 mt-16">Faça login com a sua conta. Não tem uma?
                                <a href="" className="text-yellow-500"> Registre-se</a>
                            </p>
                            <p id="error" className="font-rubik font-bold md:max-w-lg text-sm text-rose-600 mt-4">
                                {error}
                            </p>

                            <div id="loginForm" className="mt-10">
                                <input className="login-input" value={username} type="text" placeholder="Digite seu username" onChange={handleUsernameChange}/>
                                <br /><br />
                                <input className="login-input" value={password} type="password" placeholder="Senha" onChange={handlePasswordChange} />
                                <div className="mt-4">
                                    <a href="" className="text-yellow-500 text-sm font-bold text-right">Esqueceu sua senha?</a>
                                </div>
                                <br /><br />
                                <button onClick={handleLogin} className="w-full text-white font-bold py-2 px-4 rounded-full bg-purple-700 hover:bg-indigo-700 transition duration-500 ease-in-out">
                                    Entrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:h-screen md:float-right md:mr-20">
                    <img src={shopping} className="md:w-full md:h-full" alt="" />
                </div>
            </div>
        </>

    );
}