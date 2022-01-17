import shopping from '../../images/shopping.jpg'

const LoginForm = () => (
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

                        <div id="loginForm" className="mt-10">
                            <form action="submitLogin()">
                                <input className="login-input" type="text" placeholder="Digite seu username ou e-mail" />
                                <br /><br />
                                <input className="login-input" type="password" placeholder="Senha" />
                                <div className="mt-4">
                                    <a href="" className="text-yellow-500 text-sm font-bold text-right">Esqueceu sua senha?</a>
                                </div>
                                <br /><br />
                                <button className="w-full text-white font-bold py-2 px-4 rounded-full bg-purple-700 hover:bg-indigo-700 transition duration-500 ease-in-out">
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:h-screen md:float-right md:mr-20">
                <img src={shopping} className="md:w-full md:h-full" alt=""/>
            </div>
        </div>
    </>

);

export default LoginForm