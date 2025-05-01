import { IEvents } from './events';

export abstract class View<T> {

    protected container: HTMLElement;
    protected internalData: Partial<T>;
    //events: IEvents;

	/*protected constructor(container: HTMLElement, events: IEvents) {
        this.container = container;
        this.events = events;
	}*/

    protected constructor(container: HTMLElement, internalData: Partial<T>) {
        this.container = container;
        this.internalData = internalData;
	}

	public setText(element: HTMLElement, value: string) {
		if (element) {
			element.textContent = value;
		}
	}

    public toggleClass(element: HTMLElement, className: string) {
		element.classList.toggle(className);
	}

	public setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	public setImage(element: HTMLImageElement, src: string) {
		if (element) {
			element.src = src;
		}
	}

    public render(): HTMLElement {
        return this.container;
  }

}