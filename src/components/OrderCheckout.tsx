import ItemWithAssets from "../model/ItemWithAssets";

interface Props {
    item: ItemWithAssets,
    quantity: number
}

export default function OrderCheckout({item, quantity}: Props) {
    return (
        <div>
            <p className="font-bold font-inter text-2xl">Confirmar pedido:</p>
        </div>
    );
}