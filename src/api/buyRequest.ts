import {sendRequest} from "@/lib";

export default async function buyRequest(): Promise<boolean> {
    const url = process.env.NEXT_PUBLIC_BACKEND_API + `/api/cart/buy/`
    const response = await sendRequest({
        url: url,
        type: 'POST',
    })
    return !!response?.ok
}