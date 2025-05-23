import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export class Basket {
    
    products: IProduct[];
    isBasketActive: boolean;

    constructor(protected events: IEvents) {
        this.products = [];
        this.isBasketActive = false;
    }

    addProduct(product: IProduct) {
        if (this.isProductInBasket(product) != true) {
            this.products.push(product);
            this.events.emit('basket:addItem', product);
        }
    }

    deleteProduct(product: IProduct) {
        const outId = product.id;
        this.products = this.products.filter(product => product.id != outId);
        this.events.emit('basket:deleteItem', product);
    }

    clearBasket() {
		this.products = [];
	}

    isProductInBasket(product: IProduct): boolean {
        const foundedProduct: IProduct = this.products.find((p) => p == product);
        if (foundedProduct != undefined) {
            return true;
        } else {
            return false;
        }
    }

    getTotal(): number {
        let summ: number = 0;
        this.products.forEach((product: IProduct) => {
            summ = summ + product.price;
        })
        return summ;
    }
}