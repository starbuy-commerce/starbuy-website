import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import addToCart from '../../images/add-to-cart.svg';
import buyNow from '../../images/buy-now.svg';
import { useCookies } from "react-cookie";
import Review from "../Review";
import { json } from "stream/consumers";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Rating, Snackbar } from "@mui/material";
import { proxied_host } from "../../API"
import User from "../../model/User";
import UserStorage from "../../model/UserStorage";

type Props = {
    img: string,
    formated: string,
    price: number,
    delivery: string,
    description: string
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Item() {

    const { id } = useParams();

    const [seller, setSeller] = useState<User>()
    const [imagem, setImagem] = useState<string>("")
    const [preco, setPreco] = useState<number>(0)
    const [description, setDesc] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [reviews, setReviews] = useState<any[]>([])
    const [rateSum, setRateSum] = useState(0);
    const [cookies, setCookie] = useCookies();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const [successSnack, setSuccessSnack] = useState(false);
    const [errorSnack, setErrorSnack] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessSnack(false);
        setErrorSnack(false);
    };

    useEffect(() => {
        fetch(proxied_host + 'item/' + id + "?reviews=true", {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then(response => response.json())
            .then(json => {
                setTitle(json.item.item.title)
                setImagem(json.item.assets[0]);
                setPreco(json.item.item.price);
                setDesc(json.item.item.description);
                if(json.reviews !== undefined && json.reviews !== null) {
                    setReviews(json.reviews);
                }
                setSeller(json.item.item.seller);

                if (reviews.length != 0) {
                    reviews.map((review: any) => {
                        setRateSum(rateSum + review.rate)
                    })
                }
            })
            .catch(err => console.log(err))
    }, [])

    function postCart() {
        setSuccessSnack(true);
        setSuccessMessage("Item adicionado ao carrinho");
        fetch(proxied_host + 'cart', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + cookies.access_token
            }, body: JSON.stringify({
                item: id,
                quantity: 1
            }),
        })
            .then(response => response.json())
            .then(json => {

            })
            .catch(err => console.log(err))
    }

    function postReview() {
        let body = JSON.stringify({
            rate: rating * 2,
            message: review,
            item: id
        })
        console.log(body)
        fetch(proxied_host + 'review', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + cookies.access_token
            }, body: body,
        })
        .then(response => response.json())
        .then(json => {
            if(json.hasOwnProperty("status") && json.status === false) {
                setErrorSnack(true);
                setErrorMessage(json.message);
            } else {
                setReviews(reviews.concat(
                    {
                        reviewer: UserStorage.getUser(),
                        message: review,
                        rate: rating*2
                    }
                ));
                setSuccessSnack(true);
                setSuccessMessage("Obrigado por sua avaliação!");
                setReview("");
                setRating(0);
            }
        
        })
        .catch(err => console.log(err))
    }

    return (

        <div className="mb-8">
            <Navbar fixed={true} bottomBar={true} />
            <div className="mt-24 bg-gray-100 p-5 md:flex justify-center">
                <div className="md:w-3/5 md:flex p-5 rounded-xl bg-white">
                    <div className="md:w-3/6 rounded-lg mr-12">
                        <img src={imagem} className="h-64 w-64 mb-4 md:mb-0 md:h-96 md:w-96 p-4" />
                    </div>
                    <div className="md:w-3/5">
                        <div>
                            <p className="text-2xl font-inter font-semibold ml-2 mr-2 text-gray-800">{title}</p>
                            <div className="font-inter text-4xl font-normal text-gray-800 static mt-8 ml-2 flex">
                                <p className="text-2xl mr-2">R$</p>
                                <p className="font-semibold">{preco.toFixed(2)}</p>
                            </div>
                            <div className="flex">
                                <div className="w-1/2">
                                    <p className="text-sm font-inter font-semibold mt-2 ml-2 mr-2 text-gray-800">Estimativa de entrega: Seila</p>
                                </div>
                            </div>

                            <p className="text-sm font-inter text-justify pt-4 ml-2 mt-4 font-medium text-gray-700">{description}</p>
                        </div>
                        <div className="md:float-right flex mt-10">
                            <div onClick={postCart} className="mr-4 text-sm font-inter font-semibold bg-transparent text-indigo-500 py-2 px-3 border border-indigo-500 rounded hover:cursor-pointer">
                                <div className="flex">
                                    <img src={addToCart} alt="" />
                                    <span className="ml-2">Adicionar ao carrinho</span>
                                </div>
                            </div>
                            <div className="text-sm font-inter font-semibold bg-transparent text-indigo-500 py-2 px-3 border border-indigo-500 rounded hover:cursor-pointer">
                                <div className="flex">
                                    <img src={buyNow} alt="" />
                                    <span className="ml-2">Comprar agora</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white h-full md:w-1/4 border-[1px] p-4 border-purple-600 mt-4 md:mt-0 md:ml-5 rounded-xl">
                    <p className="mb-4 font-inter text-sm font-light">Vendedor:</p>
                    <div className="ml-4">
                        <div className="flex">
                            <img onClick={() => window.location.href = "/user/" + seller?.username} src={seller?.profile_picture} className="hover:cursor-pointer h-11 w-11 border-purple-600 border-2 rounded-full" />
                            <div>
                                <p className="font-inter text-md font-normal ml-4">{seller?.name}</p>
                                <p className="font-inter text-xs font-normal ml-4 text-gray-500 mt-1">{seller?.city}</p>
                            </div>
                        </div>
                        <p className="font-inter text-md text-gray-700 font-bold mt-8">Avaliação geral:</p>
                    </div>
                </div>
            </div>
            <div className="p-5 pt-0 bg-gray-100">
                <div className="flex justify-center">
                    <div className="p-5 md:w-[86.5%] bg-white rounded-xl">
                        <p className="font-inter font-bold text-gray-900 text-lg md:ml-16 mt-16 mb-6">Avaliações dos usuários:</p>
                        {(reviews === undefined || reviews.length === 0)
                            ? <p className="text-gray-900 font-light text-md ml-16">Nenhuma avaliação até o momento.</p>
                            : reviews.map((review: any, i: number, reviews: any[]) => {
                                return (
                                    <div className={`
                            ${i == 0 ? "md:rounded-t-xl" : ""}
                            ${i == reviews.length - 1 ? "md:rounded-b-xl" : ""}
                            p-4 md:mx-16 md:border-[1px]
                            border-indigo-400
                        `}>
                                        <Review reviewer={review.reviewer.name} pfp={review.reviewer.profile_picture} rating={review.rate} description={review.message} />
                                    </div>
                                );
                            })}
                        <div className="md:mx-16 mx-2 mt-10">
                            <textarea value={review} onChange={(e: any) => setReview(e.target.value)} placeholder="Deixe uma avaliação para esse produto" className="w-full border-[1px] rounded-xl border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3 resize-none" rows={2} />
                            <div className="flex">
                                <div className="mt-3 md:mt-2">
                                    <Rating
                                        size="medium"
                                        name="simple-controlled"
                                        value={rating}
                                        precision={0.5}
                                        onChange={(event, newValue: any) => {
                                            setRating(newValue);
                                        }}
                                    />
                                </div>
                                <div className="ml-auto mr-0 mt-2 rounded-md bg-yellow-400 hover:cursor-pointer" onClick={postReview}>
                                    <p className="text-white p-2 font-inter font-medium">Enviar avaliação</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar open={successSnack} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={errorSnack} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}