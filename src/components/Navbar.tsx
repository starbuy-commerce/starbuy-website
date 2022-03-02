import TransitionButton from "./TransitionButton";
import cart from '../images/cart.svg'
import logo from '../images/logo.png';
import login from '../images/login.svg';

type Prop = {fixed: boolean};

const Navbar = ({fixed}: Prop) => (
    <div className={`bg-white w-screen top-0 ${fixed ? "fixed" : ""}`}>
        <nav className='flex justify-between'>
            <div className="hidden sm:block">
                <img src={logo} className="cursor-pointer md:pr-0 h-12 w-36 md:h-16 md:w-56" alt="Starbuy Commerce" onClick={() => window.location.href="/"} />
            </div>
            <div id="searchbar" className="pt-1 md:pt-3">
                <div className="md:mr-16 flex h-10 text-gray-500 border-2 rounded border-purple-700">
                    <input className="w-24 md:w-96 sm:w-5 pl-3 text-sm focus-within:outline-none" type="text" placeholder="Pesquisar produto ou loja" />
                    <button className="flex items-center justify-center px-4 border-l hover:bg-yellow-300 transition duration-500 ease-in-out">
                        <svg className="w-6 h-6 text-indigo-700" fill="#4338CA" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                        </svg>
                    </button>
                </div>
            </div>
            <ul className="flex flex-row text-white">
                <TransitionButton duration={200} src={cart} />
                <TransitionButton duration={200} src={login} />
            </ul>
        </nav>
        <div className="h-1 bg-purple-700"></div>
    </div>
);

export default Navbar;