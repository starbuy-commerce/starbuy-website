import { useNavigate } from "react-router-dom";

type Props = {
    img: string,
    category: string,
    size: string,
    id: number
}

const CategoryButton = ({img, category, size, id}: Props) => {

    const navigate = useNavigate();

    return (
        <div className="cursor-pointer flew-grow" onClick={() => {navigate("category/" + id); window.location.reload()}}>
            <div className="rounded-full border-4 border-violet-600 w-14 h-14 flex mx-auto hover:bg-yellow-300 transition duration-300 ease-in-out">
                <img className={`mx-auto justify-center my-auto ${size}`} src={img}/>
            </div>
            <p className="text-violet-700 text-sm font-semibold text-center">{category}</p>
        </div>
    );
}

export default CategoryButton;