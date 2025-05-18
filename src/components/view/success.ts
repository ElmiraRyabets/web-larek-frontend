import { ISuccessOrder, ISuccessActions } from "../../types";
import { Component } from '../base/component';
import {ensureElement} from "../../utils/utils";

export class Success extends Component<ISuccessOrder> {
    protected _close: HTMLElement;
    protected _total: HTMLElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
        this._total = ensureElement<HTMLElement>('.order-success__description',this.container
            
        );

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    set total(value: number) {
		this.setText(this._total, `Списано ${value} синапсов`);
	}
}