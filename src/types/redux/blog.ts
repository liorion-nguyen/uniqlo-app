export type BlogState = {
    loading: boolean;
    blogs: BlogType[];
    blog: BlogType | null;
    errorMessage: string | null;
};

export type BlogType = {
    id: string;
    title: string;
    image: string;
    content: string;
    author: string; 
    commentcount: number;
    comment: CommentType[];
    createdAt: Date;
    updatedAt: Date;
};

export type CommentType = {
    id?: string;
    name:string;
    avatar?:string;
    email:string;
    phone:string;
    comment:string;
    createdAt?: Date;
    updatedAt?: Date;    
};

