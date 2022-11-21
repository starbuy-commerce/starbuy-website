type Props = {
    img: string,
    name: string,
    price: number,
    id: string
}

export default function ProductCard({ img, name, price, id }: Props) {
    var formated: string = name;

    if(formated.length > 30) {
        formated = name.substring(0, 30) + "..."
    }

    var priceFormatted = price.toFixed(2).toString().replaceAll(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return (
        <>
            <div className="z-0 flex-grow cursor-pointer justify-center box-border flex-row w-24 max-w-[10rem] md:max-w-[13rem] md:w-40 md:shadow-md border-yellow-400 rounded-lg border shadow-gray-300 transition ease-in-out hover:border-violet-700 delay-100 hover:-translate-y-1 hover:scale-110 duration-300" onClick={() => window.location.href="/item/" + id}>
                <img src={img} className="p-4 w-24 h-24 md:h-40 md:w-44 mx-auto rounded-t-md object-cover" />
                <div className="w-24 h-20 md:w-40 p-1 md:h-24 flex flex-col justify-between">
                    <p className="text-sm break-words font-inter font-light ml-2 mr-2 text-gray-800">{formated}</p>
                    <p className="font-inter text-sm md:text-lg font-bold text-violet-900 static ml-2">R$ {priceFormatted}</p>
                </div>
            </div>
        </>
    );
}