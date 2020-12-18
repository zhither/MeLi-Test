import App from './app';
import ItemController from './Controllers/Item.controller';
import ItemDetailController from './Controllers/ItemDetail.controller';
const PORT = parseInt(process.env.PORT || '4000');

const app = new App(
  [
    new ItemController(),
    new ItemDetailController()
  ],
  PORT,
);

app.listen();