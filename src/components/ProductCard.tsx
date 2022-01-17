type Props = {
    img: string,
    name: string,
    price: number
}

const ProductCard = ({ img, name, price}: Props) => {
    var newName: string = name;
    if(newName.length > 40) newName = name.substring(0, 39) + "..."

    return (
        <>
            <div className="cursor-pointer w-52 hover:shadow-md rounded-md hover:border border-violet-700 shadow-violet-900">
                <img src={img} className="hover:p-2 h-52 w-52 rounded-t-md" />
                <div className="w-52 h-24">
                    <p className="text-sm break-words font-inter font-normal mt-2 ml-2 mr-2">{newName}</p>
                    <p className="font-inter font-bold text-violet-900 static mt-4 ml-2">R$ {price}</p>
                </div>
            </div>
        </>
    );
}

export default ProductCard;