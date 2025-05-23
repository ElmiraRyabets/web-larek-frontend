import { ICardAction, IProduct } from '../../types';
import { categoryColor } from '../../utils/constants';
import { Component } from '../base/component';
import { IEvents } from "../base/events";

export class Card extends Component<IProduct> {

	protected basketButton?: HTMLButtonElement;
	protected cardText?: HTMLElement;
	protected cardImage?: HTMLImageElement;
	protected cardCategory?: HTMLElement;
	protected cardTitle: HTMLElement;
	protected cardPrice: HTMLElement;
	protected cardNumber?: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents, action?: ICardAction) {
		super(container);
		this.cardText = container.querySelector('.card__text');
		this.basketButton = container.querySelector('.card__button') as HTMLButtonElement;
		this.cardImage = container.querySelector('.card__image') as HTMLImageElement;
		this.cardTitle = container.querySelector('.card__title');
		this.cardPrice =container.querySelector('.card__price');
		this.cardNumber = container.querySelector('.basket__item-index');
		this.cardCategory = container.querySelector('.card__category');
		if (action?.onClick) {
			if (this.basketButton) {
				this.basketButton.addEventListener('click', action.onClick);
	
			} else {
				container.addEventListener('click', action.onClick);
			}
		}
	}

	set description(value: string) {
		this.setText(this.cardText, value);
	}

	set button(value: string) {
		this.setText(this.basketButton, value);
	}
	
	set category(value: string) {
		this.setText(this.cardCategory, value);
		if (this.cardCategory != null) {
			this.cardCategory.classList.add(
				`card__category${categoryColor.get(value)}`
			);
		}	
	}

	set image(value: string) {
		this.setImage(this.cardImage, value);
	}

	set title(value: string) {
		this.setText(this.cardTitle, value);
	}

    set price(value: string) {
		if (value == null) {
			value='Бесценно';
		} else {
			value = `${value} синапсов`
		}
		this.setText(this.cardPrice, value);
	}

	set index(value: number) {
		this.setText(this.cardNumber, value);
	}

	set action(action: ICardAction) {
		this.action = action;
		if (this.basketButton) {
			this.basketButton.addEventListener('click', action.onClick);

		} else {
			this.container.addEventListener('click', action.onClick);
		}
	}
}
