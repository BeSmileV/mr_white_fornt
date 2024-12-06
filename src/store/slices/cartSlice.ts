import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "@/store/store";

export type ProductType = {
    name: string;
    cost: string;
    imgs: string[];
    count: number;
    id: number;
};

export type CartType = ProductType[];

export interface CartStateType {
    cart: CartType;
}

const initialState: CartStateType = {
    cart: [],
};

export const CartSlice = createSlice({
    name: 'CartSlice',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductType>) => {
            const product = state.cart.find(item => item.id === action.payload.id);
            if (!product) {
                state.cart.push(action.payload);
            }
        },
        deleteFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        addProductCount: (state, action: PayloadAction<number>) => {
            const product = state.cart.find(item => item.id === action.payload);
            if (product) {
                product.count++;
            }
        },
        minusProductCount: (state, action: PayloadAction<number>) => {
            const product = state.cart.find(item => item.id === action.payload);
            if (product) {
                if (product.count > 1) {
                    product.count--;
                } else {
                    state.cart = state.cart.filter(item => item.id !== action.payload);
                }
            }
        },
    },
});

export const { addToCart, deleteFromCart, addProductCount, minusProductCount } = CartSlice.actions;
export const selectCart = (state: RootState) => state.CartSlice.cart;
export default CartSlice.reducer;
