'use client'

import {ChevronDownSVG, ChevronUpSVG, TrashSVG} from "@/assets";
import {CartCardStyle} from "@/components/CartCard/styles";
import {CartItemType} from "@/api/getCart";

type CartCardPropsType = {
    product: CartItemType,
    deleteProduct?: () => void,
    addProduct?: () => void,
    minusProduct?: () => void,
}

export default function CartCard({product, deleteProduct, minusProduct, addProduct}: CartCardPropsType) {


    return (
        <div className={CartCardStyle.cartCard}>
            <img src={process.env.NEXT_PUBLIC_BACKEND_API + product.product.images[0]} className={CartCardStyle.image}/>
            <span className={CartCardStyle.name}>{product.product.name}</span>
            <div className={CartCardStyle.counter}>
                <span className={CartCardStyle.count}>{product.quantity}</span>
                <div className={CartCardStyle.changeCount}>
                    <button onClick={addProduct} className={CartCardStyle.countButton}><ChevronUpSVG/></button>
                    <button onClick={minusProduct} className={CartCardStyle.countButton}><ChevronDownSVG/></button>
                </div>
            </div>
            <span className={CartCardStyle.cost}>{product.product.price} Р</span>
            <button onClick={deleteProduct}
                    className={CartCardStyle.trashButton}>
                <TrashSVG/></button>
        </div>
    )
}