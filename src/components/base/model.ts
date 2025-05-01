import { IEvents } from './events';

export abstract class Model<T> {

  protected events: IEvents;
  protected data: Partial<T>;

  constructor(data: Partial<T>, events: IEvents) {
    this.data = data;
    this.events = events;
  }

 /**
  * Инициировать событие с данными
  */
  emitChanges(event: string) {
    this.events.emit(event);
  }
}