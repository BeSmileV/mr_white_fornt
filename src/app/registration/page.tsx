'use client'

import {useRef} from "react";
import {Field} from "@/components/Field";
import {ChevronLeftSVG} from "@/assets";
import {useRouter} from "next/navigation";
import style from './style.module.scss'
import {regRequest} from "@/api";

type FormDataType = {
    username: string,
    password: string,
    repeatPassword: string,
}

export default function page() {
    const router = useRouter()
    const formDataRef = useRef<FormDataType>({} as FormDataType)

    const setPassword = (password: string) => {
        formDataRef.current.password = password
    }

    const setRepeatPassword = (repeatPassword: string) => {
        formDataRef.current.repeatPassword = repeatPassword
    }

    const setUsername = (username: string) => {
        formDataRef.current.username = username
    }

    const reg = async () => {
        const username = formDataRef.current.username
        const password = formDataRef.current.password
        const repeatPassword = formDataRef.current.repeatPassword
        const response = await regRequest(username, password, repeatPassword)

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
                <Field type={'password'} label={'Повтор пароля'} onChange={setRepeatPassword}/>
                <button onClick={reg} className={style.loginButton}>Регистрация</button>
                <button onClick={() => router.push('/')} className={style.backButton}><ChevronLeftSVG/> Вернуться в
                    магазин
                </button>
            </div>
        </div>
    )
}