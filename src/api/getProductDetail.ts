import {sendRequest} from "@/lib";

export type GetProductDetailResponseType = {
    id: 1,
    images: string[],
    name: string,
    price: number,
    old_price: number,
    description: string,
    characteristics: { [key: string]: string }
}

export default async function getProductDetail(id: number): Promise<GetProductDetailResponseType | null> {
    const url = process.env.NEXT_PUBLIC_BACKEND_API + `/api/products/${id}/`
    const response = await sendRequest( {
        url: url,
        type: 'GET',
        addToken: false,
    })

    if (response?.ok) {
        return await response.json()
    }

    return null
}