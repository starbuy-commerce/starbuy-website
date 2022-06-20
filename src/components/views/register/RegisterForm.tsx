import styled from "@emotion/styled/types/base";
import { Button, createTheme, Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper } from "@mui/material";
import { fontFamily } from "@mui/system";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { AuthResponse, IncomingUser, register_user } from "../../../api/user";
import UserStorage from "../../../model/UserStorage";
import LoginDataForm from "./LoginDataForm";
import PessoalDataForm from "./PessoalDataForm";
import SellerAsk from "./SellerAsk";
import { QontoConnector, QontoStepIcon } from "./Stepper";

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
    const [cookie, setCookie] = useCookies();

    function registrar() {
        const incoming: IncomingUser = {
            name: name, email: email, city: city, birthdate: birthdate, seller: seller, profile_picture: 'https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg', password: password, username: username 
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

    const steps = [
        "Dados pessoais",
        "Login",
        "Vendas"
    ]

    return (
        <div className="bg-gray-100 h-screen p-5 flex justify-center">
            <div className="bg-white rounded-lg border-2 border-yellow-300 p-10 md:w-3/6">
                <div className="h-full flex flex-col justify-between">
                    <div>
                        <Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {step == 0 ? <PessoalDataForm name={name} setName={setName} city={city} setCity={setCity} birthdate={birthdate} setBirthdate={setBirthdate} email={email} setEmail={setEmail} />
                            : step == 1 ? <LoginDataForm password={password} setPassword={setPassword} confirm={confirm} setConfirm={setConfirm} username={username} setUsername={setUsername}/> 
                            : step == 2 ? <SellerAsk setSeller={setSeller} seller={seller} /> : <div></div>}
                    </div>
                    <div className="ml-auto mr-0">
                        <div className="flex gap-x-4">
                            <Button disabled={step == 0} onClick={() => setStep(step - 1)}>Voltar</Button>
                            <Button onClick={() => {if (step == 2) {registrar()} else {setStep(step + 1)}}}>{step == 2 ? "Finalizar" : "Próximo"}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}