export default function LoginDataForm({ password, setPassword, confirm, setConfirm, username, setUsername }: any) {
    return (
        <div className="">
            <div className="mt-12 mx-12 w-3/4">
                <div>
                    <p className="font-inter text-sm">Username:</p>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} className={`w-full border-[1px] rounded-md border-indigo-400 outline-none font-inter font-normal text-gray-700 p-1`} />
                </div>
                <div className="mt-12 w-full">
                    <div className="md:mr-8">
                        <p className="font-inter text-sm">Senha:</p>
                        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className={`md:mr-8 w-full border-[1px] rounded-md border-indigo-400 outline-none font-inter font-normal text-gray-700 p-1`} />
                    </div>
                    <div className="mt-4">
                        <p className="font-inter text-sm">Confirmar senha:</p>
                        <input value={confirm} type="password" onChange={(e) => setConfirm(e.target.value)} className={`w-full flex-grow border-[1px] rounded-md border-indigo-400 outline-none font-inter font-normal text-gray-700 p-1`} />
                    </div>
                </div>
            </div>
        </div>
    );
}