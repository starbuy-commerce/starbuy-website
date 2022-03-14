import TransitionButton from "./TransitionButton";
import cart from '../images/cart.svg'
import logo from '../images/logo.png';
import login from '../images/login.svg';
import { useCookies } from "react-cookie";
import UserStorage from "../model/UserStorage";

type Prop = { fixed: boolean, bottomBar: boolean };

const Navbar = ({ fixed, bottomBar }: Prop) => {

    const [cookies, setCookie] = useCookies();

    return (
        <div className={`bg-white w-screen top-0 ${fixed ? "fixed" : ""}`}>
            <nav className='flex justify-between'>
                <div className="hidden sm:block">
                    <img src={logo} className="cursor-pointer md:pr-0 h-16 w-36 md:h-16 md:w-56 m-4" alt="Starbuy Commerce" onClick={() => window.location.href = "/"} />
                </div>
                <div id="searchbar" className="pt-1 md:pt-3 mt-4">
                    <div className="md:mr-16 flex h-10 text-gray-500 border-2 rounded border-purple-700">
                        <input className="w-24 md:w-96 sm:w-5 pl-3 text-sm focus-within:outline-none" type="text" placeholder="Pesquisar produto ou loja" />
                        <button className="flex items-center justify-center px-4 border-l hover:bg-yellow-300 transition duration-500 ease-in-out">
                            <svg className="w-6 h-6 text-indigo-700" fill="#4338CA" viewBox="0 0 24 24">
                                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <ul className="flex flex-row text-white mt-6">
                    <TransitionButton duration={200} src={cart} target_url={cookies.access_token == undefined? "/login/" : "/cart"} />
                    {cookies.access_token == undefined &&
                        <TransitionButton duration={200} src={login} target_url="/login" />}
                    {cookies.access_token != undefined &&
                        <img src={UserStorage.getPfp()} onClick={() => window.location.href = "/user"} className='border-4 rounded-full border-indigo-600 w-12 h-12 mr-8 cursor-pointer'/>}
                </ul>
            </nav>
            {bottomBar && <div className="h-1 bg-[#6366F1]"></div>}
        </div>
    );
}

export default Navbar;