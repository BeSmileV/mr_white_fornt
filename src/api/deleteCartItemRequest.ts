import {sendRequest} from "@/lib";

export default async function deleteCartItemRequest(productId: number): Promise<boolean> {
    const url = process.env.NEXT_PUBLIC_BACKEND_API + `/api/cart/remove_item/`
    const response = await sendRequest({
        url: url,
        type: 'POST',
        body: {
            product_id: productId,
        }
    })
    return !!response?.ok
}