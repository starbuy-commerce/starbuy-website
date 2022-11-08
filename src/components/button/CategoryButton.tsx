import { Link, useNavigate } from "react-router-dom";

type Props = {
    img: string,
    category: string,
    size: string,
    id: number
}

export default function CategoryButton({img, category, size, id}: Props) {

    return (
        <div className="cursor-pointer flew-grow" onClick={() => window.location.href="/category/" + id}>
            <div className="rounded-full border-2 border-violet-600 w-10 h-10 flex mx-auto hover:bg-yellow-300 transition duration-300 ease-in-out">
                <img className={`mx-auto justify-center my-auto ${size}`} src={img}/>
            </div>
            <p className="text-violet-700 text-xs font-rubik text-center mt-2">{category}</p>
        </div>
    );
}