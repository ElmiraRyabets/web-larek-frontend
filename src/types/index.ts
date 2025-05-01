//model types
export type PaymentMethod = 'byCash' | 'byCard';
export type ProductCollection = IProduct[];
export type ProductCategory = 'soft-skill' | 'another' | 'hard-skill' | 'button' | 'additional';
export interface IProduct {
	id: string;
    productCategory: ProductCategory;
	description: string;
	image: string;
	name: string;
	price: number | null;
}
export interface IBuyer {
    id: string;
    paymentMethod?: PaymentMethod;
    address?: string;
    email?: string;
    phone?: string;
}

export interface IOrder {
    id: string;
    buyer: IBuyer;
    summ: number
    basket: ProductCollection
}

export interface IAppState {
    order: IOrder;
    assortiment: ProductCollection;
}

//view types
export interface IPage {
	items: HTMLElement;
}

export interface ICardView  {
	id: HTMLElement;
    category: HTMLElement;
	description: HTMLElement;
	image: HTMLImageElement;
	name: HTMLElement;
    button: HTMLButtonElement;
	price: HTMLElement;
}

export interface IBasketView {
	items: HTMLElement;
    summ: HTMLElement;
    buttonDelete: HTMLButtonElement;
    button: HTMLButtonElement;
}


export interface IOrderForm {
	paymentMethod: string;
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface ISuccessForm {
	summ: number;
}
