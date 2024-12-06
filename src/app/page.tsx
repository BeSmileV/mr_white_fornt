'use client'

import {Header, ProductCard} from "@/components";
import MainStyle from './main.module.scss'
import {useRouter} from "next/navigation";
import {addToCart, deleteFromCart, ProductType, selectCart, useActionSlice, useAppSelector} from "@/store";

export default function page() {
    const cart = useAppSelector(selectCart)
    const addToCartAction = useActionSlice(addToCart)
    const deleteFromCartAction = useActionSlice(deleteFromCart)

    const router = useRouter()

    const products: ProductType[] = [
        {id: 1, name: 'test 1', count: 11, cost: '123123', imgs: ['./file.svg', './globe.svg', './next.svg',]},
        {id: 2, name: 'test 2', count: 11, cost: '123123', imgs: ['./file.svg', './globe.svg', './next.svg',]},
        {id: 3, name: 'test 3', count: 11, cost: '123123', imgs: ['./file.svg', './globe.svg', './next.svg',]},
        {id: 4, name: 'test 4', count: 11, cost: '123123', imgs: ['./file.svg', './globe.svg', './next.svg',]},
        {id: 5, name: 'test 5', count: 11, cost: '123123', imgs: ['./file.svg', './globe.svg', './next.svg',]},
        {id: 6, name: 'test 6', count: 11, cost: '123123', imgs: ['./file.svg', './globe.svg', './next.svg',]},
        {id: 7, name: 'test 7', count: 11, cost: '123123', imgs: ['./file.svg', './globe.svg', './next.svg',]},
        {id: 8, name: 'test 8', count: 11, cost: '123123', imgs: ['./file.svg', './globe.svg', './next.svg',]},
        {id: 9, name: 'test 9', count: 11, cost: '123123', imgs: ['./file.svg', './globe.svg', './next.svg',]},
        {id: 10, name: 'test 10', count: 11, cost: '123123', imgs: ['./file.svg', './globe.svg', './next.svg',]},
    ]

    const isInCart = (id: number) => {
        return !!cart.find(item => item.id === id)
    }

    return (
        <div className={MainStyle.main}>
            <Header/>
            <div className={MainStyle.productList}>
                {products.map((item, i) => <ProductCard productName={item.name}
                                                        cost={item.cost}
                                                        imgs={item.imgs}
                                                        onClick={() => router.push(`/${item.id}`)}
                                                        onBuy={() => {
                                                            if (isInCart(item.id)) {
                                                                deleteFromCartAction(item.id)
                                                            } else {
                                                                addToCartAction(item)
                                                            }
                                                        }}
                                                        isInCart={isInCart(item.id)}
                                                        key={i}/>)}
            </div>
        </div>
    )
}