import {sendRequest} from "@/lib";

export default async function updateCartItem(productId: number, quantity: number): Promise<boolean> {
    const url = process.env.NEXT_PUBLIC_BACKEND_API + `/api/cart/update_item/`
    const response = await sendRequest({
        url: url,
        type: 'POST',
        body: {
            product_id: productId,
            quantity: quantity,
        }
    })
    return !!response?.ok
}