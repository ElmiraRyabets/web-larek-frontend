//view
import { IPage, ICardView, IBasketView, IOrderForm, IContactsForm, ISuccessForm} from '../types/index';
import {View} from '../components/base/view';
import {EventEmitter, IEvents} from '../components/base/events';
import {ensureElement} from '../utils/utils';

export class Card extends View<ICardView> {
  
    constructor(protected blockName: string, container: HTMLElement, internalData: Partial<ICardView>) {
      super(container, internalData);  
      this.internalData.name = ensureElement<HTMLElement>(`.${blockName}__title`, container);
      this.internalData.image = ensureElement<HTMLImageElement>(
        `.${blockName}__image`,
        container
      );
      this.internalData.button = container.querySelector(`.${blockName}__button`);
      this.internalData.category = container.querySelector(`.${blockName}__category`);
      this.internalData.price = container.querySelector(`.${blockName}__price`);
  
    }
  
    set id(value: string) {
      this.container.dataset.id = value;
    }

    get id(): string {
      return this.container.dataset.id || '';
    }
  
    set title(value: string) {
      this.internalData.name.textContent = value;
    }

    get title(): string {
      return this.internalData.name.textContent || '';
    }
  
    set image(value: string) {
      this.internalData.image.src = value;
    }

    set price(value: number | null) {
      this.internalData.price.textContent = value ? value + ' синапсов' : 'Бесценно';
    }
  
    set category(value: string) {
      this.internalData.category.textContent = value;
    }
  }

  export class Basket extends View<IBasketView> {

    constructor(container: HTMLElement, internalData: Partial<IBasketView>, protected events: EventEmitter) {
        super(container, internalData);

        this.internalData.items = ensureElement<HTMLElement>('.basket__list', this.container);
        this.internalData.summ = this.container.querySelector('.basket__price');
        this.internalData.button = this.container.querySelector('.basket__button');
        this.internalData.buttonDelete = this.container.querySelector('.basket__item-delete');

        if (this.internalData.button) {
            this.internalData.button.addEventListener('click', () => {
                events.emit('order:open');
            });
        } else if (this.internalData.buttonDelete) {
            this.internalData.buttonDelete.addEventListener('click', () => {
                events.emit('item:toggle');
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this.internalData.items.replaceChildren(...items);
        }
    }

    set total(total: number | string) {
        this.setText(this.internalData.summ, `${total} синапсов`);
    }
}

export class Page extends View<IPage> {
	protected events: IEvents;

	constructor(container: HTMLElement, internalData: Partial<IPage>, events: IEvents) {
		super(container, internalData);

		this.internalData.items = ensureElement<HTMLElement>('.gallery');
	}

	setItems(items: HTMLElement[]) {
		this.internalData.items.replaceChildren(...items);
	}
}
  
  

