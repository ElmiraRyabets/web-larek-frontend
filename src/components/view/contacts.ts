import { IEvents } from "../base/events";
import { Form } from "./forms";
import { IContactsForm } from '../../types';

export class Contacts extends Form<IContactsForm> {
    
    protected _phone: HTMLInputElement;
    protected _email: HTMLInputElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container, events);
        this._phone = container.elements.namedItem('phone') as HTMLInputElement;
        this._email = container.elements.namedItem('email') as HTMLInputElement;
    }

    set phone(value: string) {
        this._phone.value = value;
    }

    set email(value: string) {
        this._email.value = value;
    }

    clearForm () {
        this._email.value = null;
        this._phone.value = null;
    }
}