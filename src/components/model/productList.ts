import { IProduct } from "../../types";
import { IEvents } from "../base/events";

//предназначен для работы с ассортиментом товаров
export class ProductList {

    //ассортимент продуктов
    products: IProduct[];

    constructor(protected events: IEvents) {
        this.products = [];
    }

    //установить ассортимент товаров
    setProducts(products: IProduct[]) {
        this.products = products;
        this.events.emit('productList:create');
    }

    //получить ассоритимент товаров
    getProducts(): IProduct[] {
        return this.products;
    }
}