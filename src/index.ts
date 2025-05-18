import { ProductList } from './components/model/productList';
import { Card } from './components/view/card';
import { WebLarekApi } from './components/webLarekApi';
import './scss/styles.scss';
import { IProduct } from './types';
import { API_URL, CDN_URL} from './utils/constants';
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';

/*const events = new EventEmitter(); 
const api = new WebLarekApi(CDN_URL, API_URL);
const products = new ProductList(events);
const element = document.querySelector('#card-catalog') as HTMLTemplateElement;

api.getProducts()
.then((data: IProduct[]) => {
    products.setProducts(data);
    console.log("чунга чанга")
    console.log(products.getProducts());
    console.log("чунга чанга хуянга")
    console.log(element);
    const card1 = new Card(cloneTemplate(element));
    const card2 = new Card(cloneTemplate(element));
    const card3 = new Card(cloneTemplate(element));


    const listElement = document.querySelector('.gallery') as HTMLUListElement;
    listElement.append(card1.render(data[0]));
    listElement.append(card2.render(data[1]));
    listElement.append(card3.render(data[2]));
}

);*/
