'use client'

import {getToken} from "@/api";

type ContentType = 'form-data' | 'multipart' | 'json'

export type SendrequestPropsType = {
    url: string,
    type?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    header?: { [key: string]: string },
    body?: any,
    addToken?: boolean,
    contentType?: ContentType,
}

const getContentTypeHeader = (type: ContentType) => {
    switch (type) {
        case 'form-data':
            return {'Content-Type': 'application/x-www-form-urlencoded'}
        case 'multipart':
            return {}
        case 'json':
            return {'Content-Type': 'application/json'}
        default:
            return
    }
}


export default async function sendRequest({
                                              url,
                                              body,
                                              header = {},
                                              addToken = true,
                                              type = 'GET',
                                              contentType = 'json',
                                          }: SendrequestPropsType): Promise<Response | null> {
    const token = await getToken()
    try {
        return await fetch(url, {
            method: type,
            headers: {
                ...header,
                ...(addToken ? {'Authorization': `Bearer ${token}`,} : {}),
                ...getContentTypeHeader(contentType),
            } as { [key: string]: string },
            body: contentType === 'json' ? JSON.stringify(body) : body,
        })
    } catch (error) {
        return null
    }
}