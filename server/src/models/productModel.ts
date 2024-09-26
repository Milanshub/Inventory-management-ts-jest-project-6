import mongoose, {Schema, Document, Model} from "mongoose";


// define interface for product document 
export interface IProduct extends Document {
    name: string;
    quantity: number; 
    price: number; 
};

export interface IProductInput {
    name: string; 
    quantity: number, 
    price: number
}

// create schema for the above interface 
const productSchema: Schema = new Schema<IProduct>({
    name: {type: String, required: true}, 
    quantity: {type: Number, required: true, min: 0}, 
    price: {type: Number, required: true, min: 0}
})

export const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema); 