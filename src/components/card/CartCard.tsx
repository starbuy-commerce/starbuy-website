import { Button } from "@mui/material";
import ItemWithAssets from "../../model/ItemWithAssets";

interface Props {
    item: ItemWithAssets;
    quantity: number;
}

export default function CartCard({ item, quantity }: Props) {
    return (
        <div className="w-10/12 mx-auto mb-12 p-2 h-2/5 border-[1px] border-yellow-400 rounded-lg">
            <div className="flex mb-6 mt-6 ">
                <img className="h-20 w-20 my-auto ml-8" src={item.assets[0]} alt="" />
                <div className="text-md font-medium ml-10 text-md">
                    <p className="font-bold mr-8 mt-2 w-full max-w-full">{item.item.title}</p>
                    <p className="mt-4">Preço total: R$ {item.item.price * quantity}</p>
                    <p>Quantidade: {quantity} unidade(s)</p>
                </div>
                <div className="flex flex-col justify-end ml-auto mr-8">
                    <Button variant="outlined" color="error" className="h-8">
                        REMOVER
                    </Button>
                </div>
            </div>
        </div>

    );
}
