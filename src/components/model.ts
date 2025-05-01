import { IProduct, PaymentMethod, IBuyer, ProductCollection, IOrder, ProductCategory, IAppState } from '../types/index';
import { Model } from '../components/base/model';
import { IEvents } from '../components/base/events';

export class Product extends Model<IProduct> {

	constructor(data: Partial<IProduct>, events: IEvents) {
        super (data, events)
        this.data.id = data.id;
		this.data.name = data.name;
		this.data.productCategory = data.productCategory;
		this.data.description = data.description;
		this.data.image = data.image;
		this.data.price = data.price;
	}

    setId(id: string) {
		this.data.id = id;
	}

	getId(): string {
		return this.data.id;
	}

	setName(name: string) {
		this.data.name = name;
	}

	getName(): string {
		return this.data.name;
	}

	setCategory(productCategory: ProductCategory) {
		this.data.productCategory = productCategory;
	}

	getCategory(): ProductCategory {
		return this.data.productCategory;
	}

    setDescription(description: string) {
		this.data.description = description;
	}

	getDescription(): string {
		return this.data.description;
	}
	
    setPrice(price: number | null) {
		this.data.price = price;
	}

	getPrice(): number {
		return this.data.price;
	}

    setImage(image: string) {
		this.data.image = image;
	}

	getImage(): string {
		return this.data.image;
	}
}

export class Buyer extends Model<IBuyer> {

    constructor(data: Partial<IBuyer>, events: IEvents) {
        super (data, events)
	}

    setId(id: string) {
		this.data.id = id;
	}

	getId(): string {
		return this.data.id;
	}

	setPaymentMethod(paymentMethod: PaymentMethod) {
		this.data.paymentMethod = paymentMethod;
	}

	getPaymentMethod(): PaymentMethod {
		return this.data.paymentMethod;
	}

	setAddress(address: string) {
		this.data.address = address;
	}

	getAddress(): string {
		return this.data.address;
	}

    setEmail(email: string) {
		this.data.email = email;
	}

	getEmail(): string {
		return this.data.email;
	}
	
    setPhone(phone: string) {
		this.data.phone = phone;
	}

	getPhone(): string {
		return this.data.phone;
	}
} 

export class Order  extends Model<IOrder> {

    constructor(data: Partial<IOrder>, events: IEvents) {
        super(data, events);
        this.data.id = data.id;
		this.data.buyer = data.buyer;
		this.data.summ = data.summ;
		this.data.basket = data.basket;
	}

    setId(id: string) {
		this.data.id = id;
	}

	getId(): string {
		return this.data.id;
	}

	setBuyer(buyer: IBuyer) {
		this.data.buyer = buyer;
	}

	getBuyer(): IBuyer {
		return this.data.buyer;
	}

	setSumm(summ: number) {
		this.data.summ = summ;
	}

	getSumm(): number {
		return this.data.summ;
	}

    setBasket(basket: ProductCollection) {
		this.data.basket = basket;
	}

	getBasket(): ProductCollection {
		return this.data.basket;
	}

}

export class AppState extends Model<IAppState> {

   constructor(data: Partial<IAppState>, events: IEvents) {
        super (data, events)
        this.data.order = data.order;
		this.data.assortiment = data.assortiment;
	}

    setOrder(order: IOrder) {
		this.data.order = order;
	}

	getOrder(): IOrder {
		return this.data.order;
	}

    setAssortiment(assortiment: ProductCollection) {
		this.data.assortiment = assortiment;
	}

	getAssortiment(): ProductCollection {
		return this.data.assortiment;
	}
}

