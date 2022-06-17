import { Button } from "@mui/material";
import ItemWithAssets from "../../model/ItemWithAssets";

interface Props {
    item: ItemWithAssets;
    quantity: number;
}

export default function CartCard({ item, quantity }: Props) {
    return (
        <div className="w-10/12 mx-16 p-4 h-2/5 border-[1px] border-yellow-400 rounded-lg">
            <div className="flex mb-6 mt-6 ">
                <img className="h-48 w-48 my-auto" src={item.assets[0]} alt="" />
                <div className="text-md font-medium ml-10 text-md">
                    <p className="font-bold mr-4 mt-2">{item.item.title}</p>
                    <p className="mt-4">Preço total: R$ {item.item.price * quantity}</p>
                    <p>Quantidade: {quantity} unidade(s)</p>
                </div>
                <div className="flex flex-col justify-end">
                    <Button variant="outlined" color="error" className="h-8">
                        REMOVER
                    </Button>
                </div>
            </div>
        </div>

    );
}
