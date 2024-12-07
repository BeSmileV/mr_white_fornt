'use client'

import {setCookie} from "cookies-next";
import {COOKIE_JWT_NAME} from '@/configs'
import {JWT} from "@/types";
import {sendRequest} from "@/lib";

export default async function loginRequest(username: string, password: string): Promise<boolean> {
    const url = process.env.NEXT_PUBLIC_BACKEND_API + '/api/token/'

    const response = await sendRequest({
        url: url,
        type: 'POST',
        body: {
            username: username,
            password: password,
        },
        addToken: false,
    })


    if (response?.ok) {
        const data: JWT = await response.json()
        setCookie(COOKIE_JWT_NAME, data)
    }

    return !!response?.ok
}