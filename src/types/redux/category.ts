export type CategoryState = {
    loading: boolean;
    categories: CategoryType[];
    category: CategoryType | null;
    errorMessage: string | null;
};

export type CategoryType = {
    id: string;
    name: string;
    image: string;
    order: number;
    featured: boolean;
    size: string;
    color: string;
    material: string;
    status: string;
    products: ProductType[];
};

export type ProductType = {
    id: string;
    name: string;
    price: number;
    image: string;
};