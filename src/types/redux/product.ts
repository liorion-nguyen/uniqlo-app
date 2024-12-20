export type ProductState = {
    loading: boolean;
    products: ProductType[];
    product: ProductType | null;
    favorites: ProductType[];
    errorMessage: string | null;
};

export type ProductType = {
    id: string;
    _id: string;
    Product_name: string;
    Product_sku: string;
    Product_description: string;
    Product_currency: string;
    Product_color: string[];
    Product_size: string[];
    Product_variantSku: string;
    Product_specifications: string;
    Product_price: number;
    Product_rating: number;
    Product_count: number;
    Product_images: string[];
    Product_isNewArrival: boolean;
    Product_isBestSeller: boolean;
    Product_isOnSale: boolean;
    categoryId: string;
    reviews: ReviewType[];
    favorite_users: string[];
};

export type ReviewType = {
    id: string;
    userId: string;
    avatar: string;
    fullName: string;
    rating: number;
    reviewText: string;
    createdAt: string;
    updatedAt: string;
};
