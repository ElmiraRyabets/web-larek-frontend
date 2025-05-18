import { IOrderInfo, IProduct, Payment } from "../../types";
import { IEvents } from "../base/events";

//предназначен для работы с информацией по заказу
export class OrderInfo implements IOrderInfo {

    payment: Payment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];

   constructor(protected events: IEvents) {}

   //установить способ оплаты
   setPayment(payment: Payment) {
    this.events.emit('order:updated');
    this.payment = payment;
   }

   //установить почту
   setEmail(email: string) {
    this.events.emit('order:updated');
    this.email = email;
   }

   //установить телефон
   setPhone(phone: string) {
    this.events.emit('order:updated');
    this.phone = phone;
   }

   //установить адрес
   setAddress(address: string) {
    this.events.emit('order:updated');
    this.address = address;
   }

   //установить сумму заказа
   setTotal(total: number) {
    this.events.emit('order:updated');
    this.total = total;
   }

   //установить id заказанных товаров товаров 
   setItems(products: IProduct[]) {
    this.events.emit('order:updated');
    this.items = products.map((product: IProduct) => {
        return product.id;
    });
   }

}