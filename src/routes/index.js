import DummyController from "../controllers/DummyController.js"
import ProviderController from "../controllers/Provider.js"
import LoactionController from "../controllers/Location.js"
import ItemController from "../controllers/Item.js"

export default (app) => {
    app.post('/dummy', DummyController.create);

    app.post('/provider', ProviderController.create)
    app.post('/login', ProviderController.login)
  
    app.post('/location', LoactionController.create)
    app.get('/location', LoactionController.get)

    app.post('/item', ItemController.create)
    app.get('/item', ItemController.get)

    app.all('*', (req, res) => res.status(200).send({
        message: 'Hello World!',
    }));
};