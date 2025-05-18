https://github.com/ElmiraRyabets/web-larek-frontend
# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитекутра проекта

Архитекутра проекта разрабатывается с помощью паттерна MVP, в котором основными слоями являются M - модели данных - отвечает за работу с данными, V - компоненты представления, отвещающие за отобржение данных на экране, P - презентер, управляющий моделью и представлением. Модель и представление данных взаимодействуют через централизированный брокер событий. Слои представляют собой выделенные классы со своим функционалом.

## Типы данных

**1. Интерфейс IProduct**
    Данный интерфейс описывает карточку товара.

    export interface IProduct {
        id: string,
        description: string,
        image: string,
        title: string,
        category: Category,
        price: number | null
    }

**2. Интерфейс ISuccessOrder**
    Данный интерфейс описывает информацию об успешном заказе.

    export interface ISuccessOrder {
        id: string,
        total: number
    }

**3. Тип Category**
    Этот тип характеризует категорию товара.

    export type Category = 'софт-скил' | 'другое' | 'хард-скил' | 'кнопка' | 'дополнительное'

**4. Тип Payment**
    Этот тип характеризует способ оплаты.

    export type Payment = 'online' | 'offline'


**5. Интерфейс IOrderInfo**
    Этот интерфейс описывает информацию о заказе.

    export interface IOrderInfo {
        payment: Payment,
        email: string,
        phone: string,
        address: string,
        total: number,
        items: string[]
    }

## Базовый код 

**1. abstract class Component<T>**
    Компонент представления, отвечающий за отображение данных на экране.

    Свойства:
        protected readonly container: HTMLElement // Корневой DOM-элемент

    Конструктор:
        protected constructor(protected readonly container: HTMLElement)

    Методы:
        toggleClass(element: HTMLElement, className: string, force?: boolean) // Переключить класс
        protected setText(element: HTMLElement, value: unknown) // Установить текстовое содержимое
        setDisabled(element: HTMLElement, state: boolean) // Сменить статус блокировки
        protected setHidden(element: HTMLElement) // Скрыть
        protected setVisible(element: HTMLElement) // Показать
        protected setImage(element: HTMLImageElement, src: string, alt?: string) // Установить изображение с альтернативным текстом
        render(data?: Partial<T>): HTMLElement // Вернуть корневой DOM-элемент  

**2. class EventEmitter implements IEvents**
    Централизованный брокер событий.

    Свойства:
        _events: Map<EventName, Set<Subscriber>>;

    Методы:
        on<T extends object>(eventName: EventName, callback: (event: T) => void) // Установить обработчик на событие
        off(eventName: EventName, callback: Subscriber) // Снять обработчик с события
        emit<T extends object>(eventName: string, data?: T) // Инициировать событие с данными
        onAll(callback: (event: EmitterEvent) => void) // Слушать все события
        offAll() // Сбросить все обработчики
        trigger<T extends object>(eventName: string, context?: Partial<T>) // Сделать коллбек триггер, генерирующий событие при вызове    

## MODEL

**1. export class Basket**
    Модель корзины.

    Свойства:
        products: IProduct[] // Список товаров в корзине

    Конструктор:
        constructor(protected events: IEvents)

    Методы:
        addProduct(product: IProduct) // Добавить продукт в корзину
        deleteProduct(id: string) // Удалить продукт из корзины
        getBasketSize(): number // Получить размер корзины
        clearBasket() // Очистить корзину
        isProductInBasket(product: IProduct): boolean // Проверить, содержится ли продукт в корзине  

 **2. export class OrderInfo implements IOrderInfo**
    Модель информации о заказе, предназначенная для создания заказа на сервере.

    Свойства:
        payment: Payment // Тип оплаты
        email: string // Email клиента
        phone: string // Телефон клиента
        address: string // Адрес клиента
        total: number // Oбщая сумма заказа
        items: string[] // Товары в заказе

    Конструктор:
        constructor(protected events: IEvents)

    Методы:
        setPayment(payment: Payment) // Установить способ оплаты
        setEmail(email: string) // Установить почту
        setPhone(phone: string) // Установить телефон
        setAddress(address: string) // Установить адрес
        setTotal(total: number) // Установить сумму заказа
        setItems(products: IProduct[]) Установить список заказанных товаров 

 **3. export class Preview**
    Модель карточки товара, отображенной на превью.

    Свойства:
        product: IProduct | null; // Карточка товара

    Конструктор:
        constructor(protected events: IEvents)

    Методы:
        setProduct(product: IProduct) // Установить карточку товара на превью

 **4. export class ProductList**
    Модель ассортимента товаров.

    Свойства:
        products: IProduct[]; // Карточка товара

    Конструктор:
        constructor(protected events: IEvents)

    Методы:
        setProducts(products: IProduct[]) // Установить ассоритмент товара
        getProducts(): IProduct[] //Получить ассортимент товара

 **5. export class SuccessOrder implements ISuccessOrder**
    Информация об успешном заказе.

    Свойства:
        id: string; // Id заказа
        total: number // Сумма заказа

    Конструктор:
        constructor()

    Методы:
        setId(id: string) // Установить id заказа
        setTotal(total: number) // Установить сумму заказа
        getId(): string // Получить id заказа
        getTotal(): number // Получить сумму заказа

## VIEW

**1. export class BasketCard extends Component<IProduct>**
    Отображение карточки товара в корзине.

    Свойства:
        protected cardTitle: HTMLElement; // Заголовок
        protected cardPrice: HTMLElement; // Цена

    Конструктор:
        constructor(protected events: IEvents)

    Методы:
        set title(value: string) // Установить заголовок
        set price(value: string) // Установить цену

**2. export class Card extends BasketCard**
    Отображение карточки товара.

    Свойства:
        protected cardImage: HTMLElement; // Картинка товара
        protected cardCategory: HTMLElement; // Категория товара

    Конструктор:
        constructor(container: HTMLElement)

    Методы:
        set category(value: string) // Установить категорию товара
        set image(value: string) // Установить картинку товара    

**3. export class PreviewCard extends Card**
    Отображение карточки товара на превью.

    Свойства:
        protected cardText: HTMLElement; // Описание товара

    Конструктор:
        constructor(container: HTMLElement)

    Методы:
        set description(value: string) // Установить описание товара

**4. export class Basket extends Component<IBasketView>**
    Отображение корзины.

    Свойства:
        protected _list: HTMLElement; // Список товаров в корзине
        protected _total: HTMLElement; // Сумма заказа
        protected _button: HTMLElement; // Кнопка оформления заказа

    Конструктор:
        constructor(container: HTMLElement, protected events: EventEmitter)

    Методы:
        set items(items: HTMLElement[]) // Установить список товаров в корзине
        set selected(items: string[]) // Установить выбранные товары
        set total(total: number) // Установить общую сумму товаров

**5. export class Form<T> extends Component<IFormState>**
    Отображение формы.

    Свойства:
        protected _submit: HTMLButtonElement; // Кнопка отправки формы
        protected _errors: HTMLElement; // Ошибки, возникшие на форме

    Конструктор:
        constructor(protected container: HTMLFormElement, protected events: IEvents)

    Методы:
        protected onInputChange(field: keyof T, value: string) // Сгенерировать событие с данными о поле формы, которое было изменено.
        set valid(value: boolean) // Установить состояние валидации формы
        set errors(value: string) // Установить ошибки формы
        render(state: Partial<T> & IFormState) // Перерисовать форму

 **6. export class Contacts extends Form<IContactsForm>**
    Отображение формы контактов пользователя.

    Конструктор:
        constructor(container: HTMLFormElement, events: IEvents)

    Методы:
        set phone(value: string) // Установить номер телефона пользователя
        set email(value: string) // Установить email пользователя

 **7. export class Modal extends Component<IModalData>**
    Отображение модального окна.

    Свойства: 

        protected _closeButton: HTMLButtonElement // Кнопка закрытия модального окна
        protected _content: HTMLElement // Наполнение модального окна

    Конструктор:
        constructor(container: HTMLElement, protected events: IEvents) 

    Методы:
        set content(value: HTMLElement) // Установить наполнение модального окна
        open() // Открыть модальное окно
        close() // Закрыть модальное окно
        render(data: IModalData): HTMLElement // Перерисовать модальное окно

 **8. export class Order extends Form<IOrderForm>**
    Отображение формы заказа.

    Свойства:
        protected card: HTMLButtonElement; // Чекбокс "оплата онлайн"
        protected cash: HTMLButtonElement; // Чекбокс "оплата при получении"

    Конструктор:
        constructor(container: HTMLElement, protected events: IEvents) 

    Методы:
        set payment(value: Payment) // Установить способ оплаты
        set address(value: string) // Установить адрес пользователя

 **9. export class Page extends Component<IPage>**
    Отображение страницы приложения.

    Свойства:
        protected _counter: HTMLElement // Счетчик товаров в корзине
        protected _catalog: HTMLElement // Каталог товаров
        protected _basket: HTMLElement // Кнопка открытия корзины
        
    Конструктор:
        constructor(container: HTMLElement, protected events: IEvents) 

    Методы:
        set catalog(items: HTMLElement[]) // Установить каталог товаров
        set counter(value: number) // Установить счетчик товаров в корзине

  **10. export class Success extends Component<ISuccessOrder>**
    Отображение страницы об успешном заказе.

    Свойства:
        protected _close: HTMLElement; // Кнопка закрытия окна
        protected _total: HTMLElement; // Сумма заказа

    Конструктор:
        constructor(container: HTMLElement, actions: ISuccessActions)

    Методы:
        set total(value: number) // Установить сумму заказа
  
## PRESENTER

Роль презентера выполняет корневой index.html.

## Список событий в приложении

### События view

1. modal:open - открытие модального окна 
2. modal:close - закрытие модального окна
3. product:select - событие возникает при нажатии продуктовой карточки
4. preview:open - открытие карточки товара
5. order:open - событие возникает при нажатии кнопки "оформить" в корзине
6. basket:open - открытие корзины
7. order:submit - подтверждение формы информации по заказу
8. contacts:submit - подтверждение формы контактов и создание заказа

### Сoбытия model

1. productList:create - создание продуктового каталога;
2. basket:addItem - добавление товара в корзину;
3. basket:deleteItem - удаление товара из корзины;
4. basket:clear - очищение корзины;
5. order:create - успешное создание заказа;
6. preview:set - установление карточки на превью;
7. order:updated - изменение данных заказа;

## Сервисы

**1. export class WebLarekApi extends Api**
    Сервисный класс WebLarekApi, наследуемый от базового класса Api, предназначен для обработки запросов к серверу.

    Свойства:
        readonly cdn: string; // Content Delivery Network - адрес сервера, на котором хранятся картинки

    Конструктор:
        protected constructor(cdn: string, baseUrl: string, options?: RequestInit)

    Методы:
        getProducts(): Promise<IProduct[]> // Получение ассортимента товаров
        postOrder(order: IOrderInfo): Promise<ISuccessOrder> //создание заказа
