import { IOrder, Payment } from "../../types";
import { IEvents } from "../base/events";

export class OrderInfo implements IOrder {

    payment?: Payment;
    email?: string;
    phone?: string;
    address?: string;

   constructor(protected events: IEvents) {}

   setPayment(payment: Payment) {
    this.payment = payment;
   }

   setEmail(email: string) {
    this.email = email;
   }

   setPhone(phone: string) {
    this.phone = phone;
   }

   setAddress(address: string) {
    this.address = address;
   }

   clearOInfo() {
    this.payment = null;
    this.email = null;
    this.phone = null;
    this.address = null;
   }

}