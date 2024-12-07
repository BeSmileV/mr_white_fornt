'use client'

import {SearchSVG, ShoppingCartSVG, UserSVG} from "../assets";
import {HeaderStyle} from "../styles";
import {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {deleteCookie, getCookie} from "cookies-next";
import {COOKIE_JWT_NAME} from '@/configs'
import {LogoutSVG} from "@/assets";

type HeaderPropsType = {
    onChange?: (data: string) => void,
}

const isLoginCheck = (): boolean => {
    const token = getCookie(COOKIE_JWT_NAME);
    return !!token
}

export default function Header({onChange}: HeaderPropsType) {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        setIsLogin(isLoginCheck())
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.target.value);
    }

    const logout = () => {
        deleteCookie(COOKIE_JWT_NAME)
        setIsLogin(false)
    }

    const login = () => {
        router.push('/login')
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
            {isLogin ?
                <button onClick={logout} className={HeaderStyle.profile}><LogoutSVG/></button>
                :
                <button onClick={login} className={HeaderStyle.profile}><UserSVG/></button>
            }
        </div>
    )
}