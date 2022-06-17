import ItemWithAssets from "./ItemWithAssets";
import User from "./User"

export default class Review {
    user!: User;
    item!: ItemWithAssets;
    message!: string;
    rate!: number; 
}