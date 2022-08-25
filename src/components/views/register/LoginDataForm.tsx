export default function LoginDataForm({ password, setPassword, confirm, setConfirm, username, setUsername }: any) {
    return (
        <div className="">
            <div className="mt-12 mx-12 w-3/4">
                <div>
                    <p className="font-inter text-sm">Username:</p>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-1 pl-2 rounded-md outline-none border-[1px] border-indigo-500 text-xs w-full h-8"
                    />
                </div>
                <div className="mt-12 w-full">
                    <div className="w-full md:mr-8">
                        <p className="font-inter text-sm">Senha:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-1 pl-2 rounded-md outline-none border-[1px] border-indigo-500 text-xs w-full h-8"
                        />
                    </div>
                    <div className="mt-4">
                        <p className="font-inter text-sm">Confirmar senha:</p>
                        <input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="p-1 pl-2 rounded-md outline-none border-[1px] border-indigo-500 text-xs w-full h-8"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}