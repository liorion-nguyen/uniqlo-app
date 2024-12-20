export type CartState = {
    loading: boolean;
    carts: CartType[];
    errorMessage: string | null;
};

export type CartType = {
    _id?: string;
    productId: string;
    quantity: number;
    color: string;
    size: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
    price?: number;
    isChecked?: boolean;
    name?: string;
    image?: string;
    sizes?: string[];
    colors?: string[];
};
