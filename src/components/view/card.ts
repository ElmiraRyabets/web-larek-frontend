import { IProduct } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';

export class BasketCard extends Component<IProduct> {
	protected cardTitle: HTMLElement;
	protected cardPrice: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);
		this.cardTitle = ensureElement('.card__title', this.container);
		this.cardPrice = ensureElement('.card__price', this.container);
	}

	set title(value: string) {
		this.setText(this.cardTitle, value);
	}

    set price(value: string) {
		this.setText(this.cardPrice, value);
	}
}

export class Card extends BasketCard {
	protected cardImage: HTMLElement;
	protected cardCategory: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);
		this.cardImage = ensureElement('.card__image', this.container);
		this.cardCategory = ensureElement('.card__category', this.container);
	}

	set category(value: string) {
		this.setText(this.cardCategory, value);
	}

	set image(value: string) {
		this.setText(this.cardImage, value);
	}

}

export class PreviewCard extends Card {
	protected cardText: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);
		this.cardText = ensureElement('.card__text', this.container);
	}

	set description(value: string) {
		this.setText(this.cardText, value);
	}
}
