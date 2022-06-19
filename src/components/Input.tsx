import { useState } from "react";

export default function Input({placeholder, w, h}: any) {
    const [value, setValue] = useState();

    return(
      <div>
        <input value={value} onChange={(e: any) => setValue(e.target.value)} placeholder={placeholder} className={`border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
      </div>  
    );
}