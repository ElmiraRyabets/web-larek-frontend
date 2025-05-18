import { IProduct } from "../../types";
import { IEvents } from "../base/events";

//предназначен для работы с корзиной
export class Basket {
    
    products: IProduct[];

    constructor(protected events: IEvents) {
        //корзина изначально пуста
        this.products = [];
    }

    //добавляем продукт в корзину
    addProduct(product: IProduct) {
        if (this.isProductInBasket(product) != true) {
            this.products.push(product);
            this.events.emit('basket:addItem');
        }
    }

    //удаляем продукт из корзины
    deleteProduct(id: string) {
        this.products = this.products.filter(product => product.id ! == id);
        this.events.emit('basket:deleteItem');
    }

    //получение размера корзины
    getBasketSize(): number {
        return this.products.length;
    }

    //очищение корзины
    clearBasket() {
		this.products = [];
		this.events.emit('basket:clear');
	}

    //Проверяем, содержится ли продукт в корзине
    isProductInBasket(product: IProduct): boolean {
        const foundedProduct: IProduct = this.products.find((p) => p == product);
        if (foundedProduct != undefined) {
            return true;
        } else {
            return false;
        }
    }
}