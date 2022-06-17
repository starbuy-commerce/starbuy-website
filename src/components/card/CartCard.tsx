import { Button } from "@mui/material";
import { setUncaughtExceptionCaptureCallback } from "process";
import React, { createRef, useRef } from "react";
import Item from "../../model/Item";
import ItemWithAssets from "../../model/ItemWithAssets";
import QuantityController from "../QuantityController"

interface Props {
    item: ItemWithAssets;
    quantity: number;
}

export default class CartCard extends React.Component<{item: ItemWithAssets, quantity: number}> {

    state = {
        quantity: this.props.quantity
    }

    controllerElement
    item: ItemWithAssets

    constructor(props: any) {
        super(props);
        this.controllerElement = React.createRef();
        this.item = props.item
    }

    render() {
        return (
            <div className="w-10/12 mx-auto mb-4 p-2 h-2/5 border-[1px] border-yellow-400 rounded-lg">
                <div className="flex mb-6 mt-6 ">
                    <img onClick={() => window.location.href = "/item/" + this.item.item.identifier} className="h-20 w-20 my-auto ml-8 hover:cursor-pointer" src={this.item.assets[0]} alt="" />
                    <div className="text-md font-medium ml-10 text-md">
                        <div className="flex">
                            <p className="font-bold mr-8 mt-2 w-full max-w-full">{this.item.item.title}</p>
                        </div>
                        <p className="mt-4">Preço total: R$ {this.item.item.price * this.state.quantity}</p>
                        <p>Quantidade: {this.state.quantity} unidade(s)</p>
                    </div>
                    <div className="flex flex-col ml-auto mr-8">
                        <QuantityController initial={this.state.quantity} />
                        <div className="flex gap-4 justify-end">
                            <Button variant="contained" color="success" className="h-8" >
                                FINALIZAR
                            </Button>
                            <Button variant="contained" color="error" className="h-8" >
                                REMOVER
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
