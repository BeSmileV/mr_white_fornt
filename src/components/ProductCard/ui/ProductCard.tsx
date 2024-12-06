'use client'

import {useState} from "react";
import {clsx} from "clsx";
import {ProductCardStyle} from "../styles";

type ProductCardPropsClassName = {
    imgs?: string[],
    cost?: string,
    productName?: string,
    onClick?: () => void,
    onBuy?: () => void,
    isInCart?: boolean,
}

export default function ProductCard({
                                        imgs = [],
                                        productName,
                                        cost,
                                        onClick,
                                        onBuy,
                                        isInCart = false
                                    }: ProductCardPropsClassName) {
    const [curImage, setCurImage] = useState<number>(0)

    return (
        <div className={ProductCardStyle.productCard}>
            <div className={ProductCardStyle.images}>
                <img src={imgs[curImage]} alt="" className={ProductCardStyle.curImage}/>
                <div className={ProductCardStyle.switcher}>
                    {imgs.map((_img, i) => <button onClick={() => setCurImage(i)}
                                                   className={clsx(ProductCardStyle.item, {
                                                       [ProductCardStyle.active]: curImage === i,
                                                   })}
                                                   key={i}></button>)}
                </div>
            </div>
            <div className={ProductCardStyle.detail}>
                <span className={ProductCardStyle.cost}>{cost} Р</span>
                <button onClick={onClick} className={ProductCardStyle.name}>{productName}</button>
            </div>
            <button onClick={onBuy} className={clsx(ProductCardStyle.buyButton, {
                [ProductCardStyle.inCart]: isInCart,
                [ProductCardStyle.notInCart]: !isInCart,
            })}>{isInCart ? 'В корзине' : 'В корзину'}</button>
        </div>
    )
}