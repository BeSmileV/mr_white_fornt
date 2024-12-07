'use client'

import {ChevronLeftSVG} from "@/assets";
import {useRouter} from "next/navigation";
import {CartCard} from "@/components/CartCard";
import {useEffect, useState} from "react";
import {GetCartResponseType} from "@/api/getCart";
import {buyRequest, deleteCartItemRequest, getCart, updateCartItem} from "@/api";
import style from './styles.module.scss'

export default function page() {
    const [cart, setCart] = useState<GetCartResponseType>({items: [], total_price: 0} as unknown as GetCartResponseType)
    const router = useRouter()

    useEffect(() => {
        getCart().then(data => data && setCart(data))
    }, [])

    const buy = async () => {
        const response = await buyRequest()
        if (response) {
            setCart(prevState => {
                const newState = {...prevState}
                newState.items = []
                return newState
            })
        }
    }

    const onDeleteProduct = async (id: number) => {
        const curProduct = cart.items[id]
        if (curProduct) {
            const response = await deleteCartItemRequest(curProduct.product.id)
            if (response) {
                setCart(prevState => {
                    const newState = {...prevState}
                    newState.items = newState.items.filter(item => item.product.id !== curProduct.product.id)
                    return newState
                })
            }
        }
    }

    const onAddProduct = async (id: number) => {
        const curProduct = cart.items[id]

        if (curProduct) {
            const newQuantity = curProduct.quantity + 1

            const response = await updateCartItem(curProduct.product.id, newQuantity)
            if (response) {
                setCart(prevState => {
                    const newState = {...prevState}
                    newState.items[id].quantity = newQuantity
                    return newState
                })
            }
        }
    }

    const onMinusProduct = async (id: number) => {
        const curProduct = cart.items[id]

        if (curProduct) {
            const newQuantity = curProduct.quantity - 1

            if (newQuantity <= 0) {
                await onDeleteProduct(id)
            }

            const response = await updateCartItem(curProduct.product.id, newQuantity)
            if (response) {
                setCart(prevState => {
                    const newState = {...prevState}
                    newState.items[id].quantity = newQuantity
                    return newState
                })
            }
        }
    }

    function getProductWord(quantity: number) {
        const mod10 = quantity % 10;
        const mod100 = quantity % 100;

        if (mod100 >= 11 && mod100 <= 19) {
            return "продуктов";
        }

        if (mod10 === 1) {
            return "продукт";
        }

        if (mod10 >= 2 && mod10 <= 4) {
            return "продукта";
        }

        return "продуктов";
    }

    return (
        <div className={style.page}>
            <button onClick={() => router.push('/')}
                    className={style.backButton}>
                <ChevronLeftSVG/> Продолжить покупки
            </button>
            <div className={style.cart}>
                <div className={style.label}>
                    <span className={style.title}>Корзина</span>
                    <span className={style.count}>У вас {cart.items.length} {getProductWord(cart.items.length)} в корзине</span>
                </div>
                <div className={style.productList}>
                    {cart.items.map((item, i) => <CartCard product={item}
                                                           addProduct={() => onAddProduct(i)}
                                                           minusProduct={() => onMinusProduct(i)}
                                                           deleteProduct={() => onDeleteProduct(i)}
                                                           key={i}/>)}
                </div>
            </div>
            <button onClick={buy} className={style.buyButton}>Купить</button>
        </div>
    )
}