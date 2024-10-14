export interface IProduct {
    _id: string;
    name: string;
    quantity: number; 
    price: number;
}; 

export interface IProductInput {
    name: string;
    quantity: number;
    price: number
}; 