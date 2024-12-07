'use client'

import {getCookie} from "cookies-next";
import {COOKIE_JWT_NAME} from "@/configs";
import {JWT} from "@/types";

export default async function getToken(): Promise<string | undefined> {
    const cookie = await getCookie(COOKIE_JWT_NAME)
    const jwt: JWT = JSON.parse(cookie || '{}') as unknown as JWT
    return jwt?.access
}