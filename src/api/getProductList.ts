import {sendRequest} from "@/lib";

export type GetProductListResponseType = {
    id: number,
    images: string[],
    name: string,
    price: number,
    old_price: number,
    description: string,
    characteristics: { [key: string]: string }
}[]

export default async function getProductList(search?: string): Promise<GetProductListResponseType | null> {
    const url = process.env.NEXT_PUBLIC_BACKEND_API + `/api/products/?search=${search || ''}`
    const response = await sendRequest({
        url: url,
        type: 'GET',
        addToken: false,
    })

    if (response?.ok) {
        return await response.json()
    }

    return null
}