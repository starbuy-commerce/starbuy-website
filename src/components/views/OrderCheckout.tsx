import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useQuery from "../../hook/useQuery";
import ItemWithAssets from "../../model/ItemWithAssets";
import Navbar from "../Navbar"
import { proxied_host } from "../../API"
import { Radio } from "@mui/material";
import { indigo, pink, purple } from "@mui/material/colors";
import RadioGroup from '@mui/material/RadioGroup';
import CreditCardForm from "../payment/CreditCardForm";
import BoletoForm from "../payment/BoletoForm";

interface Props {
    item: ItemWithAssets,
    quantity: number
}

export default function OrderCheckout() {

    let query = useQuery();
    const itemId = query.get("item");
    const quantity = query.get("qtd");

    const [item, setItem] = useState<ItemWithAssets>();
    const [payment, setPayment] = React.useState('a');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayment(event.target.value);
    };

    const controlProps = (item: string) => ({
        checked: payment === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    useEffect(() => {
        console.log(itemId);
        fetch(proxied_host + "/item/" + itemId, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(resp => resp.json())
            .then(json => setItem(json.item))
    }, [])


    return (
        <div>
            <Navbar fixed={false} bottomBar={true} />
            <div className="p-5 bg-gray-100">
                <div className="bg-white p-10 rounded-xl">
                    <p className="font-bold font-inter text-2xl text-gray-700">CONFIRMAR PEDIDO:</p>
                    <p className="ml-20 mt-12 font-inter font-semibold text-xl text-gray-800">REVISAR ITEM:</p>
                    <div className="flex mt-8 ml-20">
                        <img src={item?.assets[0]} className="w-32 h-32" />
                        <div className="font-inter my-auto ml-12 font-normal text-xl text-gray-800 gap-y-4">
                            <p className="mb-3"><b>COMPRANDO</b>: {item?.item.title}</p>
                            <p className="mb-3"><b>QUANTIDADE</b>: {quantity} unidade(s)</p>
                            <p><b>PREÇO FINAL:</b> R$ {item?.item.price! * parseInt(quantity!)}</p>
                        </div>
                    </div>
                    <p className="ml-20 mt-20 font-inter font-semibold text-xl text-gray-800">FORMA DE PAGAMENTO:</p>

                    <div className="flex justify-center gap-24 mt-8">
                        <div className="flex">
                            <Radio {...controlProps('a')} sx={{
                                color: indigo[700],
                                '&.Mui-checked': {
                                    color: indigo[700],
                                },
                            }}
                            />
                            <p className="my-auto font-inter font-medium">Cartão de crédito</p>
                        </div>

                        <div className="flex">
                            <Radio {...controlProps('b')} sx={{
                                color: indigo[700],
                                '&.Mui-checked': {
                                    color: indigo[700],
                                },
                            }}
                            />
                            <p className="my-auto font-inter font-medium">Boleto bancário</p>
                        </div>

                    </div>

                    <div className="mx-auto flex justify-center mt-6">
                    {payment == 'a' ? <CreditCardForm/> 
                    : payment == 'b' ? <BoletoForm/>
                    : <></>}
                    </div>

                </div>
            </div>
        </div>
    );
}