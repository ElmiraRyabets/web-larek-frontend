import { IOrder, IProduct, ISuccessOrder } from "../types";
import {Api, ApiListResponse} from "./base/api";

export class WebLarekApi extends Api {

  readonly cdn: string;

	  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProducts(): Promise<IProduct[]> {
      return this.get('/product').then((data: ApiListResponse<IProduct>) => {
        let products = data.items;
        return products.map((product) => ({
          id: product.id,
          description: product.description,
          image: this.cdn + product.image.replace(".svg", ".png"),
          title: product.title,
          category: product.category,
          price:product.price}
        ))}
      )
    }

    postOrder(order: IOrder): Promise<ISuccessOrder> {
      return this.post(`/order`, order).then((data: ISuccessOrder) => data);
	}
}


  
