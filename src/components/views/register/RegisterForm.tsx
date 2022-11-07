import { Button } from "@mui/material";
import React, {useState} from "react";
import { useCookies } from "react-cookie";
import { AuthResponse, IncomingUser, register_user } from "../../../api/user";
import UserStorage from "../../../model/UserStorage";
import LoginDataForm from "./LoginDataForm";
import PessoalDataForm from "./PessoalDataForm";
import SellerAsk from "./SellerAsk";
import { QontoConnector, QontoStepIcon } from "./Stepper";

import registry_img from "../../../images/registerimg.jpg"
import ProfilePictureSelect from "./ProfilePictureSelect";

interface Values {
    step: number, name: string, email: string, birthdate: string, city: string, seller: boolean, username: string, password: string
}

export default function RegisterForm() {

    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [seller, setSeller] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [surname, setSurname] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [profile_picture, setProfilePicture] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    const [cookie, setCookie] = useCookies();
    const [estado, setEstado] = useState<any>(undefined);
    const [municipio, setMunicipio] = useState<any>(undefined);

    function registrar() {
        alert(estado == "" || municipio == "")

        const incoming: IncomingUser = {
            name: name + " " + surname, email: email, city: municipio.label + "-" + estado.label, birthdate: birthdate, seller: seller, profile_picture: profile_picture, password: password, username: username
        }

        console.log(JSON.stringify(incoming))

        if(name === "" || surname === "" || email === "" || birthdate === "" || username === "" || password === "" || confirm === "" || municipio === "" || estado === "" || cellphone === "") {
            alert("Preencha todos os campos");
            return;
        }

        if(cellphone.length < 10 || cellphone.length > 11) {
            alert("Digite o número de telefone corretamente.")
            return
        }

        if(password !== confirm) {
            alert("Senhas não coincidem")
            return
        }

        register_user(incoming, (resp: AuthResponse) => {
            if (!resp.status) {
                console.log(resp.message);
                return
            }
            setCookie('access_token', resp.jwt, { path: '/' });
            UserStorage.setEmail(resp.user.email);
            UserStorage.setUsername(resp.user.username);
            UserStorage.setName(resp.user.name);
            UserStorage.setCity(resp.user.city);
            UserStorage.setPfp(resp.user.profile_picture);
            window.location.href = "/"
        })
    }

    return (
        <div>
            <div className="md:flex md:justify-center">
                <div className="md:w-1/2 md:float-right h-[28rem] my-auto">
                    <div className="md:ml-16 mx-auto ml-8 mt-8">
                        <div>
                            <span className="font-rubik font-extrabold text-xl md:text-2xl text-gray-800">É bom saber que você quer fazer<br /></span>
                            <span className="font-rubik font-bold text-3xl md:text-4xl text-gray-800">parte da </span>
                            <span className="font-rubik font-extrabold text-5xl md:text-6xl text-purple-600">Starbuy!</span>
                        </div>
                    </div>
                    <div className="flex flex-col h-full justify-between">
                        <div className="md:w-4/5 mx-auto pt-12">
                            {step === 0 ? <PessoalDataForm estado={estado} setEstado={setEstado} municipio={municipio} setMunicipio={setMunicipio} name={name} cellphone={cellphone} setCellphone={setCellphone} surname={surname} setSurname={setSurname} setName={setName} city={city} setCity={setCity} birthdate={birthdate} setBirthdate={setBirthdate} email={email} setEmail={setEmail} />
                                : step === 1 ? <LoginDataForm password={password} setPassword={setPassword} confirm={confirm} setConfirm={setConfirm} username={username} setUsername={setUsername}/>
                                    : step === 2 ? <SellerAsk setSeller={setSeller} seller={seller} />
                                        : step === 3 ? <ProfilePictureSelect picture={profile_picture}
                                                                             setPicture={setProfilePicture}/> : <div></div>}
                        </div>
                        <div className="flex gap-x-4 ml-auto ">
                            <Button disabled={step === 0} onClick={() => setStep(step - 1)}>Voltar</Button>
                            <Button onClick={() => {if (step === 3) {registrar()} else {setStep(step + 1)}}}>{step == 3 ? "Finalizar" : "Próximo"}</Button>
                        </div>
                    </div>
                </div>
                <img src={registry_img} className="md:pt-0 pt-24 md:w-3/5"/>
            </div>
        </div>
    );


}