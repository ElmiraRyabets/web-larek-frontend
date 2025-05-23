import './scss/styles.scss';
import { ProductList } from './components/model/productList';
import { Card } from './components/view/card';
import { WebLarekApi } from './components/webLarekApi';
import { IOrder, IProduct, ISuccessOrder, Payment } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, createElement } from './utils/utils';
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
		return createElement<HTMLElement>('li', {}, [card.render(item)]);
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

function isOrderFormValid(): boolean {
	let length = 0;
	if (orderInfo.address != undefined && orderInfo.address != null) {
		length = orderInfo.address.length;
	}
	return (
		orderInfo.address != undefined &&
		orderInfo.address != null &&
		length != 0 &&
		orderInfo.payment != undefined
	);
}

events.on(
	'order.payment:change',
	(info: { paymentMethod: keyof IOrder; value: Payment }) => {
		orderInfo.setPayment(info.value);
		modal.render({
			content: orderForm.render({
				valid: isOrderFormValid(),
				errors: [],
				payment: info.value,
			}),
		});
	}
);

events.on(
	'order.address:change',
	(info: { address: keyof IOrder; value: string }) => {
		orderInfo.setAddress(info.value);
		modal.render({
			content: orderForm.render({
				valid: isOrderFormValid(),
				errors: [],
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

function isContactsFormValid(): boolean {
	let phoneLength: number = 0;
	let emailLength: number = 0;
	if (orderInfo.phone != undefined && orderInfo.phone != null) {
		phoneLength = orderInfo.phone.length;
	}
	if (orderInfo.email != undefined && orderInfo.email != null) {
		emailLength = orderInfo.email.length;
	}
	return (
		orderInfo.phone != undefined &&
		orderInfo.phone != null &&
		phoneLength != 0 &&
		orderInfo.email != undefined &&
		orderInfo.email != null &&
		emailLength != 0
	);
}

events.on(
	'contacts.phone:change',
	(info: { phone: keyof IOrder; value: string }) => {
		orderInfo.setPhone(info.value);
		modal.render({
			content: contactsForm.render({
				valid: isContactsFormValid(),
				errors: [],
				phone: info.value,
			}),
		});
	}
);

events.on(
	'contacts.email:change',
	(info: { email: keyof IOrder; value: string }) => {
		orderInfo.setEmail(info.value);
		modal.render({
			content: contactsForm.render({
				valid: isContactsFormValid(),
				errors: [],
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
