import Rating from "@mui/material/Rating"

export default function Review({reviewer, pfp, rating, description}: any) {
    return (
        <div className="">
            <div className="flex">
                <img src={pfp} className="rounded-full object-cover w-12 h-12"/>
                <div className="ml-4">
                    <div className="flex">
                        <p className="font-inter text-gray-800 font-medium text-[0.95rem]">{reviewer}</p>
                        <div className="ml-4">
                            <Rating precision={0.5} name="read-only" value={rating/2} readOnly size="small"/>
                        </div>
                    </div>
                    <p className="font-inter text-gray-900 text-sm mt-2 w-full text-justify">{description}</p>
                </div>
            </div>
        </div>
    );
}