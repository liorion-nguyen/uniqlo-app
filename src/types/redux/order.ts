export type OrderState = {
    loading: boolean;
    orders: OrderType[];
    order: OrderType | null;
    errorMessage: string | null;
};
export type OrderType = {
    id?: string;
    products?: ProductType[];
    userId?: string;
    orderItems: {
        productId: string;
        count: number;
        size: string;
        color: string;
        totalPrice: number;
    }[];
    shippingFee: number;
    totalAmount?: number;
    discountId?: string;
    discountAmount?: number;
    finalAmount?: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ProductType = {
    id: string;
    name: string;
    price: number;
    image: string;
};

