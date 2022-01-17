type Props = {
    img: string,
    name: string,
    price: number
}

const ProductCard = ({ img, name, price}: Props) => {
    const newName = name;

    return (
        <>
            <div className="cursor-pointer w-52 hover:shadow-md rounded-md hover:border border-violet-700 shadow-violet-900">
                <img src={img} className="hover:p-2 h-52 w-52 rounded-t-md" />
                <div className="w-52 h-24">
                    <p className="text-sm break-words font-inter font-normal mt-2 ml-2 mr-2">{name}</p>
                    <p className="font-inter font-bold text-violet-900 static mt-10 ml-2">{price}</p>
                </div>
            </div>
        </>
    );
}

export default ProductCard;