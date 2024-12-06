'use client'

import {ChevronDownSVG, ChevronUpSVG, TrashSVG} from "@/assets";
import {CartCardStyle} from "@/components/CartCard/styles";
import {addProductCount, deleteFromCart, minusProductCount, ProductType, useActionSlice} from "@/store";

type CartCardPropsType = {
    product: ProductType,
}

export default function CartCard({product}: CartCardPropsType) {
    const addProductCountAction = useActionSlice(addProductCount)
    const minusProductCountAction = useActionSlice(minusProductCount)
    const deleteFromCartAction = useActionSlice(deleteFromCart)

    return (
        <div className={CartCardStyle.cartCard}>
            <img src={product.imgs[0]} className={CartCardStyle.image}/>
            <span className={CartCardStyle.name}>{product.name}</span>
            <div className={CartCardStyle.counter}>
                <span className={CartCardStyle.count}>{product.count}</span>
                <div className={CartCardStyle.changeCount}>
                    <button onClick={() => addProductCountAction(product.id)}
                            className={CartCardStyle.countButton}>
                        <ChevronUpSVG/></button>
                    <button onClick={() => minusProductCountAction(product.id)}
                            className={CartCardStyle.countButton}><ChevronDownSVG/></button>
                </div>
            </div>
            <span className={CartCardStyle.cost}>{product.cost} Р</span>
            <button onClick={() => deleteFromCartAction(product.id)}
                    className={CartCardStyle.trashButton}>
                <TrashSVG/></button>
        </div>
    )
}