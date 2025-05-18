import { IProduct, ISuccessOrder } from "../../types";

//предназначен для работы с успешным заказом
export class SuccessOrder implements ISuccessOrder {

    id: string;
    total: number

    constructor() {
    }

    //установить id заказа
    setId(id: string) {
        this.id = id;
    }

    //установить сумму заказа
    setTotal(total: number) {
        this.total = total;
    }

    //Получить id заказа
    getId(): string {
        return this.id;
    }

    //Получить сумму заказа
    getTotal(): number {
        return this.total;
    }
}