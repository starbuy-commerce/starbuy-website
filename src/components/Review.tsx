import Rating from "./Rating";

export default function Review({reviewer, pfp, rating, description}: any) {
    return (
        <div className="">
            <div className="flex">
                <img src={pfp} className="rounded-full w-14 h-14"/>
                <div className="ml-4">
                    <div className="flex">
                        <p className="font-inter text-gray-800 font-medium">{reviewer}</p>
                        <div className="ml-4 mt-[0.20rem]">
                            <Rating rate={rating}/>
                        </div>
                    </div>
                    <p className="font-inter text-gray-900 text-sm mt-2 w-3/5 text-justify">{description}</p>
                </div>
            </div>
        </div>
    );
}