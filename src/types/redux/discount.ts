export type DiscountState = {
    loading: boolean;
    discounts: DiscountType[];
    selectedDiscount: DiscountType | null;
    errorMessage: string | null;
};

export type DiscountType = {
    id?: string;
    _id?: string;
    code: string;
    description: string;
    value: number;
    type: DisType;
    min_order_value: number;
    max_discount_value: number;
    startDate: Date;
    endDate: Date;
    usage_limit: number;
    used_count: number;
    status: DiscountStatus;
};
export enum DiscountStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    EXPIRED = 'EXPIRED',
    PENDING = 'PENDING',
}

export enum DisType {
    FREE_SHIP = 'FREE_SHIP',
    SHIRT = 'SHIRT',
    TROUSERS = 'TROUSERS',
    ACCESSORIES = 'ACCESSORIES',
    SHOES = 'SHOES',
    BAG = 'BAG',
    OTHER = 'OTHER',
}