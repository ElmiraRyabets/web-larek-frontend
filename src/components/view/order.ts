import { IEvents } from "../base/events";
import { Form } from "./forms";
import { IOrderForm, Payment } from '../../types';
import { ensureElement } from "../../utils/utils";

export class Order extends Form<IOrderForm> {

    protected online: HTMLButtonElement;
	protected offline: HTMLButtonElement;
    protected _address: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.online = ensureElement<HTMLButtonElement>('.online', this.container);
        this.offline = ensureElement<HTMLButtonElement>('.offline', this.container);
        this._address = container.elements.namedItem('address') as HTMLInputElement;
        this.online.addEventListener('click', () => {
			this.onInputChange('payment', 'online');
		});

		this.offline.addEventListener('click', () => {
			this.onInputChange('payment', 'offline');
		});
    }

    set payment(value: Payment) {
        if (value == 'online') {
            this.online.classList.toggle('button_alt-active', true);
            this.offline.classList.toggle('button_alt-active', false);
        } else if (value == 'offline') {
            this.online.classList.toggle('button_alt-active', false);
            this.offline.classList.toggle('button_alt-active', true);
        }
	}

    set address(value: string) {
        this._address.value = value;
    }

    clearForm() {
        this._address.value = null;
        this.online.classList.toggle('button_alt-active', true);
        this.offline.classList.toggle('button_alt-active', false);
    }
}