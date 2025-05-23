import { IProduct } from '../../types';
import { IEvents } from '../base/events';

export class Preview {
	
	product: IProduct | null;

	constructor(protected events: IEvents) {}

	setProduct(product: IProduct) {
		this.product = product;
		this.events.emit('preview:open', product);
	}
}
