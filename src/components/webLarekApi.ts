import { IOrderInfo, IProduct, ISuccessOrder } from "../types";
import {Api, ApiListResponse} from "./base/api";

export class WebLarekApi extends Api {

  readonly cdn: string;

	  protected constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProducts(): Promise<IProduct[]> {
      return this.get('/product').then((data: ApiListResponse<IProduct>) => {
        let products = data.items;
        return products.map((product) => ({
          id: product.id,
          description: product.description,
          image: this.cdn + product.image,
          title: product.title,
          category: product.category,
          price:product.price}
        ))}
      )
    }

    postOrder(order: IOrderInfo): Promise<ISuccessOrder> {
      return this.post(`/order`, order).then((data: ISuccessOrder) => data);
	}
}


  
