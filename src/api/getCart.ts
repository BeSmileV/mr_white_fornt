import {sendRequest} from "@/lib";

export type CartItemType = {
    product: {
        id: number,
        images: string[],
        name: string,
        price: number,
        old_price: number,
        description: string,
        characteristics: { [key: string]: string }
    },
    quantity: number,
}

export type GetCartResponseType = {
    items: CartItemType[],
    total_price: string,
    user: number
}

export default async function getCart(): Promise<GetCartResponseType | null> {
    const url = process.env.NEXT_PUBLIC_BACKEND_API + `/api/cart/get_cart/`
    const response = await sendRequest({url: url});
    return response?.ok ? await response.json() : null
}