import * as express from "express";
import { Items, Author } from "../Models/Items.interface";
const httpRequest = require("request");

class ItemController {
  public path = "/items";
  public router = express.Router();
  public API = process.env.API;
  public APPID = process.env.APPID;
  private author: Author = {
    name: 'Eduardo',
    lastname: 'Rodriguez'
  }

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getSearch);
  }

  public getSearch = (
    request: express.Request,
    response: express.Response
  ) => {

    let that = this;

    let urlParams = request.param('q');
    if (urlParams) {

      httpRequest(this.API + "search?q=" + urlParams + "#json", function (
        error: any,
        res: { statusCode: any },
        body: any
      ) {
        let datos = JSON.parse(body);
        let items: any[] = [];
        let orderedcategories: any[] = [];

        datos.results.forEach((element: any) => {

          let item = {
            "id": element.id,
            "title": element.title,
            "price": {
              "currency": element.currency_id,
              "amount": element.installments?.amount,
              "decimals": ''
            },
            "picture": element.thumbnail,
            "condition": element.condition,
            "free_shipping": element.shipping.free_shipping
          };

          items.push(item)
        });

        datos.available_filters.forEach((element: any) => {
          if (element.id === "category") {
            orderedcategories = element.values
              .sort((a: any, b: any) => (a.results > b.results) ? 1 : ((b.results > a.results) ? -1 : 0))
              .map((item: any) => (item.name));
          }
        });

        let Items: Items = {
          author: that.author,
          categories: orderedcategories,
          items: items
        }

        response.send(Items);
      });

    };
  }
}

export default ItemController;
