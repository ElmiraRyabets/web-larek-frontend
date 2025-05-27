export type Category = 'софт-скил' | 'другое' | 'хард-скил' | 'кнопка' | 'дополнительное';

export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: Category,
    price: number | null
}

export type Payment = 'online' | 'offline';

export interface ISuccessOrder {
    id: string,
    total: number
}

export interface IOrder {
    payment?: Payment,
    email?: string,
    phone?: string,
    address?: string,
    total?: number,
    items?: string[]
}

export interface ISuccessActions {
    onClick: () => void;
}

export interface IModalData {
    content: HTMLElement;
}

export interface IFormState {
    valid: boolean;
    errors: string[];
}

export interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: HTMLElement[];
}

export interface IContactsForm {
    email: string;
    phone: string;
}

export interface IOrderForm {
    payment: Payment;
    address: string;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
    locked: boolean;
    basket: HTMLElement[];
}

export interface ICardAction {
	onClick: () => void;
}

export type FormInfo = { isValid: boolean; error: string[] }