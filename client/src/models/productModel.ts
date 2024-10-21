export interface IProduct {
    _id: string;
    name: string;
    quantity: number; 
    price: number;
    lastUpdated: Date; 
}; 

export interface IProductInput {
    name: string;
    quantity: number;
    price: number;
}; 
