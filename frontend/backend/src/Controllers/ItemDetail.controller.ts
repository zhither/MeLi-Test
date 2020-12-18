import * as express from "express";
import { Item, Author } from "../Models/Items.interface";

const fetch = require('node-fetch');

class ItemDetailController {
  public path = "/items/:id";
  public router = express.Router();
  public API = process.env.API_ITEM;
  public APPID = process.env.APPID;
  private author: Author = {
    name: 'Eduardo',
    lastname: 'Rodriguez'
  }

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getItem);
  }

  public getItem = (
    request: express.Request,
    response: express.Response
  ) => {
    let that = this;

    let itemID = request.params.id;
    let itemdetail: any = {};
    let description: any = {};

    if (itemID) {

      Promise.all([
        fetch(this.API + itemID),
        fetch(this.API + itemID + '/description')
      ]).then(function (responses) {
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      }).then(function (data) {
        itemdetail = data[0];
        description = data[1];

        let item: Item = {
          author: that.author,
          item: {
            id: itemdetail.id || '',
            title: itemdetail.title || '',
            price: {
              currency: itemdetail.currency_id || '',
              amount: itemdetail.price || '',
              decimals: itemdetail.decimals || '',
            },
            picture: itemdetail.thumbnail || '',
            condition: itemdetail.condition || '',
            free_shipping: itemdetail?.shipping?.free_shipping || false,
            sold_quantity: itemdetail.sold_quantity || '',
            description: description.plain_text || ''
          }
        }

        response.send(item);

      }).catch(function (error) {
        console.error(error);
      });

    };
  }
}

export default ItemDetailController;
