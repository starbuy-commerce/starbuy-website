import {useState} from "react";

interface Properties {
    options: any[]
    setter: any,
    value: any,
    disabled: boolean,
    placeholder: string,
    onChange: any
}

export default function Dropdown({options, setter, value, disabled, placeholder, onChange}: Properties) {
    const [isActive, setActive] = useState(false);
    const onClick = () => {
        if(!disabled) {
            setActive(!isActive);
        }
    }

    const handleClick = (element: any) => {
        if (element != value && isActive) {
            setter(element);
            onChange()
            setActive(false)
        }
    }

    return (
        <div className={`font-inter text-xs`}>
            <ul className="z-10">
                <li>
                    <div className={`cursor-pointer w-full py-2 h-8 justify-between ${isActive? "rounded-bl-none rounded-br-none border-b-transparent" : "rounded-br-md rounded-bl-md"} p-1 rounded-md flex border-[1px] ${disabled ? "border-gray-300" : "border-indigo-500"} bg-white`} onClick={onClick}>
                        {value === undefined ? <span className="text-gray-400 font-inter">{placeholder}</span> : <span className="text-gray-700 font-inter">{value.label}</span>}
                        {!isActive && <svg className="my-auto ml-2 fill-gray-700 mr-2" width="12" height="12" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>}
                        {isActive && <svg className="rotate-180 my-auto ml-2 fill-gray-700 mr-2" width="12" height="12" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>}
                    </div>
                    <div className={`${isActive ? "visible" : "invisible"} ${isActive ? "relative" : "absolute"} flex flex-col`}>
                        {options.map((element, index) => {
                            return (
                                <div className={`${index == options.length - 1 ? "border-b-[1px] rounded-bl-md rounded-br-md" : ""} ${isActive? "cursor-pointer" : ""} p-2 bg-white w-full border-l-[1px] border-r-[1px] border-indigo-500 "hover:border-l-4 hover:bg-gray-50`} onClick={() => handleClick(element)}>
                                    <p className="text-gray-700 font-inter">{element.label}</p>
                                </div>
                            )
                        })}
                    </div>
                </li>
            </ul>
        </div>
    )
}