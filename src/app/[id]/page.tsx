'use client'

import {useParams, useRouter} from "next/navigation";
import Table, {TableType} from "@/components/Table/ui/TableType";
import style from './style.module.scss'
import {useEffect, useState} from "react";
import {clsx} from "clsx";
import {ChevronLeftSVG} from "@/assets";
import getProductDetail, {GetProductDetailResponseType} from "@/api/getProductDetail";
import {GetCartResponseType} from "@/api/getCart";
import {addToCartRequest, deleteCartItemRequest, getCart} from "@/api";

export default function page() {
    const {id} = useParams()
    const [curImage, setCurImage] = useState<number>(0)
    const router = useRouter()
    const [cart, setCart] = useState<GetCartResponseType>({items: [], total_price: 0} as unknown as GetCartResponseType)
    const [product, setProduct] = useState<GetProductDetailResponseType | null>(null)

    useEffect(() => {
        getProductDetail(Number(id)).then(data => setProduct(data))
        getCart().then(data => data && setCart(data))
    }, [id])

    const convertProductDetail = (detail: { [key: string]: string }): TableType => {
        return Object.keys(detail).map(key => [
            {label: key, type: 'info'},
            {label: detail[key], type: 'data'}
        ])
    }

    const isInCart = (id: number) => {
        return !!cart.items.find(item => item.product.id === id)
    }

    if (product === null)
        return 'Loading...'

    const isInCartValue = isInCart(product.id)

    return (
        <div className={style.page}>
            <div className={style.header}>
                <button onClick={() => router.push('/')} className={style.backButton}><ChevronLeftSVG/></button>
                <div className={style.title}>
                    <span className={style.name}>{product.name}</span>
                    <span className={style.code}>Код товара: {product.id}</span>
                </div>
            </div>
            <div className={style.mainDetails}>
                <div className={style.images}>
                    <div className={style.imageList}>
                        {product.images.map((url, i) => <img key={i}
                                                             src={process.env.NEXT_PUBLIC_BACKEND_API + url}
                                                             onClick={() => setCurImage(i)}
                                                             className={clsx(style.item, {
                                                                 [style.active]: curImage === i,
                                                             })}/>)}
                    </div>
                    <img src={process.env.NEXT_PUBLIC_BACKEND_API + product.images[curImage]}
                         className={style.curImage}/>
                </div>
                <div className={style.productInfo}>
                    <Table table={convertProductDetail(product.characteristics)}/>
                    <div className={style.description}>
                        <span className={style.label}>Описание</span>
                        <div className={style.text}>{product.description}</div>
                    </div>
                </div>
                <div className={style.buyBlock}>
                    <span className={style.cost}>{product.price} P</span>
                    <span className={style.oldCost}>{product.old_price} P</span>
                    <button onClick={async () => {
                        if (isInCart(product?.id)) {
                            const response = await deleteCartItemRequest(product?.id)
                            if (response) {
                                setCart(prevState => {
                                    const newState = {...prevState}
                                    newState.items = newState.items.filter(curProduct => curProduct.product.id !== product?.id)
                                    return newState
                                })
                            }
                        } else {
                            const response = await addToCartRequest(product?.id)
                            if (response) {
                                setCart(prevState => {
                                    const newState = {...prevState}
                                    newState.items = [...newState.items, {
                                        product: product,
                                        quantity: 1
                                    }]
                                    return newState
                                })
                            }
                        }
                    }} className={clsx(style.buyButton, {
                        [style.notInCart]: !isInCartValue,
                        [style.inCart]: isInCartValue,
                    })}>
                        {isInCartValue ? 'В корзине' : 'В корзину'}
                    </button>
                </div>
            </div>
        </div>
    )
}