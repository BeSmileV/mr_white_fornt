'use client'

import {selectCart, useAppSelector} from "@/store";
import {ChevronLeftSVG} from "@/assets";
import style from './styles.module.scss'
import {useRouter} from "next/navigation";
import {CartCard} from "@/components/CartCard";

export default function page() {
    const cart = useAppSelector(selectCart)
    const router = useRouter()

    return (
        <div className={style.page}>
            <button onClick={() => router.push('/')}
                    className={style.backButton}>
                <ChevronLeftSVG/> Продолжить покупки
            </button>
            <div className={style.cart}>
                <div className={style.label}>
                    <span className={style.title}>Корзина</span>
                    <span className={style.count}>У вас {cart.length} продукта в корзине</span>
                </div>
                <div className={style.productList}>
                    {cart.map((item, i) => <CartCard product={item} key={i}/>)}
                </div>
            </div>
        </div>
    )
}