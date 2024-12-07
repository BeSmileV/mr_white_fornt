'use client'

import {Header, ProductCard} from "@/components";
import MainStyle from './main.module.scss'
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import getProductList, {GetProductListResponseType} from "@/api/getProductList";
import {GetCartResponseType} from "@/api/getCart";
import {addToCartRequest, deleteCartItemRequest, getCart} from "@/api";

export default function Page() {
    const router = useRouter()
    const [cart, setCart] = useState<GetCartResponseType>({items: [], total_price: 0} as unknown as GetCartResponseType)
    const [products, setProducts] = useState<GetProductListResponseType>([])

    useEffect(() => {
        getProductList().then(data => setProducts(data || []))
        getCart().then(data => data && setCart(data))
    }, [])

    const isInCart = (id: number) => {
        return !!cart.items.find(item => item.product.id === id)
    }

    return (
        <div className={MainStyle.main}>
            <Header onSearch={(data) => setProducts(data)}/>
            <div className={MainStyle.productList}>
                {products.map((item, i) => <ProductCard productName={item.name}
                                                        cost={String(item.price)}
                                                        imgs={item.images}
                                                        onClick={() => router.push(`/${item.id}`)}
                                                        onBuy={async () => {
                                                            if (isInCart(item.id)) {
                                                                const response = await deleteCartItemRequest(item.id)
                                                                if (response) {
                                                                    setCart(prevState => {
                                                                        const newState = {...prevState}
                                                                        newState.items = newState.items.filter(curProduct => curProduct.product.id !== item.id)
                                                                        return newState
                                                                    })
                                                                }
                                                            } else {
                                                                const response = await addToCartRequest(item.id)
                                                                if (response) {
                                                                    setCart(prevState => {
                                                                        const newState = {...prevState}
                                                                        newState.items = [...newState.items, {
                                                                            product: item,
                                                                            quantity: 1
                                                                        }]
                                                                        return newState
                                                                    })
                                                                }
                                                            }
                                                        }}
                                                        isInCart={isInCart(item.id)}
                                                        key={i}/>)}
            </div>
        </div>
    )
}