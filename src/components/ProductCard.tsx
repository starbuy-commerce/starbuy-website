type Props = {
    img: string,
    name: string,
    price: number
}

const ProductCard = ({ img, name, price}: Props) => {
    var formated: string = name;
    if(formated.length > 40) formated = name.substring(0, 39) + "..."

    return (
        <>
            <div className="flex-grow flex-shrink cursor-pointer justify-center box-border flex-row w-40 max-w-[10rem] md:max-w-[13rem] md:w-52 md:shadow-md border-yellow-400 rounded-lg hover:border shadow-gray-300">
                <img src={img} className="p-4 w-40 h-40 md:h-52 md:w-52 rounded-t-md" />
                <div className="w-40 h-28 md:w-52 md:h-24">
                    <p className="text-sm break-words font-inter font-normal mt-2 ml-2 mr-2">{formated}</p>
                    <p className="font-inter font-bold text-violet-900 static mt-4 ml-2">R$ {price}</p>
                </div>
            </div>
        </>
    );
}

export default ProductCard;