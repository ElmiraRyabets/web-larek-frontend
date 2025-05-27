import './scss/styles.scss';
import { ProductList } from './components/model/productList';
import { Card } from './components/view/card';
import { WebLarekApi } from './components/webLarekApi';
import { IOrder, IProduct, ISuccessOrder, Payment, FormInfo } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { Preview } from './components/model/preview';
import { Modal } from './components/view/modal';
import { Page } from './components/view/page';
import { Basket } from './components/model/basket';
import { BasketView } from './components/view/basket';
import { Order } from './components/view/order';
import { OrderInfo } from './components/model/orderInfo';
import { Contacts } from './components/view/contacts';
import { Success } from './components/view/success';

const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
const basketPreviewTemplate = document.querySelector(
	'#basket'
) as HTMLTemplateElement;
const orderFormTemplate = document.querySelector(
	'#order'
) as HTMLTemplateElement;
const successTemplate = document.querySelector(
	'#success'
) as HTMLTemplateElement;
const contactsFormTemplate = document.querySelector(
	'#contacts'
) as HTMLTemplateElement;
const modalTemplate = document.querySelector<HTMLElement>('#modal-container');

const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);

const preview = new Preview(events);
const modal = new Modal(modalTemplate, events);
const products = new ProductList(events);
const page = new Page(document.body, events);
const basket = new Basket(events);
let orderInfo = new OrderInfo(events);

let basketView = new BasketView(cloneTemplate(basketPreviewTemplate), events);
let orderForm = new Order(cloneTemplate(orderFormTemplate), events);
let contactsForm = new Contacts(cloneTemplate(contactsFormTemplate), events);

events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

api.getProducts().then((data: IProduct[]) => {
	products.setProducts(data);
});

events.on('productList:create', (products: IProduct[]) => {
	let listElements: HTMLElement[] = [];
	products.forEach((item) => {
		const catalogCard = new Card(cloneTemplate(cardCatalogTemplate), events);
		const elem: HTMLElement = catalogCard.render(item);
		listElements.push(elem);
		elem.addEventListener('click', () => {
			preview.setProduct(item);
		});
	});
	page.render({
		catalog: listElements,
	});
});

events.on('preview:open', (product: IProduct) => {
	const isProductInBasket = basket.isProductInBasket(product);
	let previewCard = new Card(cloneTemplate(cardPreviewTemplate), events, {
		onClick: () => {
			if (isProductInBasket) {
				basket.deleteProduct(product);
			} else {
				basket.addProduct(product);
			}
		},
	});
	if (isProductInBasket) {
		previewCard.button = 'Удалить из корзины';
	} else {
		previewCard.button = 'В корзину';
	}
	modal.render({
		content: previewCard.render(product),
	});
	modal.open();
});

events.on('modal:open', () => {
	page.render({
		locked: true,
	});
});

events.on('modal:close', () => {
	basket.isBasketActive = false;
	page.render({
		locked: false,
	});
});

function createViewBasketItems(): HTMLElement[] {
	let i: number = 0;
	const items: HTMLElement[] = basket.products.map((item: IProduct) => {
		i = i + 1;
		const card = new Card(cloneTemplate(cardBasketTemplate), events, {
			onClick: () => basket.deleteProduct(item),
		});
		card.index = i;
		return card.render(item);
	});
	return items;
}

events.on('basket:deleteItem', () => {
	page.counter = basket.products.length;
	const items: HTMLElement[] = createViewBasketItems();
	basketView.total = basket.getTotal();
	basketView.items = items;
	basketView.selected = items;
	if (!basket.isBasketActive) {
		modal.close();
	}
});

events.on('basket:addItem', () => {
	page.counter = basket.products.length;
	basketView.total = basket.getTotal();
	modal.close();
});

events.on('basket:open', () => {
	let i: number = 0;
	const items: HTMLElement[] = createViewBasketItems();
	basket.isBasketActive = true;
	modal.render({
		content: basketView.render({
			items: items,
			selected: items,
			total: basket.getTotal(),
		}),
	});
});

events.on('order:open', () => {
	orderInfo.setPayment('online');
	modal.render({
		content: orderForm.render({
			valid: false,
			errors: [],
			payment: 'online',
		}),
	});
	modal.open();
});

function isOrderFormValid(): FormInfo {
	if (orderInfo.address.length == 0) {
		const formInfo: FormInfo = {
			isValid: false,
			error: ['Не заполнено поле адрес'],
		};
		return formInfo;
	} else {
		const formInfo: FormInfo = {
			isValid: true,
			error: [],
		};
		return formInfo;
	}
}

events.on(
	'order.payment:change',
	(info: { paymentMethod: keyof IOrder; value: Payment }) => {
		orderInfo.setPayment(info.value);
		let formInfo = isOrderFormValid();
		modal.render({
			content: orderForm.render({
				valid: formInfo.isValid,
				errors: formInfo.error,
				payment: info.value,
			}),
		});
	}
);

events.on(
	'order.address:change',
	(info: { address: keyof IOrder; value: string }) => {
		orderInfo.setAddress(info.value);
		let formInfo = isOrderFormValid();
		modal.render({
			content: orderForm.render({
				valid: formInfo.isValid,
				errors: formInfo.error,
				address: info.value,
			}),
		});
	}
);

events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			valid: false,
			errors: [],
		}),
	});
	modal.open();
});

function isContactsFormValid(): FormInfo {
	let messages: string[] = [];
	if (orderInfo.phone != undefined && orderInfo.phone.length == 0) {
		messages.push('Не заполнено поле телефон')
	} 
	if (orderInfo.email != undefined && orderInfo.email.length == 0) {
		messages.push('Не заполнено поле email')
	} 
	let formInfo: FormInfo = {
		isValid: messages.length == 0 ? true : false,
		error: messages,
	};
	return formInfo;
}

events.on(
	'contacts.phone:change',
	(info: { phone: keyof IOrder; value: string }) => {
		orderInfo.setPhone(info.value);
		let formInfo = isContactsFormValid();
		modal.render({
			content: contactsForm.render({
				valid: formInfo.isValid,
				errors: formInfo.error,
				phone: info.value,
			}),
		});
	}
);

events.on(
	'contacts.email:change',
	(info: { email: keyof IOrder; value: string }) => {
		orderInfo.setEmail(info.value);
		let formInfo = isContactsFormValid();
		modal.render({
			content: contactsForm.render({
				valid: formInfo.isValid,
				errors: formInfo.error,
				email: info.value,
			}),
		});
	}
);

events.on('contacts:submit', () => {
	const productsToServer: IProduct[] = basket.products.filter(
		(product: IProduct) => {
			return product.price != null;
		}
	);
	api
		.postOrder({
			payment: orderInfo.payment,
			email: orderInfo.email,
			phone: orderInfo.phone,
			address: orderInfo.address,
			total: basket.getTotal(),
			items: productsToServer.map((product: IProduct) => {
				return product.id;
			}),
		})
		.then((response: ISuccessOrder) => {
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});
			modal.render({
				content: success.render({ total: response.total }),
			});
			basket.clearBasket();
			modal.open();
			orderForm.clearForm();
			contactsForm.clearForm();
			orderInfo.clearOInfo();
			events.emit('basket:deleteItem');
		})
		.catch((err) => {
			console.error(err);
		});
});
