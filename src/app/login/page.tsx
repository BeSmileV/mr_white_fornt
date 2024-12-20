'use client'

import {useRef} from "react";
import {Field} from "@/components/Field";
import {ChevronLeftSVG} from "@/assets";
import {useRouter} from "next/navigation";
import style from './style.module.scss'
import {loginRequest} from "@/api";

type FormDataType = {
    username: string,
    password: string,
}

export default function page() {
    const router = useRouter()
    const formDataRef = useRef<FormDataType>({} as FormDataType)

    const setPassword = (password: string) => {
        formDataRef.current.password = password
    }

    const setUsername = (username: string) => {
        formDataRef.current.username = username
    }

    const login = async () => {
        const username = formDataRef.current.username
        const password = formDataRef.current.password
        const response = await loginRequest(username, password)

        if (response) {
            router.push('/')
        }
    }

    return (
        <div className={style.page}>
            <div className={style.form}>
                <span className={style.header}>Вход</span>
                <Field type={'text'} label={'Имя пользователя'} onChange={setUsername}/>
                <Field type={'password'} label={'Пароль'} onChange={setPassword}/>
                <button onClick={login} className={style.loginButton}>Войти</button>
                <button onClick={() => router.push('/')} className={style.backButton}>
                    <ChevronLeftSVG/> Вернуться в магазин
                </button>
                <a href={'/registration'} className={style.href}>Зарегистрироваться</a>
            </div>
        </div>
    )
}