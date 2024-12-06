'use client'

import {SearchSVG, ShoppingCartSVG, UserSVG} from "../assets";
import {HeaderStyle} from "../styles";
import {ChangeEvent} from "react";
import {useRouter} from "next/navigation";

type HeaderPropsType = {
    onChange?: (data: string) => void,
}

export default function Header({onChange}: HeaderPropsType) {
    const router = useRouter()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.target.value);
    }

    return (
        <div className={HeaderStyle.header}>
            <span className={HeaderStyle.logo}>ПОЧТИ OZON</span>
            <div className={HeaderStyle.main}>
                <div className={HeaderStyle.searchField}>
                    <input type={'text'}
                           onChange={handleChange}
                           placeholder={'Поиск'}
                           className={HeaderStyle.inputField}/>
                    <button className={HeaderStyle.icon}><SearchSVG/></button>
                </div>
            </div>
            <button onClick={() => router.push('/cart')} className={HeaderStyle.cart}><ShoppingCartSVG/></button>
            <button className={HeaderStyle.profile}><UserSVG/></button>
        </div>
    )
}