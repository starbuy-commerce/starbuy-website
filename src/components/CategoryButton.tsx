type Props = {
    img: string,
    category: string,
    size: string
}

const CategoryButton = ({img, category, size}: Props) => (
    <div className="cursor-pointer flew-grow">
        <div className="rounded-full border-4 border-violet-600 w-14 h-14 flex mx-auto hover:bg-yellow-300 transition duration-300 ease-in-out">
            <img className={`mx-auto justify-center my-auto ${size}`} src={img}/>
        </div>
        <p className="text-violet-700 text-sm font-semibold text-center">{category}</p>
    </div>
);

export default CategoryButton;