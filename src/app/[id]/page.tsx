'use client'

import {useParams} from "next/navigation";
import Table, {TableType} from "@/components/Table/ui/TableType";
import style from './style.module.scss'
import {useState} from "react";
import {clsx} from "clsx";
import {addToCart, deleteFromCart, ProductType, selectCart, useActionSlice, useAppSelector} from "@/store";

export default function page() {
    const cart = useAppSelector(selectCart)
    const addToCartAction = useActionSlice(addToCart)
    const deleteFromCartAction = useActionSlice(deleteFromCart)
    const {id} = useParams()
    const [curImage, setCurImage] = useState<number>(0)

    const product: ProductType & { detail: [string, string][], oldCost: string } = {
        name: "Смартфон Tecno Camon 19 Neo 6/128 ГБ, черный",
        id: Number(id),
        cost: '12312',
        oldCost: '123123',
        count: 12,
        imgs: [
            './file.svg',
            './globe.svg',
            './next.svg',
            './vercel.svg',
            './window.svg',
        ],
        detail: [
            ['test1', 'test data1'],
            ['test1', 'test data1'],
            ['test1', 'test data1'],
            ['test1', 'test data1'],
            ['test1', 'test data1'],
            ['test1', 'test data1'],
        ],
    }

    const convertProductDetail = (detail: [string, string][]): TableType => {
        return detail.map(item => [{label: item[0], type: 'info'}, {label: item[1], type: 'data'}])
    }

    const isInCart = (id: number) => {
        return !!cart.find(item => item.id === id)
    }

    const isInCartValue = isInCart(product.id)

    return (
        <div className={style.page}>
            <div className={style.header}>
                <span className={style.name}>{product.name}</span>
                <span className={style.code}>Код товара: {product.id}</span>
            </div>
            <div className={style.mainDetails}>
                <div className={style.images}>
                    <div className={style.imageList}>
                        {product.imgs.map((url, i) => <img key={i}
                                                           src={url}
                                                           onClick={() => setCurImage(i)}
                                                           className={clsx(style.item, {
                                                               [style.active]: curImage === i,
                                                           })}/>)}
                    </div>
                    <img src={product.imgs[curImage]} className={style.curImage}/>
                </div>
                <div className={style.productInfo}><Table table={convertProductDetail(product.detail)}/></div>
                <div className={style.buyBlock}>
                    <span className={style.cost}>{product.count} P</span>
                    <span className={style.oldCost}>{product.oldCost} P</span>
                    <button onClick={() => {
                        if (isInCartValue) {
                            deleteFromCartAction(product.id)
                        } else {
                            addToCartAction(product)
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