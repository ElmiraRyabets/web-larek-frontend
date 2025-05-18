import { IEvents } from "../base/events";
import { Form } from "./forms";
import { IOrderForm, Payment } from '../../types';

export class Order extends Form<IOrderForm> {

    protected card: HTMLButtonElement;
	protected cash: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set payment(value: Payment) {
		/* выбрать один из чекбоксов */
	}

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}