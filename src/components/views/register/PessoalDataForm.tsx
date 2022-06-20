import { Step, StepLabel, Stepper } from "@mui/material";
import { QontoConnector, QontoStepIcon } from "./Stepper";

export default function PessoalDataForm({ name, email, city, birthdate, setName, setEmail, setCity, setBirthdate }: any) {
    return (
        <div className="">
            <div className="mt-12 mx-12 w-3/4">
                <div>
                    <p className="font-inter text-sm">Nome completo:</p>
                    <input value={name} onChange={(e: any) => setName(e.target.value)} className={`w-full border-[1px] rounded-md border-indigo-400 outline-none font-inter font-normal text-gray-700 p-1`} />
                </div>
                <div className="mt-8 md:flex w-full">
                    <div className="md:mr-8">
                        <p className="font-inter text-sm">Cidade/Estado:</p>
                        <input value={city} onChange={(e: any) => setCity(e.target.value)} className={`md:mr-8 w-full border-[1px] rounded-md border-indigo-400 outline-none font-inter font-normal text-gray-700 p-1`} />
                    </div>
                    <div className="md:mt-0 mt-4">
                        <p className="font-inter text-sm">Data de nascimento:</p>
                        <input value={birthdate} onChange={(e: any) => setBirthdate(e.target.value)} className={`w-full flex-grow border-[1px] rounded-md border-indigo-400 outline-none font-inter font-normal text-gray-700 p-1`} />
                    </div>
                </div>

                <div>
                    <p className="font-inter mt-6 mb-4 text-md font-semibold">CONTATO:</p>
                    <div className="md:mt-0 mt-4">
                        <p className="font-inter text-sm">E-mail:</p>
                        <input value={email} onChange={(e: any) => setEmail(e.target.value)} className={`w-full flex-grow border-[1px] rounded-md border-indigo-400 outline-none font-inter font-normal text-gray-700 p-1`} />
                    </div>
                </div>
            </div>
        </div>
    );
}