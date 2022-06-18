import { Button } from "@mui/material";
import { setUncaughtExceptionCaptureCallback } from "process";
import React, { createRef, RefObject, useRef, useState } from "react";
import Item from "../../model/Item";
import ItemWithAssets from "../../model/ItemWithAssets";
import QuantityController from "../QuantityController"

interface Props {
    item: ItemWithAssets,
    quantity: number
}

export default class CartCard extends React.Component<Props, { quantity: number }> {

    ref: RefObject<QuantityController>

    constructor(props: Props) {
        super(props);
        this.state = {
            quantity: this.props.quantity
        }

        this.ref = React.createRef();
    }

    componentDidMount() {
        this.setState({quantity: this.ref.current?.state.quantity!})
    }

    render() {
        return (
            <div className="w-10/12 mx-auto mb-4 h-2/5 border-[1px] border-yellow-400 rounded-lg">
                <div className="flex mb-6 mt-6 ">
                    <img onClick={() => window.location.href = "/item/" + this.props.item.item.identifier} className="h-20 w-20 my-auto ml-8 hover:cursor-pointer" src={this.props.item.assets[0]} alt="" />
                    <div className="text-md font-medium ml-10 text-md">
                        <div className="flex">
                            <p className="font-bold mr-8 mt-2 w-full max-w-full">{this.props.item.item.title}</p>
                        </div>
                        <p className="mt-4">Preço total: R$ {this.props.item.item.price * this.state.quantity}</p>
                        <p>Quantidade: {this.ref.current?.state.quantity} unidade(s)</p>
                    </div>
                    <div className="flex flex-col justify-between ml-auto mr-8">
                        <div className="mx-auto">
                            <QuantityController initial={this.props.quantity} ref={this.ref} />
                        </div>
                        <div className="flex gap-4">
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
